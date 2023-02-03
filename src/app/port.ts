import { Subnet } from './subnet';
import { Ip } from './ip';

export interface Port {
  _id: string,
  subnet_id: string,
  subnet: Subnet
  ip_id: string,
  public_ip: string,
  ip: Ip,
  port: number,
  localPort: number,
  allocated: boolean
}
