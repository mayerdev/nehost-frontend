import { Node } from './node';

export interface Vtariff {
  _id: string,
  node_id: string,
  node: Node,
  name: string,
  vcpu: number,
  ram: number,
  disk: number,
  price: number,
  available: boolean
}
