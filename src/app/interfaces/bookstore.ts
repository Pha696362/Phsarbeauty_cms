export interface IBookstore {
}


export interface ITag{
  key: string;
  status: any;
  page_key: number;
  create_date: Date;
  create_by: object;
  update_date?: Date;
  update_by?: object;
  name:string;
}


export interface IGenre{
  key: string;
  status: any;
  page_key: number;
  create_date: Date;
  create_by: object;
  update_date?: Date;
  update_by?: object;
  name:string;
  subtitle:string;
  icon:string;
  fileName?:string;
  fileUrl?:string;
}


export interface ISlide{
  key: string;
  status: any;
  page_key: number;
  create_date: Date;
  create_by: object;
  update_date?: Date;
  update_by?: object;
  order:number;
  book?:any;
  name:string;
  description?:string;
  fileName?:string;
  fileUrl?:string;
}


export interface IBook{
  key: string;
  status: any;
  page_key: number;
  create_date: Date;
  create_by: object;
  update_date?: Date;
  update_by?: object;
  bookStatus:any;
  title:string;
  description?:string;
  genre:any;
  tag:any;
  tagKey:any;
  trending:any;
  publicDate:Date;
  docUrl?:string;
  fileName?:string;
  fileUrl?:string;
  paymentType:any;
  paymentTypeKey:any;
  ratingScale:number;
}