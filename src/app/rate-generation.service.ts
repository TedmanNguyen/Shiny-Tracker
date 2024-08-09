import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import rateJSON from '../assets/shiny-methods.json';

@Injectable({
  providedIn: 'root',
})
export class RateGenerationService {

  // for use to calculate gen iv radar rates
  private radarNumerators = [8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 
                             12, 12, 13, 13, 14, 14, 15, 15, 16, 17, 18,
                             19, 20, 21, 22, 24, 26, 28, 30, 33, 37, 41, 
                             47, 55, 66, 82, 110, 164, 328];

  constructor(private http: HttpClient) {
    // ensures that getRadarRate refers to radarNumerators in this file
    this.getRadarRate = this.getRadarRate.bind(this);
  }

  // returns the string corresponding to the selected rate from JSON
  getSelectedRate(userMethod: string, userGen: string): string {
    let generation: Object = (rateJSON as any)[userGen];
    return (generation as any)[userMethod] as string;
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
  //hasCharm not used due to lack of info on charm's effect on radar
  getRadarRate(chain: number, hasCharm: boolean) {
    if (chain < 40) {
      return `${this.radarNumerators[chain]}/65536`;
    }
    else {
      return `${this.radarNumerators[40]}/65536`;
    }
  }
}