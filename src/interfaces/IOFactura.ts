export interface Factura {
  IdFac: number;
  Encabezado: Encabezado;
  Detalle: Detalle[];
  Totales: Totales;
}

export interface Detalle {
  NmbItem: string;
  DscItem: string;
  QtyItem: string;
  PrcItem: string;
}

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

export interface Totales {
  MntNeto: string;
  TasaIVA: string;
  IVA: string;
  MntTotal: string;
}
