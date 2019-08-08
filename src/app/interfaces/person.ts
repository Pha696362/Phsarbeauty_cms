export interface IPerson {
  key?: string;
  crime_key?:string;
  status?: any;
  create_date?: Date;
  create_by?: any;
  update_date?: Date;
  update_by?: any;
  page_key?: number;
  first_name?: string;
  last_name?: string;
  khmer_first_name?: string;
  khmer_last_name?: string;
  full_name?: string;
  unique_id?: string;
  crimeRef?: string;
  phone?: string;
  address?: string;
  person_type?: any;
  arrested?: any;
  file?: any;
  dob?: any;
  age?: number;
  gender?: any;
  url?: any;
  description?: string;
}

export interface IVictim {
  key?: string;
  crime_key?:string;
  status?: any;
  create_date?: Date;
  create_by?: any;
  update_date?: Date;
  update_by?: any;
  page_key?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  nick_name?: string;
  religion?: string;
  unique_id?: string;
  phone?: string;
  address?: string;
  person_type?: any;
  dob?: any;
  gender?: any;
  url?: any;
  description?: string;
  education?: string;
  nationality?: any;
  file?: any;
  id_expire?: any;
  id_passport?: any;
  country?:any;
  province?:any;
  district?:any;
  commune?:any;
  village?:any;
  height?:string;
  weight?:string;
  color?:string;
  hair?:string;
  nose?:string;
  eyebrow?:string;
  ear?:string;
  eye?:string;
  face?:string;
  chin?:string;
  mouth?:string;
  mark?:string;
  father_last_name?:string;
  father_first_name?:string;

  father_nick_name?:string;

  father_full_name?:string;

  mother_last_name?:string;

  mother_first_name?:string;

  mother_nick_name?:string;

  mother_full_name?:string;



  
}
