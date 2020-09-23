import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../models/user/user';
import { LoginService } from '../../../services/authentication/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseBean } from '../../../models/response/response-bean';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // obtaining the reference of the form
  @ViewChild('f', null)
  f: NgForm;

  @ViewChild('closebutton') closebutton;

  public model = new User('', '', '', '', '', '', false, '', []);
  public errorMessage: string;

  public responseBean: ResponseBean;

  constructor(
    public loginService: LoginService,
    public router: Router,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMessage = '';
    this.loginService.accountLogin(this.model).then(
      data => {
        this.responseBean = data;
        if (this.responseBean.requestOk) {
          const filteredresult = this.responseBean.data.filter(i => i.key === 'TOKEN');
          if (JSON.stringify(filteredresult) !== '[]') {
            localStorage.setItem('authorization', 'Bearer ' + filteredresult[0]['value']);
            localStorage.setItem('loggedin', JSON.stringify(true));
            this.close();
            this.router.navigate(['/']);
            location.reload();
          }
        }
      }, err => {
        this.errorMessage = 'INCORRECT CREDENTIALS';
      }
    ).catch(
      err => {
        this.errorMessage = 'INCORRECT CREDENTIALS';
      }
    );
  }

  close() {
    this.closebutton.nativeElement.click();
  }

}
