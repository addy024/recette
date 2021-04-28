import { UserInfo } from './../shared/userInfo.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  @ViewChild('f', {static: false}) billingInfoForm: NgForm;
  ingredients;
  amount;
  handler: any = null;
  paid;
  
  constructor(private orderService : OrderService,private slservice: ShoppingListService, private alertController: AlertController, private router: Router) { }
  
  ngOnInit() {
    this.ingredients = this.slservice.getIngredients();
    this.amount = this.slservice.rate;
    this.paid = false;
  }

  pay() {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_eqTCwiKJSandhvKO56DQoXVI00QvZUdIxS',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        this.paid = true;
        console.log(this.paid);
    }})
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: this.amount
    });

    this.paid = true;
            console.log(this.paid);
        
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
  
  async success(form: NgForm) {
    const value = form.value;
    const user = new UserInfo(value.name, value.address, value.email, value.mobile);
    this.orderService.user = user;
    const alert = await this.alertController.create({
      header: 'Order placed successfully',
      message: 'Your package will be delivered within 24 hours.',
      buttons: ['OK']
    });
    this.orderService.submit();
    
    this.router.navigate(['/recipes']);
    await alert.present();
    this.slservice.clearIngredient();
    form.reset();
  }

  back(){
    this.router.navigate(['/bill']);
  }
}
