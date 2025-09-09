import type { FormattedInvestment, Investment } from "../types/investment";

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
    return Object.entries(investmentData).reduce(
      (accumulator, current) => {
        const [key, value] = current;
        const typedKey = key as keyof Investment;
        if (
          typeof value === "number" &&
          /*         typedKey != "interest_rate" &&
        typedKey !== "periods" */
          (typedKey == "capital" ||
            typedKey == "objective" ||
            typedKey == "increment" ||
            typedKey == "amount")
        ) {
          accumulator[typedKey] = new Intl.NumberFormat(iso, {
            style: "currency",
            currency: currency,
          }).format(value);
        }
        if (typeof value === "number" && typedKey === "interest_rate") {
          accumulator[typedKey] = new Intl.NumberFormat(iso, {
            style: "percent",
            minimumFractionDigits: 3,
          }).format(value);
        }

        return accumulator;
      },
      { iso, currency } as FormattedInvestment
    );
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

  console.log(investment);

  return formatInvestment(investment);
}
