import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from 'src/app/core/services/auth.service';

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
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    if (this.authService.isAuthenticated) {
      this.router.navigateByUrl(this.returnUrl);
    }

  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@root.com', Validators.required && Validators.email),
      password: new FormControl('123Pa$$word!', Validators.required),
      tenant: new FormControl('root', Validators.required)
    });
  }

  onSubmit(): void {
    this.isBeingLoggedIn = true;
    this.loginForm.disable();
    this.authService.login(this.loginForm.value)
    .pipe(filter(result => result !== undefined))
    .subscribe(
      (token) => this.router.navigateByUrl(this.returnUrl),
      (error) => {
        this.loginForm.enable();
      }).add(() => this.isBeingLoggedIn = false);
  }
}
