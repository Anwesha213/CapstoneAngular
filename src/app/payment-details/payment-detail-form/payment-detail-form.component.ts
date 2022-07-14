import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
   if(this.service.formData.paymentDetailId==0) 
   this.insertRecord(form);
   else
   this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res =>{
      this.resetForm(form);
      this.service.refreshList();
      this.toastr.success('Your record has been submitted successfully','Payment Detail Register');
      this.router.navigate(['/thankyoupage']);
      },
      err => { console.log(err); }
    );
  }
   
  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res =>{
      this.resetForm(form);
      this.service.refreshList();
      this.toastr.info('Updated successfully','Payment Detail Register');
      },
      err => { console.log(err); }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
