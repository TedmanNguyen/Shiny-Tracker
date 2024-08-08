// File handles the main body of the app homepage/tracker page.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HuntCounterComponent } from '../hunt-counter/hunt-counter.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HuntCounterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(private router: Router) {}
  displayTracker: boolean = false;
  newTrackerHTML: string = 'New Tracker';

  onClickNewTracker() {
    // Toggles the display of the tracker and the text
    // of the new tracker button.
    this.displayTracker = !this.displayTracker;
    this.newTrackerHTML = this.displayTracker ? 'Cancel' : 'New Tracker';
  }

  navigateToHuntPage() {
    this.router.navigate(['/hunt-page']);
  }
}
