import { User } from './../../user';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public user?: User;
  public modal: boolean = false;

  constructor(public api: ApiService) { }

  async ngOnInit() {
    const res = await this.api.Interface.Users.list();
    if(res.success) this.users = res.msg;
  }

  async save() {
    const res = await this.api.Interface.users.save(this.user);
    if(res.success) alert('Сохранено');
    else alert(res.msg);
  }
}
