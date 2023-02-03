import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public error: string = '';

  public login = {
    email: '',
    password: ''
  };

  public register = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordr: ''
  };

  public form: 'register' | 'login' = 'login';
  public loading: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const action = params['action'];
      const actions = ['login', 'register'];

      if(!actions.includes(action)) return this.router.navigate(['/auth/login']);

      this.form = action;

      return;
    });
  }

  async signin() {
    this.error = '';
    this.loading = ClrLoadingState.LOADING;
    const res = await this.api.Interface.Auth.login(this.login);

    if(res.success) {
      this.loading = ClrLoadingState.SUCCESS;
      await this.api.refresh();

      if(this.api.logged) this.router.navigate(['/panel/dashboard']);

      return;
    }

    this.loading = ClrLoadingState.ERROR;

    switch(res.msg) {
      case 'FillFields':
        this.error = 'Заполните все поля';
        break;
      case 'Incorrect':
        this.error = 'Некорректный Email или пароль';
        break;
      default:
        this.error = res.msg;
        break;
    }
  }

  async signup() {
    this.error = '';
    this.loading = ClrLoadingState.LOADING;
    const res = await this.api.Interface.Auth.register(this.register);

    if(res.success) {
      this.loading = ClrLoadingState.SUCCESS;
      alert('Аккаунт зарегистрирован');
      this.error = '';
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loading = ClrLoadingState.ERROR;

    switch(res.msg) {
      case 'FillFields':
        this.error = 'Заполните все поля';
        break;
      case 'HumanName':
        this.error = 'Некорректное имя или фамилия';
        break;
      case 'Email':
        this.error = 'Некорректный адрес электронной почты';
        break;
      case 'PasswordRepeat':
        this.error = 'Пароли не совпадают';
        break;
      case 'Password':
        this.error = 'Пароль должен быть от 6 до 32 символов';
        break;
      case 'Exists':
        this.error = 'Аккаунт уже существует';
        break;
      default:
        this.error = res.msg;
        break;
    }
  }
}
