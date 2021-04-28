import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class UserService {
    public admin = false; 
    constructor(){}

    public userEmail = '';
    public userToken = '';
    public userId = '';
    
    isAdmin() {
        if(this.userEmail == "admin@recette.com"){
            this.admin = true;
            return this.admin;
        }
        else {
            this.admin = false;
            return this.admin;
        }
        
    }
}