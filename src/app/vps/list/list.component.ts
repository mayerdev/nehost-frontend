import { Vserver } from './../../vserver';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  public vservers: Vserver[] = [];
  public vserver?: Vserver;

  public templates: { [key: string]: string } = {
    'local:vztmpl/centos-7-default_20190926_amd64.tar.xz': 'CentOS 7',
    'local:vztmpl/rockylinux-8-default_20210929_amd64.tar.xz': 'RockyLinux 8',
    'local:vztmpl/debian-10-standard_10.7-1_amd64.tar.gz': 'Debian 10',
    'local:vztmpl/debian-11-standard_11.3-0_amd64.tar.gz': 'Debian 11',
    'local:vztmpl/ubuntu-20.04-standard_20.04-1_amd64.tar.gz': 'Ubuntu 20.04'
  }

  public vncLoader: ClrLoadingState = ClrLoadingState.DEFAULT;
  public vnc: boolean = false;
  public vncUrl: string = '';

  public rebootLoader: ClrLoadingState = ClrLoadingState.DEFAULT;

  public reinstallLoader: ClrLoadingState = ClrLoadingState.DEFAULT;
  public reinstall: boolean = false;
  public reinstallPayload = {
    vserver_id: '',
    os: ''
  };
  public _templates = {
    centos7: 'local:vztmpl/centos-7-default_20190926_amd64.tar.xz',
    rockylinux8: 'local:vztmpl/rockylinux-8-default_20210929_amd64.tar.xz',
    debian10: 'local:vztmpl/debian-10-standard_10.7-1_amd64.tar.gz',
    debian11: 'local:vztmpl/debian-11-standard_11.3-0_amd64.tar.gz',
    ubuntu20: 'local:vztmpl/ubuntu-20.04-standard_20.04-1_amd64.tar.gz'
  };

  public resetLoader: ClrLoadingState = ClrLoadingState.DEFAULT;
  public deleteLoader: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    const res = await this.api.Interface.Services.vservers();
    if (res.success) this.vservers = res.msg;
  }

  async getVnc(id: string) {
    this.vncLoader = ClrLoadingState.LOADING;
    const res = await this.api.Interface.Services.getVnc(id);
    if (res.success) {
      this.vncLoader = ClrLoadingState.SUCCESS;
      window.open(`https://${res.msg.ip}:8006/?console=lxc&novnc=1&node=${res.msg.node}&resize=scale&vmid=${encodeURIComponent(res.msg.vmid)}&vncticket=${encodeURIComponent(res.msg.user)}`, '', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,popup=yes');
      return;
    }

    this.vncLoader = ClrLoadingState.ERROR;
  }

  async reboot(id: string) {
    this.rebootLoader = ClrLoadingState.LOADING;

    const res = await this.api.Interface.Services.reboot(id);
    if (res.success) this.rebootLoader = ClrLoadingState.SUCCESS;
    else this.rebootLoader = ClrLoadingState.ERROR;
  }

  async reset(id: string) {
    this.resetLoader = ClrLoadingState.LOADING;

    const res = await this.api.Interface.Services.resetPassword(id);
    if (res.success) {
      this.refresh();
      this.resetLoader = ClrLoadingState.SUCCESS;
    }
    else this.resetLoader = ClrLoadingState.ERROR;
  }

  async delete(id: string) {
    if(!confirm('Вы уверены, что хотите удалить сервер? Средства возвращены не будут.')) return;
    this.deleteLoader = ClrLoadingState.LOADING;

    const res = await this.api.Interface.Services.deleteServer(id);
    if (res.success) {
      this.refresh();
      this.deleteLoader = ClrLoadingState.SUCCESS;
    }
    else this.deleteLoader = ClrLoadingState.ERROR;
  }

  async reinstallOS() {
    this.reinstallLoader = ClrLoadingState.LOADING;

    const res = await this.api.Interface.Services.reinstall(this.reinstallPayload);
    if (res.success) {
      this.refresh();
      this.reinstall = false;
      this.reinstallLoader = ClrLoadingState.SUCCESS;
    }
    else this.resetLoader = ClrLoadingState.ERROR;
  }

  formatDate(a: any) {
    return new Date(a).toLocaleDateString('ru-RU');
  }

  formatPrice(price: number) {
    return price.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    });
  }
}
