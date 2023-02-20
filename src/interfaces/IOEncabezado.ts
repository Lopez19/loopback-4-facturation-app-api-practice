export interface Encabezado {
  Emisor: Emisor;
  Receptor: Receptor;
}
export interface Emisor {
  RUTEmisor: string;
  RznSocEmi: string;
}

export interface Receptor {
  RUTRecep: string;
  RznSocRecep: string;
  GiroRecep: string;
  DirRecep: string;
  CmnaRecep: string;
  CiudadRecep: string;
}
