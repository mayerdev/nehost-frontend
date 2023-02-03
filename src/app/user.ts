export interface User  {
  _id: string,
  numId: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  balance: number,
  credit_limit: number,
  dogovor: {
    fio: string,
    passport: string,
    email: string,
    phone: string,
    accepted: boolean
  },
  limits: {
      vcpu: number,
      ram: number,
      disk: number,
      sites: number,
      ports: number
  },
  group: string
};
