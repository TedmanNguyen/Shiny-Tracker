import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-infopage',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatGridListModule],
  templateUrl: './infopage.component.html',
  styleUrl: './infopage.component.css'
})
export class InfopageComponent {

}
