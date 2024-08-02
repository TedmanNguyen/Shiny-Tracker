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
  gameList: string[] = [];        // List of games
  game: string = '';              // Chosen game by user
  generation: string = '';        // Obtained from game selection
  methodList: string[] = [];      // List of methods
  method: string = '';            // Chosen by user
  pokemon: string = '';           // Chosen by user

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
  }

  onMethodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.method = target.value;
  }

  onPokemonChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    console.log(this.pokemon);
    this.pokemon = target.value;
    console.log(this.pokemon);
  }
};


  

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
