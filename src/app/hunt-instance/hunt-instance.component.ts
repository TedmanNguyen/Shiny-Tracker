import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameGenerationService } from '../game-generation.service';
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
  gameList: string[] = [];
  game: string = '';
  generation: string = '';
  method: string = '';
  pokemon: string = '';

  constructor(
    private gameGenerationService: GameGenerationService,
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
        this.generation = data[this.game];
      });
    }
  }

  onMethodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    console.log(this.method);
    this.method = target.value;
    console.log(this.method);
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
