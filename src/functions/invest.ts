import type { Investment } from "../types/investment";
import type { FormattedInvestment } from "../types/formattedInvestment";

export function Invest({
  capital,
  interest_rate,
  periods,
  objective,
  increment,
  iso,
  currency,
}: Investment): FormattedInvestment {
  if (capital && interest_rate && !periods && !objective) {
    throw new Error(
      "You have to enter either an objective or how many periods."
    );
  }

  function formatInvestment(investmentData: Investment): FormattedInvestment {
    return Object.entries(investmentData).reduce((accumulator, current) => {
      const [key, value] = current;
      if (
        typeof value === "number" &&
        key != "interest_rate" &&
        key !== "periods"
      ) {
        // Type assertion workaround: only assign to known keys of FormattedInvestment
        (accumulator as any)[key] = new Intl.NumberFormat(iso, {
          style: "currency",
          currency: currency,
        }).format(value);
      }
      if (typeof value === "number" && key === "interest_rate") {
        accumulator[key] = new Intl.NumberFormat(iso, {
          style: "percent",
          minimumFractionDigits: 3,
        }).format(value);
      }

      console.log("accumulator: ", accumulator);

      return accumulator;
    }, {} as FormattedInvestment);
  }

  const investment: Investment = {
    capital,
    interest_rate: interest_rate / 100,
    periods,
    objective,
    increment,
    amount: capital,
    iso,
    currency,
  };

  if (!investment.amount) {
    throw new Error("Internal error.");
  }

  if (periods && !objective) {
    for (let i = 0; i < periods; i++) {
      investment.amount = investment.amount * (1 + investment.interest_rate);
      if (increment) {
        investment.amount += increment;
      }
    }
  }

  if (!periods && objective) {
    periods = 0;
    for (investment.amount; investment.amount < objective; periods++) {
      investment.amount = investment.amount * (1 + investment.interest_rate);
      if (increment) {
        investment.amount += increment;
      }
      if (investment.amount >= objective) {
        investment.amount = Number(investment.amount.toFixed(2));
      }
    }
  }

  return formatInvestment(investment);
}
