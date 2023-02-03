import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface Ticket {
  _id: string,
  title: string,
  user_email: string,
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
export class SupportComponent implements OnInit {
  public tickets: Ticket[] = [];
  public ticket?: Ticket;
  public messages: Message[] = [];
  public viewModal: boolean = false;

  public createModal: boolean = false;
  public createData = {
    email: '',
    title: '',
    text: ''
  }

  public answerData = {
    _id: '',
    title: '',
    text: '',
    status: 'success'
  }

  constructor(public api: ApiService) { }

  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    const res = await this.api.Interface.Asupport.list();
    if(res.success) this.tickets = res.msg;
  }

  async view(id: string) {
    const res = await this.api.Interface.Asupport.view(id);

    if(res.success) {
      this.ticket = res.msg.ticket;
      this.messages = res.msg.messages;
      this.viewModal = true;
    }
  }

  async toggle(id: string) {
    const res = await this.api.Interface.Asupport.toggle(id);

    if(res.success) this.refresh();
  }

  async answer() {
    this.answerData._id = this.ticket?._id || '';
    const res = await this.api.Interface.Asupport.answer(this.answerData);
    if(res.success) {
      this.view(this.answerData._id);
      return;
    }

    alert(res.msg)
  }

  async create() {
    const res = await this.api.Interface.Asupport.create(this.createData);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      return;
    }

    alert(res.msg);
  }

  getDate(oid: string) {
    return new Date(parseInt(oid.substring(0, 8), 16) * 1000).toLocaleDateString('ru-RU');
  }
}
