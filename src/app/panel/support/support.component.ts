import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface Ticket {
  _id: string,
  title: string,
  solved: boolean
}

interface Message {
  _id: string,
  ticket_id: string,
  title: string,
  text: string,
  status: string
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.less']
})
export class UserSupportComponent implements OnInit {
  public tickets: Ticket[] = [];
  public ticket?: Ticket;
  public messages: Message[] = [];
  public viewModal: boolean = false;
  public createModal: boolean = false;

  constructor(public api: ApiService) { }

  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    const res = await this.api.Interface.Support.list();
    if(res.success) this.tickets = res.msg;
  }

  async view(id: string) {
    const res = await this.api.Interface.Support.view(id);

    if(res.success) {
      this.ticket = res.msg.ticket;
      this.messages = res.msg.messages;
      this.viewModal = true;
    }
  }

  getDate(oid: string) {
    return new Date(parseInt(oid.substring(0, 8), 16) * 1000).toLocaleDateString('ru-RU');
  }
}
