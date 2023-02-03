import { Abuse } from './../../abuse';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abuse',
  templateUrl: './abuse.component.html',
  styleUrls: ['./abuse.component.less']
})
export class UserAbuseComponent implements OnInit {
  public abuses: Abuse[] = [];

  constructor(public api: ApiService) { }

  async ngOnInit() {
    const res = await this.api.Interface.Support.abuses();
    if(res.success) this.abuses = res.msg;
  }

}
