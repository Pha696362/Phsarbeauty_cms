export interface ICreditNote {
  key?: string;
  create_date: Date;
  create_date_key:number;
  create_by: any;
  update_date?: Date;
  update_by?: any;
  isPaid:boolean;
  page_key:number;
  status: any;
  student:any;
  term:any;
  note:string;
  memo:string;
  amount: number;
}
