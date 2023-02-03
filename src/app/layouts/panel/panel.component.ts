import { Vtariff } from './../../vtariff';
import { Operation } from './../../operation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ClrWizard } from '@clr/angular';
import { Location } from 'src/app/location';
import { Node } from 'src/app/node';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
  public section: string = '';
  public operations: Operation[] = [];

  @ViewChild('createVServer') createVServer!: ClrWizard;
  public cvsOpen: boolean = false;

  public locations: Location[] = [];
  public nodes: Node[] = [];
  public tariffs: Vtariff[] = [];

  public createVsForm = {
    location_id: '',
    node_id: '',
    tariff_id: '',
    password: '',
    os: '',
    ports: {
      http: false,
      https: false,
      ftp: false,
      samp: false,
      minecraft: false
    }
  };

  public templates = {
    centos7: 'local:vztmpl/centos-7-default_20190926_amd64.tar.xz',
    rockylinux8: 'local:vztmpl/rockylinux-8-default_20210929_amd64.tar.xz',
    debian10: 'local:vztmpl/debian-10-standard_10.7-1_amd64.tar.gz',
    debian11: 'local:vztmpl/debian-11-standard_11.3-0_amd64.tar.gz',
    ubuntu20: 'local:vztmpl/ubuntu-20.04-standard_20.04-1_amd64.tar.gz'
  };

  public abuse = null;

  public loading: boolean = false;

  public changePasswordForm = {
    old: '',
    new: '',
    newr: ''
  };
  public cpModal: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public api: ApiService) { }

  async ngOnInit() {
    await this.api.refresh();
    if (!this.api.logged) return this.router.navigate(['/auth/login']);

    this.getOperations();
    this.getAbuse();

    this.route.data.subscribe(async params => {
      if(params['section']) this.section = params['section'];

      await this.api.refresh();
      if (this.section === 'admin' && this.api.session.group !== 'admin') this.router.navigate(['/panel/dashboard']);
    });
    return;
  }

  async changePassword() {
    const res = await this.api.Interface.Account.changePassword(this.changePasswordForm);
    if(res.success) {
      this.api.refresh();
      this.api.logout();
      return alert('Пароль изменён');
    }

    switch(res.msg) {
      case 'FillFields':
        alert('Заполните все поля');
        break;
      case 'OldPassword':
        alert('Некорректный старый пароль');
        break;
      case 'Password':
        alert('Пароль не подходит под требования');
        break;
      case 'PasswordRepeat':
        alert('Неверный повтор пароля');
        break;
      default:
        alert(res.msg);
        break;
    }
  }

  async getAbuse() {
    const res = await this.api.Interface.Account.abuse();
    if(res.success) this.abuse = res.msg
  }

  async getLocations() {
    this.loading = true;
    const res = await this.api.Interface.Services.getLocations();
    this.loading = false;
    if(res.success) this.locations = res.msg;
  }

  async getNodes() {
    this.loading = true;
    const res = await this.api.Interface.Services.getNodes(this.createVsForm.location_id);
    this.loading = false;
    if(res.success) this.nodes = res.msg;
  }

  async getTariffs() {
    this.loading = true;
    const res = await this.api.Interface.Services.getTariffs(this.createVsForm.node_id);
    this.loading = false;
    if(res.success) this.tariffs = res.msg;
  }

  async createServer() {
    await this.getLocations();
    await this.getNodes();
    this.cvsOpen = true;
  }

  async createVS() {
    const res = await this.api.Interface.Services.createVserver(this.createVsForm);
    if(res.success) {
      alert('Успешно, сервер заказан');
      this.cvsOpen = false;
      this.router.navigate(['/vps/list']);
      return;
    }

    this.cvsOpen = true;

    switch(res.msg) {
      case 'FillFields':
        alert('Заполните все поля');
        break;
      case 'Password':
        alert('Пароль должен быть от 6 до 32 символов');
        break;
      case 'NoUser':
        alert('Вы не существуете');
        break;
      case 'NoLocation':
        alert('Локация не существует');
        break;
      case 'NoNode':
        alert('Группа серверов не существует');
        break;
      case 'NoTariff':
        alert('Тариф не существует');
        break;
      case 'NoOS':
        alert('Некорректная ОС');
        break;
      case 'Balance':
        alert('Недостаточно средств');
        break;
      case 'NoSubnet':
        alert('Нет свободных подсетей');
        break;
      case 'NoMoreIps':
        alert('Нет свободных IP');
        break;
      case 'SystemError':
        alert('Произошла системная ошибка');
        break;
      case 'Limits':
        alert('Вы превысили лимит ресурсов');
        break;
      default:
        alert(res.msg);
        break;
    }
  }

  async getOperations() {
    const res = await this.api.Interface.Operations.list();
    if (res.success) this.operations = res.msg;
  }

  getDate(objectId: any) {
    return new Date(parseInt(new String(objectId).substring(0, 8), 16) * 1000).toLocaleString('ru-RU');
  }

  formatPrice(price: number) {
    return price.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    });
  }
}
