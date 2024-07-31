import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { HomepageComponent } from './homepage/homepage.component';
import { HuntInstanceComponent } from './hunt-instance/hunt-instance.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule,
            HomepageComponent, HuntInstanceComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'soseproject';

  constructor(private apiService: ApiService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(
      'pokeball',
      this.domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/TedmanNguyen/soseproject/main/src/assets/pokeball.svg'))}

  ngOnInit() {
    this.apiService.getData('pokemon/ditto').subscribe((data) => {
      console.log(data);
    });
  }
}
