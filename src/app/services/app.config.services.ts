import { Injectable } from '@angular/core';
import config from '../app.config.json';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    get asset_prices_base_url() {
        return config.asset_prices_base_url; 
    }

    get polling_interval() {
        return config.polling_interval; 
    }
   
}