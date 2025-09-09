type BaseProps = {
  iso: "fr-CA" | "en-CA";
  currency: "CAD" | "USD" | "GBP" | "EUR" | "BRL" | "JPY" | "CNY";
};

type InvestmentProps = {
  capital: number;
  interest_rate: number;
  periods?: number;
  objective?: number;
  increment?: number;
  amount?: number;
};

type FormattedInvestmentProps = {
  capital: string;
  interest_rate: string;
  periods: string;
  objective: string;
  increment: string;
  amount: string;
};

export type Investment = InvestmentProps & BaseProps;

export type FormattedInvestment = FormattedInvestmentProps & BaseProps;
