import { ApiService } from './../api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameGenerationService } from '../game-generation.service';
import { GenerationMethodsService } from '../generation-methods.service';
import { CookieService } from 'ngx-cookie-service';

interface Pokemon {
  name: string;
  spriteUrl: string;
}
interface Method {
  name: string;
  rate: string;
  encounters: number;
}
interface HuntInstance {
  game: string;
  generation: string;
  pokemon: Pokemon;
  method: Method;
  found: boolean;
}

@Component({
  selector: 'app-hunt-instance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hunt-instance.component.html',
  styleUrls: ['./hunt-instance.component.css'],
})
export class HuntInstanceComponent {
  gameList: string[] = []; // List of games
  game: string = ''; // Chosen game by user
  generation: string = ''; // Obtained from game selection
  methodList: string[] = []; // List of methods
  method: string = ''; // Chosen by user
  pokemon: string = ''; // Chosen by user
  huntInstances: HuntInstance[] = []; // Store instances for now
  errorMessage: string = '';
  pokemonSearchTerm: string = ''; // Search bar for pokemon
  errorStatus: number | null = null;

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
  }

  // For Ted
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
    }
  }

  onMethodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.method = target.value;
  }

  onPokemonChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.pokemonSearchTerm = inputElement.value;
    console.log(this.pokemonSearchTerm);

    if (this.pokemonSearchTerm) {
      this.apiService
        .getData(`pokemon/${this.pokemonSearchTerm.toLowerCase()}`)
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
            this.pokemon = data.name;
            this.errorStatus = null;
            console.log(data);
          }
        });
    } else {
      this.errorStatus = null;
    }

    //Check if the search pokemon is a valid api link

    /*
    //if pokemon is filled out, check if it is in the game
    if (this.pokemon) {

      //Need logic that interacts with the API to check if the pokemon is in the game

      //Get the list of pokemon in the generation

      //Get the sprite of the pokemon


      //if pokemon is in the game, then the user can submit the hunt instance

      
      this.gameGenerationService.getGameGenerations().subscribe((data) => {
        if (this.generation !== data[this.game]) {
          // sanitize methods in both HTML and TS
          this.method = '';
          this.methodList = [];

          // obtain new generation and set the value in TS
          this.generation = data[this.game];

          // obtain new method list for HTML
          this.GenerationMethodsService.getMethodsByGen().subscribe((data) => {
            this.methodList = Object.keys(data[this.generation]);
          });
        }



      });
    }
    else {
      this.method = '';
      this.methodList = [];
      this.generation = '';
    }
    */
  }

  onStartHunt(event: Event): void {
    const button = event.target as HTMLButtonElement;
    if (!button.disabled) {
      const newHuntInstance: HuntInstance = {
        game: this.game,
        generation: this.generation,
        pokemon: {
          name: this.pokemon,
          spriteUrl: '', // Empty for now
        },
        method: {
          name: this.method,
          rate: '', // Empty for now
          encounters: 0,
        },
        found: false, // I am assuming this means if a shiny pokemon has been found ?
      };

      console.log(newHuntInstance);
      // // Add the new hunt instance to the huntInstances array
      // this.huntInstances.push(newHuntInstance);

      // // Save the huntInstances array to cookies
      // this.saveHuntInstances();

      // Redirect the user to the homepage
      // window.location.href = '';
    }
  }
}

/*
export class HuntInstanceComponent implements OnInit {
  gameGenerations: string[] = [];
  huntInstances: HuntInstance[] = [];
  newHuntInstance: HuntInstance = {
    generation: '',
    pokemon: { name: '', spriteUrl: '' },
    method: { name: '', rate: '', encounters: 0 },
    found: false,
  };
  

  constructor(
    private gameGenerationService: GameGenerationService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.gameGenerationService.getGameGenerations().subscribe((data) => {
      this.gameGenerations = Object.keys(data);
    });
    this.loadHuntInstances();
  }

  addHuntInstance(): void {
    // Pushes the new hunt instance object to the hunt instances
    this.huntInstances.push({ ...this.newHuntInstance });
    // Saves to cookies
    this.saveHuntInstances();
    // Resets the hunt instance object to empty strings
    this.newHuntInstance = {
      generation: '',
      pokemon: { name: '', spriteUrl: '' },
      method: { name: '', rate: '', encounters: 0 },
      found: false,
    };
  }

  saveHuntInstances(): void {
    this.cookieService.set('huntInstances', JSON.stringify(this.huntInstances));
  }

  loadHuntInstances(): void {
    const storedHuntInstances = this.cookieService.get('huntInstances');
    if (storedHuntInstances) {
      this.huntInstances = JSON.parse(storedHuntInstances);
    }
  }

  */
