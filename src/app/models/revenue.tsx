export interface IRevenue {
  year: number;
  month: number;
  totalRevenue: number;
  totalQuantity: number;
  productRevenue: number;
  productQuantity: number;
}

export interface IRevenueEnvelope {
  revenues: IRevenue[];
  resultCount: number;
}
