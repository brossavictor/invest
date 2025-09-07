export type Investment = {
  capital: number;
  interest_rate: number;
  periods?: number;
  objective?: number;
  increment?: number;
  amount?: number;
  iso: "fr-CA" | "en-CA";
  currency: "CAD" | "USD" | "GBP" | "EUR" | "BRL" | "JPY" | "CNY";
};
