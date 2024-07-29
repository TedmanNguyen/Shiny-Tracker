// File handles the main body of the app homepage.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  displayTracker: boolean = false;
  newTrackerHTML: string = 'New Tracker';

  onClickNewTracker() {
    // Toggles the display of the tracker and the text
    // of the new tracker button.
    this.displayTracker = !this.displayTracker;
    this.newTrackerHTML = this.displayTracker ? 'Cancel' : 'New Tracker';
  }
}
