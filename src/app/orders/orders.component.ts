import { WithDataService } from './../shared/with-data.service';
import { Router } from '@angular/router';
import { Ingredient } from './../shared/ingredient.model';
import { OrderService } from './../shared/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {

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

  temp = [];
  IndexOFSelected;
  count = 0;

  ingredient: Ingredient[];

  userDetail = [];

  constructor(private orderService: OrderService, private router: Router, private wd: WithDataService) { }

  ngOnInit() {
    console.log("CAlling INIT !!!!!!!!!!!!!")
    
   /*  this.orderService.fetchOrders();  */
    this.ordersID = this.orderService.orderId;
    this.orderDetail = this.orderService.orders;
    console.log("Order Detail : ", this.orderDetail);

    this.temp = this.wd.getPayments();
    for(let i = 0; i < this.temp.length; i++){
      if(this.temp[i][2] == 'pending'){
        this.count += 1
      }
    }
  }

  hit(i){
    this.IndexOFSelected = i;
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

  change(id) {
    this.orderDetail[this.IndexOFSelected][4]='delivered'
    console.log("CHANGE :   ", this.orderDetail[this.IndexOFSelected][4])
    this.orderService.change(id);
    setTimeout(() => {
      this.ngOnDestroy();
      this.ngOnInit();  
    }, 5000);
    
  }

  go(){
    this.router.navigate(['payments']);
  }

  ngOnDestroy(){
    console.log("CAlling Destory!!!!!!!!!!!!!!!!!!")
    this.selected = false;
    this.ordersID = [];
    this.userDetail = [];
  }
  
}
