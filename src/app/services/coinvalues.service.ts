import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import AssetPriceHistory from 'src/app/models/asset_price_history';
import { AppConfigService } from './app.config.services';

@Injectable({
  providedIn: 'root'
})
export class CoinvaluesService {

  constructor(private http:HttpClient , private config_service:AppConfigService) { }

  public poll_asset_price_history(asset_name:string, interval: number): Observable<AssetPriceHistory> {
    return timer(0, interval).pipe(switchMap(()=> this.get_asset_price_history(asset_name)))
  }
  
  private get_asset_price_history(asset_name:string): Observable<AssetPriceHistory> {
    const url:string = `${this.config_service.asset_prices_base_url}/asset/${asset_name}/prices`
    return this.http.get<AssetPriceHistory>(url)
  }
}
