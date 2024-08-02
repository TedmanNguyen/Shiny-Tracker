import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenerationMethodsService {
  private jsonUrl = 'assets/shiny-methods.json';

  constructor(private http: HttpClient) {}

  getMethodsByGen(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}