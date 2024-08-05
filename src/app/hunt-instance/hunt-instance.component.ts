import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
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

  constructor(
    private gameGenerationService: GameGenerationService,
    private GenerationMethodsService: GenerationMethodsService,
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
    const target = event.target as HTMLSelectElement;
    this.pokemon = target.value;
  }

  onStartHunt(event: Event): void {
    if (this.game !== '' && this.method !== '' && this.pokemon !== '') {
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
      window.location.href = '';
    } else {
      this.errorMessage = 'Please fill in all fields before starting the hunt.';
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
