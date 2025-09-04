export function Invest(
  capital: number,
  interest_rate: number,
  periods?: number,
  objective?: number,
  increment?: number,
  iso = "fr-CA",
  currency = "CAD"
): object {
  if (capital && interest_rate && !periods && !objective) {
    throw new Error(
      "You have to enter either an objective or how many periods."
    );
  }

  function formatInvestment(investmentData: object): object {
    Object.entries(investmentData).forEach(([key, value]) => {
      if (
        typeof value === "number" &&
        key != "interest_rate" &&
        key != "periods"
      ) {
        investmentData[key] = new Intl.NumberFormat(iso, {
          style: "currency",
          currency: currency,
        }).format(value);
      }
      if (key === "interest_rate") {
        console.log(investmentData[key]);

        investmentData[key] = new Intl.NumberFormat(iso, {
          style: "percent",
          minimumFractionDigits: 3,
        }).format(value);
      }
    });
    return investmentData;
  }

  const investment = {
    capital,
    interest_rate: interest_rate / 100,
    periods,
    increment,
    amount: capital,
    currency,
  };

  if (periods && !objective) {
    console.log("case 1");

    for (let i = 0; i < periods; i++) {
      investment.amount = investment.amount * (1 + investment.interest_rate);
      if (increment) {
        investment.amount += increment;
      }
    }
    return formatInvestment(investment);
  }

  if (!periods && objective) {
    console.log("case 2");

    investment.periods = 0;
    for (
      investment.amount;
      investment.amount < objective;
      investment.periods++
    ) {
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
