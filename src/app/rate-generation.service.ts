import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RateGenerationService {
  private jsonUrl = 'assets/shiny-methods.json';

  // for use to calculate gen iv radar rates
  private radarNumerators = [8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 
                             12, 12, 13, 13, 14, 14, 15, 15, 16, 17, 18,
                             19, 20, 21, 22, 24, 26, 28, 30, 33, 37, 41, 
                             47, 55, 66, 82, 110, 164, 328]


  constructor(private http: HttpClient) {}

  // obtains rates and outputs as a TS object
  getRates(): Observable<{ data: any }> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(response => ({ data: response }))
    );
  }

  // returns the string corresponding to the selected rate from JSON
  getSelectedRate(userMethod: string, userGen: string): string {
    let rate: string = '';
    // load rates fron JSON
    this.getRates().subscribe(rates => {
      // get the correct generation
      let generation: Object = rates.data[userGen];

      // find correct method in generation and get its rate
      rate = (generation as any)[userMethod]; 
      console.log('log1', rate);
      
    });
    // returns the rate as a string, or undefined if invalid parameters
    console.log('log2', rate);
    return rate;
  }

  // calculates the rate for chain fishing
  getChainFishingRate(chain: number, hasCharm: boolean) {
    let charmRate = hasCharm ? 2 : 0;
    if (chain < 20) {
      return `${charmRate + 1 + 2 * chain}/4096`;
    }
    else {
      return `${charmRate + 41}/4096`;  // since base rate caps at 41/4096
    }
  }

  // calculates the rate for SOS chaining
  getSOSRate(chain: number, hasCharm: boolean) {
    let charmRate = hasCharm ? 2 : 0;
    if (chain <= 10) {
      return `${charmRate + 1}/4096`;
    }
    else if (chain <= 20) {
      return `${charmRate + 5}/4096`;
    }
    else if (chain < 30) {
      return `${charmRate + 9}/4096`;
    }
    else {
      return `${charmRate + 13}/4096`;  // since base rate caps at 13/4096
    }
  }

  //calculates the rate for generation iv Poke Radar
  getRadarRate(chain: number) {
    if (chain < 40) {
      return `${this.radarNumerators[chain]}/65536`;
    }
    else {
      return `${this.radarNumerators[40]}/65536`;
    }
  }
}