import { Vtariff } from './../../vtariff';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { Node } from '../../node';
import { Location } from '../../location';

@Component({
  selector: 'app-vtariffs',
  templateUrl: './vtariffs.component.html',
  styleUrls: ['./vtariffs.component.less']
})
export class VtariffsComponent implements OnInit {
  public nodes: Node[] = [];
  public tariffs: Vtariff[] = [];
  public tariff?: Vtariff;
  public createForm = {
    node_id: '',
    name: '',
    vcpu: '',
    ram: '',
    disk: '',
    price: '',
    available: ''
  }

  public createModal: boolean = false;
  public editModal: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
    this.refreshNodes();
  }

  async refresh() {
    const res = await this.api.Interface.Vtariffs.list();
    if(res.success) this.tariffs = res.msg;
  }

  async refreshNodes() {
    const res = await this.api.Interface.Nodes.list();
    if(res.success) this.nodes = res.msg;
  }

  async create() {
    const res = await this.api.Interface.Vtariffs.create(this.createForm);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.createModal = false;
      return;
    }

    alert(res.msg);
  }

  async save() {
    const res = await this.api.Interface.Vtariffs.save(this.tariff);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.editModal = false;
      return;
    }

    alert(res.msg);
  }
}
