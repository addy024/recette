import { Params } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { map, take, exhaustMap, tap } from 'rxjs/operators';

@Injectable()

export class OrderService {
    public user;
    public finalOrder:any[] = [];
    public orders = [];
    orderId = [];



    constructor(private authService: AuthService ,private shoppingListService: ShoppingListService, private http: HttpClient, private userService: UserService){};

    

    submit(){
        this.finalOrder = [];
        this.finalOrder.push(this.userService.userEmail);
        this.finalOrder.push(this.user);
        this.finalOrder.push(this.shoppingListService.getIngredients());
        this.finalOrder.push(this.shoppingListService.rate);
        this.finalOrder.push('pending');
        this.http
        .post('https://recette-df779.firebaseio.com/orders.json', this.finalOrder)
        .subscribe(res => {
            console.log(" res : ",res);
        })

    }

    fetchOrders(){
        this.authService.user.subscribe(user => {
            this.orders = [];
            this.orderId = [];
            this.userService.userEmail = user.email;
            this.userService.userId = user.id;
            this.userService.userToken = user.token;
            this.http
            .get<any[]>('https://recette-df779.firebaseio.com/orders.json', {
                params: new HttpParams().set('auth', user.token)
            })
            .subscribe(res => {
                this.finalOrder = Array.of(res);
                for (let obj of this.finalOrder) {
                    for (let key in obj) {
                        this.orderId.push(key);
                        this.orders.push(obj[key]);
                    }
                
                }
            })
        
    })
    }

    change(i){
        this.authService.user.subscribe(user => {
        let url = "https://recette-df779.firebaseio.com/orders/";
        url += i;
        url += ".json";
        this.http.patch(url,{
            "4" : "delivered"
        },{
            params: new HttpParams().set('auth', user.token)
        })
        .subscribe(val => {
            console.log("PAtched Successfully");
        })
    })
   
}
}
