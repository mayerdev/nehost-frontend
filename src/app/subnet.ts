export interface Subnet {
  _id: string,
  node_id: string,
  node: {
    name: string,
    hostname: string
  }
  subnet: string,
  start: number,
  end: number
}
