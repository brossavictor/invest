export type FormattedInvestment = {
  capital: string;
  interest_rate: string;
  periods: string;
  objective: string;
  increment: string;
  amount: string;
  iso: "fr-CA" | "en-CA";
  currency: "CAD" | "USD" | "GBP" | "EUR" | "BRL" | "JPY" | "CNY";
};
