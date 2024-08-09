import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  gamesList: Observable<any>[] = [];

  constructor(private http: HttpClient) {}

  getPokemon(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${endpoint}`);
  }

  getAllPokemon(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/?limit=1400`);
  }

  /*
  getVersionGroup(game: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/version/${game}`);
  }

  getGame(gameNumber : number): Observable<any> {
    //get a single instance of a game based on the parameter
    return this.http.get(`${this.baseUrl}/version/?limit=30`);
  }
  */

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }
}
