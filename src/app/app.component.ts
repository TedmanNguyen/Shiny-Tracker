// File handles and contains mainpage elements.

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
=======
import { HomepageComponent } from './homepage/homepage.component';
>>>>>>> bf089678ad157eab56cc1dfc08f882bf8ad71362

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, HttpClientModule],
  template: `<h1>Hello world!</h1>`,
  
=======
  imports: [RouterOutlet, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
>>>>>>> bf089678ad157eab56cc1dfc08f882bf8ad71362
})
export class AppComponent {
  title = 'soseproject';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData('pokemon/ditto').subscribe(data => {
      console.log(data);
    });
  }

}
