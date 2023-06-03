export interface Factura {
  IdFac: number;
  Encabezado: Encabezado;
  Detalle: Detalle[];
  Totales: Totales;
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
  DirRecep: string;
  CiudadRecep: string;
}

export interface Detalle {
  NmbItem: number;
  DscItem: string;
  QtyItem: number;
  PrcItem: number;
}
export interface Totales {
  MntNeto: number;
  TasaIVA: string;
  IVA: number;
  MntTotal: number;
}
