import { Location } from './../../location';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.less']
})
export class LocationsComponent implements OnInit {
  public locations: Location[] = [];
  public location?: Location;
  public createForm  = {
    name: '',
    available: true
  }

  public createModal: boolean = false;
  public editModal: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    const res = await this.api.Interface.Locations.list();
    if(res.success) this.locations = res.msg;
  }

  async create() {
    const res = await this.api.Interface.Locations.create(this.createForm);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.createModal = false;
      return;
    }

    alert(res.msg);
  }

  async save() {
    const res = await this.api.Interface.Locations.save(this.location);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.editModal = false;
      return;
    }

    alert(res.msg);
  }
}
