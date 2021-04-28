import { WithDataService } from './with-data.service';
import { Subject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WithdrawnService {

  private payments = []
  payChanged = new Subject()
  
  constructor(private injector: Injector) { }

  setPayments(pays){
    this.payments = pays;
    this.payChanged.next(this.payments.slice())
    const wd = this.injector.get(WithDataService);
    wd.storePayments();
  }

  getPayments(){
    return this.payments.slice()
  }

  addPayment(info){
    this.payments.push(info);
    this.payChanged.next(this.payments.slice())
    const wd = this.injector.get(WithDataService);
    wd.storePayments();
  }
}
