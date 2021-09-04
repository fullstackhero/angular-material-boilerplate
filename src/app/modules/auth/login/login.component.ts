import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  isBeingLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/home';
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required && Validators.email),
      password: new FormControl('', Validators.required),
      tenant: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.isBeingLoggedIn = true;
    this.loginForm.disable()
    // this.authService.login(this.loginForm.value)
    //   .pipe(filter(result => result?.succeeded === true))
    //   .subscribe(() => this.router.navigateByUrl(this.returnUrl),
    //     error => { console.log(error); this.loginForm.enable();  }).add(()=>this.isBeingLoggedIn = false);
    this.router.navigateByUrl("/admin")
  }

  fillSuperAdminCredentials() {
    this.loginForm = new FormGroup({
      email: new FormControl('superadmin@fluentpos.com', Validators.required && Validators.email),
      password: new FormControl('123Pa$$word!', Validators.required)
    });
  }

  fillStaffCredentials() {
    this.loginForm = new FormGroup({
      email: new FormControl('staff@fluentpos.com', Validators.required && Validators.email),
      password: new FormControl('123Pa$$word!', Validators.required)
    });
  }
}
