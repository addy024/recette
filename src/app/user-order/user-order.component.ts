import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { Ingredient } from './../shared/ingredient.model';
import { OrderService } from './../shared/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
})
export class UserOrderComponent implements OnInit {

  currentUserEmail;

  ordersID;
  orderDetail;
  index = 0;
  selected = false;
  emailId;
  address;
  email;
  mobileno;
  name;
  price;
  status;
  id;
  ingredient: Ingredient[];

  userDetail = [];

  constructor(private orderService: OrderService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.orderService.fetchOrders();
    this.ordersID = this.orderService.orderId;
    this.orderDetail = this.orderService.orders;
    this.currentUserEmail = this.userService.userEmail;
    console.log("Current User : ", this.currentUserEmail);
    if(
      this.currentUserEmail == 'admin@recette.com'
    ) {
      this.router.navigate(['orders']);
    }
  }

  hit(i){
    this.userDetail = [];
    this.address = '';
    this.email = '';
    this.mobileno = '';
    this.name = '';
    this.selected = true;
    console.log("Details : ")
    console.log("email id : ", this.orderDetail[i][0]);
    this.emailId = this.orderDetail[i][0];
    console.log("address : ",this.orderDetail[i][1]);
    for (let key in this.orderDetail[i][1])
    {
      this.userDetail.push(this.orderDetail[i][1][key]);
    }
    console.log("USer Detail : ", this.userDetail);
    this.address = this.userDetail[0];
    this.email = this.userDetail[1];
    this.mobileno = this.userDetail[2];
    this.name = this.userDetail[3];

    this.ingredient = this.orderDetail[i][2];
    console.log("Ingredient : ", this.ingredient);

    this.price  = this.orderDetail[i][3] / 100;
    console.log(this.price);

    this.status = this.orderDetail[i][4];
    console.log("Status : ", this.status);

    console.log(this.ordersID[i]);
    this.id = this.ordersID[i];
  }

}