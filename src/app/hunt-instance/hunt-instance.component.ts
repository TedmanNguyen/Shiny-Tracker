import { ApiService } from './../api.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameGenerationService } from '../game-generation.service';
import { GenerationMethodsService } from '../generation-methods.service';
import { CookieService } from 'ngx-cookie-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MtxSelectModule } from '@ng-matero/extensions/select';

interface Pokemon {
  name: string;
  spriteUrl: string;
  spriteShinyUrl: string;
}
interface HuntInstance {
  id: number;
  game: string;
  generation: string;
  pokemon: Pokemon;
  method: string;
  found: boolean;
  encounters: number;
}

@Component({
  selector: 'app-hunt-instance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MtxSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  templateUrl: './hunt-instance.component.html',
  styleUrls: ['./hunt-instance.component.css'],
})
export class HuntInstanceComponent {
  gameList: string[] = []; // List of games
  game: string = ''; // Chosen game by user
  generation: string = ''; // Obtained from game selection

  methodList: string[] = []; // List of methods
  method: string = ''; // Chosen by user

  pokemon: Pokemon = { name: '', spriteUrl: '', spriteShinyUrl: '' }; // Chosen by user
  pokemonList: Pokemon[] = [];
  spriteUrl: string = ''; // Obtained from API
  spriteShinyUrl: string = ''; // Obtained from API

  huntInstances: HuntInstance[] = []; // Store instances for now
  errorMessage: string = '';
  pokemonSearchTerm: string = ''; // Search bar for pokemon
  errorStatus: number | null = null;
  spriteLoadError: boolean = false;
  shinySpriteLoadError: boolean = false;

  constructor(
    private gameGenerationService: GameGenerationService,
    private GenerationMethodsService: GenerationMethodsService,
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.gameGenerationService.getGameGenerations().subscribe((data) => {
      this.gameList = Object.keys(data);
    });
    this.loadHuntInstances();

    this.apiService.getAllPokemon().subscribe((data) => {
      this.pokemonList = [
        { name: '---', spriteUrl: '', spriteShinyUrl: '' },
        ...data['results'],
      ];
    });
  }

  loadHuntInstances(): void {
    const storedHuntInstances = this.cookieService.get('huntInstances');
    if (storedHuntInstances) {
      this.huntInstances = JSON.parse(storedHuntInstances);
    }
  }

  saveHuntInstances(): void {
    this.cookieService.set('huntInstances', JSON.stringify(this.huntInstances));
  }

  onGameChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.game = target.value;

    if (this.game) {
      this.gameGenerationService.getGameGenerations().subscribe((data) => {
        if (this.generation !== data[this.game]) {
          // sanitize methods in both HTML and TS
          this.method = '';
          this.methodList = [];
          this.pokemon = { name: '', spriteUrl: '', spriteShinyUrl: '' };
          this.spriteUrl = '';
          this.spriteShinyUrl = '';
          this.pokemonSearchTerm = '';
          this.errorStatus = null;

          // obtain new generation and set the value in TS
          this.generation = data[this.game];

          // obtain new method list for HTML
          this.GenerationMethodsService.getMethodsByGen().subscribe({
            next: (data) => {
              this.methodList = Object.keys(data[this.generation]);
            },
            error: (err) => {
              console.error('Error fetching methods by generation', err);
            },
          });
        }
      });
    } else {
      this.method = '';
      this.methodList = [];
      this.generation = '';
      this.pokemon = { name: '', spriteUrl: '', spriteShinyUrl: '' };
      this.spriteUrl = '';
      this.spriteShinyUrl = '';
    }
  }

  onMethodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.method = target.value;
  }

  onSpriteError() {
    this.spriteLoadError = true;
  }

  onShinySpriteError() {
    this.shinySpriteLoadError = true;
  }

  onPokemonChange(event: any): void {
    this.pokemonSearchTerm = event.name;
    if (this.pokemonSearchTerm) {
      this.apiService
        .getPokemon(`${this.pokemonSearchTerm.toLowerCase()}`)
        .pipe(
          catchError((error) => {
            if (error.status === 404) {
              console.error('Pokemon not found');
              //show message to user
              this.errorStatus = 404;
            } else {
              console.error('An error occurred:', error);
              this.errorStatus = error.status;
            }
            return of(null);
          })
        )
        .subscribe((data) => {
          if (data) {
            this.pokemon = {
              name: data.name,
              spriteUrl: data.sprites.other['official-artwork'].front_default,
              spriteShinyUrl:
                data.sprites.other['official-artwork'].front_shiny,
            };

            this.spriteUrl =
              data.sprites.other['official-artwork'].front_default;
            this.spriteShinyUrl =
              data.sprites.other['official-artwork'].front_shiny;

            this.errorStatus = null;
            this.spriteLoadError = false;
            this.shinySpriteLoadError = false;
          } else {
            this.pokemon = { name: '', spriteUrl: '', spriteShinyUrl: '' };
            this.spriteUrl = '';
            this.spriteShinyUrl = '';
          }
        });
    } else {
      this.pokemon = { name: '', spriteUrl: '', spriteShinyUrl: '' };
      this.spriteUrl = '';
      this.spriteShinyUrl = '';
      this.errorStatus = null;
    }
  }

  onStartHunt(event: Event): void {
    const button = event.target as HTMLButtonElement;
    if (!button.disabled) {
      const newHuntInstance: HuntInstance = {
        id: this.generateId(),
        game: this.game,
        generation: this.generation,
        pokemon: {
          name: this.pokemon.name,
          spriteUrl: this.spriteUrl,
          spriteShinyUrl: this.spriteShinyUrl,
        },
        method: this.method,
        found: false, // I am assuming this means if a shiny pokemon has been found ?
        encounters: 0,
      };

      console.log(newHuntInstance);

      // Add the new hunt instance to the huntInstances array
      this.huntInstances.push(newHuntInstance);

      // Save the huntInstances array to cookies
      this.saveHuntInstances();

      // Redirect the user to the homepage
      window.location.href = '';
    }
  }
  generateId(): number {
    const ids = this.huntInstances.map((instance) => instance.id);
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 100000);
    } while (ids.includes(newId));
    return newId;
  }
}
