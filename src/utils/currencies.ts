import dollar from "../assets/currency-dollar.svg";
import pound from "../assets/currency-gbp.svg";
import euro from "../assets/currency-eur.svg";
import yenyuan from "../assets/currency-jpy.svg";

export const CURRENCIES = {
  CAD: { name: "Canadian Dollar", icon: dollar },
  USD: { name: "US Dollar", icon: dollar },
  GBP: { name: "British Pound", icon: pound },
  EUR: { name: "Euro", icon: euro },
  BRL: { name: "Brazilian Real", icon: dollar },
  JPY: { name: "Japanese Yen", icon: yenyuan },
  CNY: { name: "Chinese Yuan", icon: yenyuan },
};

export const CURRENCIES_KEYS = Object.keys(CURRENCIES) as Array<
  keyof typeof CURRENCIES
>;

//  currency: "CAD" | "USD" | "GBP" | "EUR" | "BRL" | "JPY" | "CNY";
