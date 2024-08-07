import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { HuntInstanceComponent } from '../hunt-instance/hunt-instance.component';

@Component({
  selector: 'app-hunt-counter',
  standalone: true,
  imports: [HuntInstanceComponent],
  templateUrl: './hunt-counter.component.html',
  styleUrl: './hunt-counter.component.css'
})
export class HuntCounterComponent {
  constructor(private cookieService: CookieService) {}

  loadHuntInstances(): void {
    //huntInstances: HuntInstance[] = [];


    const storedHuntInstances = this.cookieService.get('huntInstances');
    if (storedHuntInstances) {
      //this.huntInstances = JSON.parse(storedHuntInstances);
    }
  }


  ngOnInit(): void {
    const storedHuntInstances = this.cookieService.get('huntInstances');
    if (storedHuntInstances) {
      let huntInstances = JSON.parse(storedHuntInstances);
      for (let huntInstance of huntInstances) {
        // function to intialize an individual hunt instance
      }
    }
  }


}
