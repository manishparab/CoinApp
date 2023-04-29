export default interface AssetPriceHistory {
    asset_id: string
    asset_name: string
    price_latest:number
    price_one_hour_ago : number
    price_four_hour_ago : number
    price_eight_hour_ago : number
    price_twenty_four_hour_ago : number
}