import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { Node } from '../../node';
import { Location } from '../../location';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.less']
})
export class NodesComponent implements OnInit {
  public nodes: Node[] = [];
  public node?: Node;
  public locations: Location[] = [];
  public createForm = {
    location_id: '',
    visible_name: '',
    name: '',
    hostname: '',
    username: '',
    password: '',
    available: true
  }

  public createModal: boolean = false;
  public editModal: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
    this.refreshLocations();
  }

  async refresh() {
    const res = await this.api.Interface.Nodes.list();
    if(res.success) this.nodes = res.msg;
  }

  async refreshLocations() {
    const res = await this.api.Interface.Locations.list();
    if(res.success) this.locations = res.msg;
  }

  async create() {
    const res = await this.api.Interface.Nodes.create(this.createForm);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.createModal = false;
      return;
    }

    alert(res.msg);
  }

  async save() {
    const res = await this.api.Interface.Nodes.save(this.node);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.editModal = false;
      return;
    }

    alert(res.msg);
  }
}
