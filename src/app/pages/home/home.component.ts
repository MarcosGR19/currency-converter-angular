import { Currency } from './../../shared/models/currency.interface';
import { CurrencyService } from './../../shared/services/currency.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor (private currencyService:CurrencyService) {}

  public currencies: Currency[]=[];

  public inputNumber:number=1;
  public currentCurr:string = 'EUR';

  ngOnInit():void {
    this.currencyService.getCurrencies().subscribe((res:any)=> {
      for(let curr in res.rates){
        if(curr !== this.currentCurr){
          this.currencies.push({
            name:curr,
            rate:res.rates[curr],
            outputValue:(res.rates[curr]).toFixed(2)
          })
        }
      }
    })
  }

  changeValueCurrency(inputNumber:any){
    for(let curr of this.currencies){
      curr.outputValue = (inputNumber*curr.rate).toFixed(2); 
    }
  }

  changeCurr(newCurr:string){
    this.currentCurr = newCurr;
    this.currencies = [];
    this.currencyService.getCurrency(newCurr).subscribe((res:any)=> {
      for(let curr in res.rates){
        if(curr !== this.currentCurr){
          this.currencies.push({
            name:curr,
            rate:res.rates[curr],
            outputValue:(res.rates[curr]).toFixed(2)
          })
        }
      }
    })
  }
}
