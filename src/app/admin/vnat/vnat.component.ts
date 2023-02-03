import { ApiService } from './../../api.service';
import { Subnet } from './../../subnet';
import { Port } from './../../port';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vnat',
  templateUrl: './vnat.component.html',
  styleUrls: ['./vnat.component.less']
})
export class VnatComponent implements OnInit {
  public ports: Port[] = [];
  public subnets: Subnet[] = [];
  public allocModal: boolean = false;

  public allocForm = {
    subnet_id: '',
    start: 5000,
    end: 5100
  }

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
    this.refreshSubnets();
  }

  async refresh() {
    const res = await this.api.Interface.Ports.list();
    if(res.success) this.ports = res.msg;
  }

  async refreshSubnets() {
    const res = await this.api.Interface.Subnets.list();
    if(res.success) this.subnets = res.msg;
  }

  async create() {
    const res = await this.api.Interface.Ports.alloc(this.allocForm);
    if(res.success) {
      this.refresh();
      this.allocModal = false;
      return;
    }

    alert(res.msg)
  }

  async free(id: string) {
    const res = await this.api.Interface.Ports.free(id);
    if(res.success) return this.refresh();

    alert(res.msg);
  }
}
