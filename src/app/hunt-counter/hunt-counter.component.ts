import { ChangeDetectionStrategy, Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { CookieService } from 'ngx-cookie-service'; 
import { HuntInstanceComponent } from '../hunt-instance/hunt-instance.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { RateGenerationService } from '../rate-generation.service';

interface HuntCard {
  id: number;
  game: string;
  generation: string;
  pokemon: Pokemon;
  method: string;
  found: boolean;
  incrementer: Incrementer;
}

interface Incrementer {
  id: number;
  encounters: number;
  rate: string;
  rateMethod: any;
  hasCharm: boolean;
}

interface Pokemon {
  name: string;
  sprite: string;
  spriteShiny: string;
}

@Component({
  selector: 'app-hunt-counter',
  standalone: true,
  imports: [CommonModule, HuntInstanceComponent, MatCardModule, MatButtonModule,
            MatChipsModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hunt-counter.component.html',
  styleUrl: './hunt-counter.component.css'
})
export class HuntCounterComponent implements OnInit, OnDestroy {
  huntInstances: any[] = [];  // array of hunt instances from cookie
  huntCards: HuntCard[] = []; // array of hunt cards to display
  private beforeUnloadListener!: () => void;

  constructor(private cookieService: CookieService,
              private rateGenerationService: RateGenerationService,
              private renderer: Renderer2
  ) {}

  // loads hunt instances from cookie and initializes all cards
  ngOnInit(): void {
    this.huntInstances = this.loadHuntInstances();
    this.beforeUnloadListener = this.renderer.listen('window', 'beforeunload', this.saveHuntInstances.bind(this));
    for (let huntInstance of this.huntInstances) {
      this.huntCards.push(this.initializeCard(huntInstance));
    }
  }

  ngOnDestroy(): void {
    if (this.beforeUnloadListener) {
      this.beforeUnloadListener();  // removes event listener
    }
  }

  loadHuntInstances(): any {
    const huntInstanceCookie = this.cookieService.get('huntInstances');
    if (huntInstanceCookie) {
      return JSON.parse(huntInstanceCookie);
    }
    return [];
  }

  loadHuntCards(): any {
    const huntCardCookie = this.cookieService.get('huntCards');
    if (huntCardCookie) {
      return JSON.parse(huntCardCookie);
    }
    return [];
  }

  saveHuntInstances(): void {
    this.cookieService.set('huntInstances', JSON.stringify(this.huntInstances));
  }

  removeHuntInstance(huntCard: HuntCard): void {
    if (confirm("Are you sure you want to delete the counter for " + huntCard.pokemon.name + "?")) {
      this.huntInstances = this.huntInstances.filter(instance => instance.id !== huntCard.id);
      this.huntCards = this.huntCards.filter(card => card.id !== huntCard.id);
      this.saveHuntInstances();
    }
    // else do nothing
  }

  increment(incrementer: Incrementer): void {
    let corrInstance = this.huntInstances.find(instance => instance.id === incrementer.id)
    incrementer.encounters++;
    corrInstance.encounters++;

    if (incrementer.rateMethod) {
      incrementer.rate = incrementer.rateMethod(incrementer.encounters, incrementer.hasCharm);
    }
  }

  decrement(incrementer: Incrementer): void {
    if (incrementer.encounters >= 1) {
      let corrInstance = this.huntInstances.find(instance => instance.id === incrementer.id)
      incrementer.encounters--;
      corrInstance.encounters--;

      if (incrementer.rateMethod) {
        incrementer.rate = incrementer.rateMethod(incrementer.encounters, incrementer.hasCharm);
      }
    }
  }



  initializeCard(huntInstance: any): HuntCard {
    return {
      id: huntInstance.id,
      game: huntInstance.game,
      generation: huntInstance.generation,
      method: huntInstance.method,
      found: huntInstance.found,
      incrementer: this.createIncrementer(huntInstance),
      pokemon: {
        name: huntInstance.pokemon.name,
        sprite: huntInstance.pokemon.spriteUrl,
        spriteShiny: huntInstance.pokemon.spriteShinyUrl
      }
    };
    
  }

  // gets rate from info passed by cookie, using rate-generation-service
  getRate(method: string, gen: string) {
    let rate = this.rateGenerationService.getSelectedRate(method, gen)
    if (!rate.includes('/')) {
      switch (method) {
        case 'chain-fishing':
        case 'chain-fishing-charm':
          return this.rateGenerationService.getChainFishingRate;
        case 'sos-battle':
        case 'sos-battle-charm':
          return this.rateGenerationService.getSOSRate;
        case 'poke-radar':
        case 'poke-radar-charm':
          return this.rateGenerationService.getRadarRate;
        default:
          return 'Invalid Method';
      }
    }
    else {
      return rate;
      };

  }

  // creates incrementer object for each hunt instance
  createIncrementer(huntInstance: any): Incrementer {
    let rate = this.getRate(huntInstance.method, huntInstance.generation);
    let hasCharm = huntInstance.method.includes('charm');

    if (typeof rate === 'string') {
      return {
        id: huntInstance.id,
        encounters: huntInstance.encounters,
        rate: rate,
        rateMethod: null,
        hasCharm: hasCharm
      };
    }
    else {
      return {
        id: huntInstance.id,
        encounters: huntInstance.encounters,
        rate: rate(huntInstance.encounters, hasCharm),
        rateMethod: rate,
        hasCharm: hasCharm
      };
    }
  }

  toggleFound(huntCard: HuntCard)
  {
    let corrInstance = this.huntInstances.find(instance => instance.id === huntCard.id)
    huntCard.found = !huntCard.found;
    corrInstance.found = !corrInstance.found;
    if (huntCard.found) {
      this.launchConfetti();
    }
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 315,
      origin: { x: 0, y: 0 }
    });
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 225,
      origin: { x: 1, y: 0 }
    });
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 45,
      origin: { x: 0, y: 1 }
    });
    confetti({
      particleCount: 100,
      spread: 70,
      angle: 135, 
      origin: { x: 1, y: 1 }
    });
  }
  

}


