import { Subject } from 'rxjs';
import { WalletDataService } from './wallet-data.service';
import { Wallet } from './shared/Wallet.model';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { Injectable, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UserWalletService {

  userAmount = 0;
  amount = 0
  userName;
  newUser = [];
  amounting = 0

  userChanged = new Subject();
  users = []

  constructor(private injector: Injector ) { }

  getWallets(){
    return this.users.slice();
  }

  setWallets(wallets){
    this.users = wallets
    this.userChanged.next(this.users.slice());
  const walletDataService = this.injector.get(WalletDataService);
  walletDataService.storeWallet()

  }

  getAmount(email){
    for(let i = 0; i < this.users.length; i++){
      if (email == this.users[i][0]){
        this.amounting = Number(this.users[i][1])
        return this.amounting
      }
    }
    return this.amounting
  }

  resetAmount(email) {
    for(let i = 0; i < this.users.length; i++){
      if (email == this.users[i][0]){
        this.users[i][1] = 0
      }}
      this.userChanged.next(this.users.slice());
  const walletDataService = this.injector.get(WalletDataService);
  walletDataService.storeWallet()
  }

  addedToWallet(unit, email) {
    console.log(this.users)
    this.amount += unit  * 0.10;
    this.userName = email;
    console.log("Amount : " + this.amount)
    console.log("Recipe Email : " + this.userName)
    console.log()
    if(this.users.length > 0) {
      for(let i = 0; i < this.users.length; i++){
        if(this.userName == this.users[i][0]){
          console.log(this.userName + " = " + this.users[i][0])
          console.log("Amount Before : " + this.users[i][1])
          let temp:number = Number(this.users[i][1])
  
          temp += this.amount
  
          this.users[i][1] = temp
          console.log("Amount After : " + this.users[i][1])
          this.amount = 0 
          this.userName = ''
          console.log("CCALiing")
      this.userChanged.next(this.users.slice());
      const walletDataService = this.injector.get(WalletDataService);
      walletDataService.storeWallet()
          break
        }
        else {
          console.log("Not equal")
          this.newUser.push(email, this.amount)
          console.log("NEw User : " + this.newUser)
          this.users.push(this.newUser)
           
          
          this.newUser = []
          console.log("NEw User 3333 : " + this.newUser)
          
     
          console.log("=====================================================")
          console.log("Updated USers : ")
          console.log(this.users)
          console.log("Calling")
      this.userChanged.next(this.users.slice());
      const walletDataService = this.injector.get(WalletDataService);
      walletDataService.storeWallet()
          break
        }
        
      }
    }
    else {
      this.newUser.push(email, this.amount)
      console.log("NEw User : " + this.newUser)
      this.users.push(this.newUser)
       
      
      this.newUser = []
      console.log("NEw User 3333 : " + this.newUser)
      let array = this.users

      let uniqueSet = new Set(array[0])

      let backArray = [...uniqueSet]
      console.log("UNIQUE : " + backArray)
      console.log("=====================================================")
      console.log("Updated USers : ")
      console.log(this.users)
      console.log("Calling")
  this.userChanged.next(this.users.slice());
  const walletDataService = this.injector.get(WalletDataService);
  walletDataService.storeWallet()
    }
   
    /* this.userAmount += this.amount
    this.newUser.push(this.userName)
    this.newUser.push(this.userAmount)
    
    this.users.push(this.newUser);


    console.log("USER INFORMATION : ")
    console.log(this.users) */

    
  }
}
