import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class ApiService {
  public session!: User;
  public API: any = require('dc-api-client');
  public _logged: boolean = false;

  constructor(private router: Router) { }

  get logged(): boolean {
    return this._logged;
  }

  get Interface(): any {
    return this.API;
  }

  private async _refresh(): Promise<boolean> {
    const res = await this.API.Auth.getSession();

    this._logged = false;

    if (res.success) {
      if (res.msg) this._logged = true;
      this.session = res.msg;
    }

    return this._logged;
  }

  sessionAwaiter: Promise<boolean> | null = null;
  refresh(): Promise<boolean> { return this.sessionAwaiter = this._refresh(); }

  async logout() {
    const res = await this.API.Auth.logout();
    if (res.success) this.router.navigate(['/auth/login']);
  }
}
