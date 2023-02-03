import { Vserver } from './../../vserver';
import { Port } from './../../port';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.less']
})
export class PortsComponent implements OnInit {
  public ports: Port[] = [];
  public vservers: Vserver[] = [];

  public allocModal: boolean = false;
  public addForm = {
    vserver_id: '',
    localPort: 80
  }

  constructor(public api: ApiService) { }

  async ngOnInit() {
    this.refresh();
    this.refreshVservers();
  }

  async refresh() {
    const res = await this.api.Interface.Services.ports();
    if (res.success) this.ports = res.msg;
  }

  async refreshVservers() {
    const res = await this.api.Interface.Services.vservers();
    if (res.success) this.vservers = res.msg;
  }

  async add() {
    const res = await this.api.Interface.Services.allocPort(this.addForm);

    if (res.success) {
      this.refresh();
      this.allocModal = false;
      alert('Добавлено');
      return;
    }

    switch (res.msg) {
      case 'FillFields':
        alert('Заполните все поля');
        break;
      case 'LocalPort':
        alert('Порт должен быть от 14 до 65535');
        break;
      case 'NoServer':
        alert('Сервер не существует');
        break;
      case 'NoIp':
        alert('IP сервера не существует');
        break;
      case 'NoNode':
        alert('Группа серверов не найдена');
        break;
      case 'Limits':
        alert('Вы достигли лимита количества портов');
        break;
      default:
        alert(res.msg);
        break;
    }
  }

  async free(id: string) {
    const res = await this.api.Interface.Services.free(id);

    if (res.success) return this.refresh();

    switch (res.msg) {
      case 'FillFields':
        alert('Заполните все поля');
        break;
      case 'NoPort':
        alert('Порт не найден');
        break;
      case 'NoIp':
        alert('IP не существует');
        break;
      case 'IncorrectIp':
        alert('IP не привязан к серверу');
        break;
      case 'NoServer':
        alert('Сервер не найден');
        break;
      default:
        alert(res.msg);
        break;
    }
  }
}
