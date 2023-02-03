import { Location } from './location';

export interface Node {
  _id: string,
  location_id: string,
  location: Location,
  visible_name: string,
  name: string,
  hostname: string,
  username: string,
  password: string,
  available: boolean
}
