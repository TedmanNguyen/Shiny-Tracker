import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<h1>Hello world!</h1>`,
  
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
