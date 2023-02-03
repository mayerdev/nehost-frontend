import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public limits = {
    vcpu: 0,
    ram: 0,
    disk: 0,
    sites: 0,
    ports: 0
  }
  constructor(public api: ApiService) { }

  async ngOnInit() {
    const res = await this.api.Interface.Services.limits();
    if(res.success) this.limits = res.msg;
  }

  async requestIncrease(type: string) {
    const res = await this.api.Interface.Services.limitIncrease(type);
    if(res.success) return alert('Запрос на повышение лимита отправлен');

    switch(res.msg) {
      case 'FillFields':
        alert('Заполните все поля');
        break;
      case 'UnknownType':
        alert('Повышение ресурсов этого типа недоступно');
        break;
      case 'Exists':
        alert('У вас уже есть активный запрос');
        break;
      default:
        alert(res.msg)
        break;
    }
  }
}
