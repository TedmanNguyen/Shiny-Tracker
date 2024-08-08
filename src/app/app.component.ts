import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { HomepageComponent } from './homepage/homepage.component';
import { HuntInstanceComponent } from './hunt-instance/hunt-instance.component';
import { HuntCounterComponent } from './hunt-counter/hunt-counter.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule,
            HomepageComponent, HuntInstanceComponent, NavbarComponent, HuntCounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CookieService]
})

export class AppComponent {
  title = 'soseproject';
  //gameName : string = '';

  constructor(private apiService: ApiService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private cookieService: CookieService) {

    this.matIconRegistry.addSvgIcon(
      'pokeball',
      this.domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/TedmanNguyen/soseproject/main/src/assets/pokeball.svg'))}

  /*
  ngOnInit() {
    this.apiService.getData('pokemon/ditto').subscribe((data) => {
      console.log(data);
    });
  */
  /*
   ngOnInit() {
    this.apiService.getGame(3).subscribe((data) => {
      this.gameName = data.results[3].name;
      
      console.log(this.gameName);
    });
  }
  */ 
}
