import { Component } from '@angular/core';
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
  imports: [],
  templateUrl: './hunt-instance.component.html',
  styleUrls: ['./hunt-instance.component.css'],
})
export class HuntInstanceComponent {
  huntInstances: HuntInstance[] = [];
  newHuntInstance: HuntInstance = { 
    generation: '', 
    pokemon: { name: '', spriteUrl: '' }, 
    method: {name: '', rate: '', encounters: 0},
    found: false
  };

  constructor(private cookieService: CookieService) {
    this.loadHuntInstances();
  }

  addHuntInstance(): void {
    //pushes the new hunt instance object to the hunt instances
    this.huntInstances.push({ ...this.newHuntInstance });
    //Saves to cookies
    this.saveHuntInstances();
    //resets the hunt instance object to empty strings
    this.newHuntInstance = this.newHuntInstance = { 
      generation: '', 
      pokemon: { name: '', spriteUrl: '' }, 
      method: { name: '', rate: '', encounters: 0 },
      found: false 
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





}
