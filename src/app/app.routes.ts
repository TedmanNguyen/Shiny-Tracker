import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HuntInstanceComponent } from './hunt-instance/hunt-instance.component';
import { InfopageComponent } from './infopage/infopage.component';
import { NavbarComponent } from './navbar/navbar.component';

export const ROUTES: Routes = [
  { path: '**', component: HomepageComponent },
  { path: 'hunt-page', component: HuntInstanceComponent },
  { path: 'infopage', component: InfopageComponent },
  { path: 'navbar', component: NavbarComponent }
];

