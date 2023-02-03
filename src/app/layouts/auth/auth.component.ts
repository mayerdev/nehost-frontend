import { Router } from '@angular/router';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) { }
  async ngOnInit() {
    await this.api.refresh();
    if(this.api.logged) return this.router.navigate(['/panel/dashboard']);
    return;
  }
}
