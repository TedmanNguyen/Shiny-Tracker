import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'; 
import { HuntInstanceComponent } from '../hunt-instance/hunt-instance.component';
import { RateGenerationService } from '../rate-generation.service';

interface HuntCard {
  game: string;
  generation: string;
  pokemon: string;
  method: string;
  found: boolean;
  counter: Counter;
}

interface Counter {
  encounters: number;
  rate: string;
}

@Component({
  selector: 'app-hunt-counter',
  standalone: true,
  imports: [CommonModule, HuntInstanceComponent],
  templateUrl: './hunt-counter.component.html',
  styleUrl: './hunt-counter.component.css'
})
export class HuntCounterComponent {
  huntInstances: any[] = [];

  constructor(private cookieService: CookieService,
              private rateGenerationService: RateGenerationService
  ) {}

  ngOnInit(): void {
    this.huntInstances = this.loadHuntInstances();
      console.log(this.huntInstances);
  }

  loadHuntInstances(): any {
    const huntInstanceCookie = this.cookieService.get('huntInstances');
    if (huntInstanceCookie) {
      return JSON.parse(huntInstanceCookie);
    }
    return [];
  }
}
