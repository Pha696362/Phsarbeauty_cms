export interface IGeo {
  key?: string;
  code?: string;
  name?: string;
  description?: string;
  status: any;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
}
export interface IDistrict {
  key?: string;
  province:any;
  code?: string;
  name?: string;
  description?: string;
  status: any;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
}

export interface ICommunes {
  key?: string;
  province:any;
  district:any;
  code?: string;
  name?: string;
  description?: string;
  status: any;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
}

export interface IVillage {
  key?: string;
  province:any;
  district:any;
  commune:any;
  code?: string;
  name?: string;
  description?: string;
  status: any;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
}


export interface ISubCategory {
  key?: string;
  name?: string;
  category:any;
  description?: string;
  status: any;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
}


export interface IData {
  key?: string;
  name?: string;
  description?: string;
  status: any;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
}