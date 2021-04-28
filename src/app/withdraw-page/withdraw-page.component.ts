import { WithDataService } from './../shared/with-data.service';
import { WithdrawnService } from './../shared/withdrawn.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { UserWalletService } from './../user-wallet.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw-page',
  templateUrl: './withdraw-page.component.html',
  styleUrls: ['./withdraw-page.component.scss'],
})

export class WithdrawPageComponent implements OnInit {

  constructor(
    private alertController: AlertController,
    private userWallet: UserWalletService,
     private userService: UserService, 
     private router: Router,
     private wD: WithDataService) { }

  current;
  amount;
  
  ngOnInit() {
    this.current = this.userService.userEmail;
    
  }

  async onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value)
    form.reset();
    this.userWallet.resetAmount(this.current);
    let status = "pending"
    let info = []
    info.push(this.current)
    info.push(value.detials)
    info.push(status);
    this.wD.addPayment(info);
    console.log("Info : "+ info)
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Payment Will be done within 7 working days',
        buttons: ['OK']
      });
  
      await alert.present();
    

    this.router.navigate(['/recipes']);
  }

}
