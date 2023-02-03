import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Promo } from '../../promo';

@Component({
  selector: 'app-promocodes',
  templateUrl: './promocodes.component.html',
  styleUrls: ['./promocodes.component.less']
})
export class PromocodesComponent implements OnInit {
  public promos: Promo[] = [];
  public promo?: Promo;
  public createForm: Promo = {
    _id: '',
    percent: 1,
    usage: -1
  };

  public createModal: boolean = false;
  public editModal: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    const res = await this.api.Interface.Promo.list();
    if(res.success) this.promos = res.msg;
  }


  async create() {
    const res = await this.api.Interface.Promo.create(this.createForm);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.createModal = false;
      return;
    }

    alert(res.msg);
  }

  async save() {
    const res = await this.api.Interface.Promo.save(this.promo);
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.editModal = false;
      return;
    }

    alert(res.msg);
  }

  async remove(item: Promo) {
    const res = await this.api.Interface.Promo.remove({ _id: item._id });
    if(res.success) {
      this.refresh();
      alert('Успешно');
      this.promos.splice(1, this.promos.indexOf(item));
      return;
    }

    alert(res.msg);
  }
}
