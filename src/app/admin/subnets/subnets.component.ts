import { Subnet } from './../../subnet';
import { Ip } from './../../ip';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { Node } from '../../node';

@Component({
  selector: 'app-subnets',
  templateUrl: './subnets.component.html',
  styleUrls: ['./subnets.component.less']
})
export class SubnetsComponent implements OnInit {
  public subnets: Subnet[] = [];
  public nodes: Node[] = [];
  public ips: Ip[] = [];
  public createForm = {
    node_id: '',
    subnet: '',
    start: 2,
    end: 254,
  };

  public createModal: boolean = false;
  public viewModal: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
    this.refreshNodes();
  }

  async refresh() {
    const res = await this.api.Interface.Subnets.list();
    if(res.success) this.subnets = res.msg;
  }

  async refreshNodes() {
    const res = await this.api.Interface.Nodes.list();
    if(res.success) this.nodes = res.msg;
  }

  public selected: string = '';
  async view(id: string) {
    const res = await this.api.Interface.Subnets.view(id);
    if(res.success) {
      this.ips = res.msg;
      this.viewModal = true;
      this.selected = id;
      return;
    }

    alert(res.msg);
  }

  async create() {
    const res = await this.api.Interface.Subnets.create(this.createForm);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.createModal = false;
      return;
    }

    alert(res.msg);
  }

  async toggle(id: string) {
    const res = await this.api.Interface.Subnets.toggle(id);
    if(res.success) {
      this.view(this.selected);
      return;
    }

    alert(res.msg);
  }
}
