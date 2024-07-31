import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HomepageComponent } from './homepage/homepage.component';
import { HuntInstanceComponent } from './hunt-instance/hunt-instance.component';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,
            HomepageComponent, HuntInstanceComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'soseproject';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData('pokemon/ditto').subscribe((data) => {
      console.log(data);
    });
  }
}
