import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isAuth = false;
  private userSub: Subscription;


  constructor(private authService: AuthService, private alertCtrl: AlertController, private router: Router) {}

  ngOnInit() {
   this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

   onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
        authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe( () => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
      this.authService.whatever = true;
    },
    async errorMessage => {
      const alert = await this.alertCtrl.create({
        header: 'Alert',
        message: errorMessage
        ,
        buttons: ['OK']
      });
      await alert.present();
      this.isLoading = false;
    }
    );

    form.reset();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
