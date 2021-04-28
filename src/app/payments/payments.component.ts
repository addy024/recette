import { Router } from '@angular/router';
import { WithDataService } from './../shared/with-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit, OnDestroy {

  constructor(private wd: WithDataService, private router: Router) { }

  pays= []

  async ngOnInit() {  
    await this.wd.fetchPayments();

    this.pays = this.wd.getPayments();
    console.log("Pays : " + this.pays + " !!!!!!!!!!!!!!!")
  }

  async paying(index){
    await this.wd.change(index);
    this.router.navigate(["recipes"])
  }

  async ngOnDestroy(){
    this.pays = []
    await this.wd.fetchPayments();

    this.pays = this.wd.getPayments();
  }

}
