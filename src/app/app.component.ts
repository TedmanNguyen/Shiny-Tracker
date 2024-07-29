import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HomepageComponent } from './homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
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
