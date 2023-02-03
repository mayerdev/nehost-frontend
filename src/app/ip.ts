import { Vserver } from './vserver';

export interface Ip {
  _id: string,
  subnet_id: string,
  vserver_id: string,
  vserver: Vserver
  ip: string,
  reserved: boolean
}
