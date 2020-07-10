export interface IIncome {
  year: number;
  month: number;
  totalIncome: number;
  totalCost: number;
  productIncome: number;
  productCost: number;
}

export interface IIncomeEnvelope {
  incomes: IIncome[];
  resultCount: number;
}
