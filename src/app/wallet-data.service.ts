import { UserService } from './shared/user.service';
import { AuthService } from './auth/auth.service';
import { UserWalletService } from './user-wallet.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletDataService {

  constructor(private http: HttpClient,private userService: UserService,private authService: AuthService ,private userWallet: UserWalletService) { 
  }

  storeWallet() {
    
    const wallets = this.userWallet.getWallets();
    this.http
    .put('https://recette-df779.firebaseio.com/wallets.json', wallets)
    .subscribe(response => {
      console.log('A')
    });
  }

  fetchWallet() {
    this.authService.user.subscribe(user => {
      this.userService.userEmail = user.email;
      this.userService.userId = user.id;
      this.userService.userToken = user.token;
      this.http
      .get('https://recette-df779.firebaseio.com/wallets.json', {
        params: new HttpParams().set('auth', user.token)
    } )
      .subscribe(wallets => {
        console.log(wallets);
        this.userWallet.setWallets(wallets);
      })
    })
  }


}
