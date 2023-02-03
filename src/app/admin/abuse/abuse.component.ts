import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Abuse } from '../../abuse';

@Component({
  selector: 'app-abuse',
  templateUrl: './abuse.component.html',
  styleUrls: ['./abuse.component.less']
})
export class AbuseComponent implements OnInit {
  public abuses: Abuse[] = [];
  public abuse?: Abuse;
  public createForm: Abuse = {
    user: '',
    text: '',
    title: ''
  };

  public createModal: boolean = false;
  public editModal: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    const res = await this.api.Interface.Abuse.list();
    if(res.success) this.abuses = res.msg;
  }


  async create() {
    delete this.createForm._id;
    const res = await this.api.Interface.Abuse.create(this.createForm);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.createModal = false;
      return;
    }

    alert(res.msg);
  }

  async edit(item: Abuse) {
    const res = await this.api.Interface.Abuse.view({ _id: item._id });
    if(res.success) {
      this.editModal = true;
      this.abuse = Object.assign(item, res.msg);
      return;
    }

    alert(res.msg);
  }

  async save() {
    const payload = { ...this.abuse };
    if (payload.user._id) payload.user = payload.user._id;

    const res = await this.api.Interface.Abuse.save(payload);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.editModal = false;
      return
    }

    alert(res.msg);
  }

  async remove(item: Abuse) {
    const res = await this.api.Interface.Abuse.remove({ _id: item._id });
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.abuses.splice(1, this.abuses.indexOf(item));
      return;
    }

    alert(res.msg);
  }
}
