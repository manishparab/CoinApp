import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import AssetPriceHistory from 'src/app/models/asset_price_history';
import { AppConfigService } from 'src/app/services/app.config.services';
import { CoinvaluesService } from 'src/app/services/coinvalues.service';

@Component({
  selector: 'app-coin_values',
  templateUrl: './coin_values.component.html',
  styleUrls: ['./coin_values.component.css']
})

export default class CoinValuesComponent implements OnInit {

  constructor(private _service: CoinvaluesService,private config_service:AppConfigService) {
  }

  current_asset_name:string = "bitcoin"
  current_asset_delta:number = 0

  private _price_history_sub:any;

  assetPriceHistory$: AssetPriceHistory ={
    asset_id: '',
    asset_name: '',
    price_latest: 0,
    price_one_hour_ago: 0,
    price_four_hour_ago: 0,
    price_eight_hour_ago: 0,
    price_twenty_four_hour_ago: 0
  };

  change_asset(): void {
    if (this.current_asset_name == "bitcoin"){
      this.current_asset_name = "ethereum"
    }
    else {
      this.current_asset_name = "bitcoin"
    }
    this.leave_subscription()
    this.join_subscription()
  }

  leave_subscription(): void {
    this._price_history_sub.unsubscribe();
  }

  join_subscription(): void {
    this._price_history_sub = this._service
    .poll_asset_price_history(this.current_asset_name, this.config_service.polling_interval)
    .subscribe(data=> {
      this.current_asset_delta = data.price_latest - data.price_twenty_four_hour_ago
      this.assetPriceHistory$ = data
    })
  }

  ngOnInit(): void {
    this.join_subscription()
  }

}
