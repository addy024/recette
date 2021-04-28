import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './../auth/auth.service';
import { WithdrawnService } from './withdrawn.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WithDataService {

  constructor(private http: HttpClient,
    private withdrawnService: WithdrawnService,
    private authService: AuthService,
    private userService: UserService
    ) { }

    payments = []
    payChanged = new Subject();

    storePayments(){
      const pays = this.getPayments();
      this.http
      .put('https://recette-df779.firebaseio.com/withdrawns.json', pays)
      .subscribe(res => {
        console.log('b')
      });
    }

    fetchPayments(){
      this.authService.user.subscribe(user => {
        this.userService.userEmail = user.email;
        this.userService.userId = user.id;
        this.userService.userToken = user.token;
        this.http
        .get('https://recette-df779.firebaseio.com/withdrawns.json', {
          params: new HttpParams().set('auth', user.token)
        } )
        .subscribe(res => {
          this.setPayments(res);
          console.log(res);
          console.log("Fetched");
        })
      })
    }


    getPayments(){
      return this.payments.slice();
    }

    setPayments(pays){
      this.payments = pays;
      this.payChanged.next(this.payments.slice())
    }

    addPayment(info){
      this.payments.push(info);
      this.payChanged.next(this.payments.slice())
    }

    change(i){
      this.authService.user.subscribe(user => {
        let url = "https://recette-df779.firebaseio.com/withdrawns/";
        url += i;
        url += ".json";
        this.http.patch(url, {
          "2": "paid"
        }, {
          params: new HttpParams().set('auth', user.token)
        })
        .subscribe(val => {
          console.log("Patched Successfully");
        })
      })
    }
}
