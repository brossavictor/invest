import { useState } from "react";
import { Input } from "./components/Input";
import { Invest } from "./functions/invest";
import type { FormattedInvestment, Investment } from "./types/investment";
import { Select } from "./components/Select";
import { CURRENCIES, CURRENCIES_KEYS } from "./utils/currencies";

function App() {
  const [form, setForm] = useState({
    capital: "5000",
    interest_rate: "5",
    periods: "10",
    objective: "",
    increment: "",
    iso: "fr-CA",
    currency: "GBP",
  });

  const [result, setResult] = useState<FormattedInvestment>();

  function handleCalculate() {
    const investParams = Object.entries(form).reduce((accumulator, current) => {
      const [key, value] = current;
      const typedKey = key as keyof typeof form;
      if (typedKey != "iso" && typedKey != "currency") {
        accumulator[typedKey] = Number(value);
      } else {
        accumulator[typedKey] = value;
      }

      return accumulator;
    }, {} as Record<keyof typeof form, any>);

    setResult(Invest(investParams));
  }

  function handleForm(key: keyof Investment, value: string) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  return (
    <main>
      <button className="language" onClick={() => 1 + 1}>
        English 🍵
      </button>
      <div lang={form.iso} className="calculator">
        <h1>Investment Calculator</h1>
        <form action="">
          <label htmlFor="capital"></label>
          <Input
            type="text"
            legend="Capital"
            value={form.capital}
            placeholder="Set your initial capital."
            onChange={(e) => handleForm("capital", e.target.value)}
          />

          <label htmlFor="interest rate"></label>
          <Input
            type="text"
            legend="Interest rate"
            value={form.interest_rate}
            placeholder="Choose your interest per annum."
            onChange={(e) => handleForm("interest_rate", e.target.value)}
          />

          <label htmlFor="periods"></label>
          <Input
            type="text"
            legend="Periods"
            value={form.periods}
            placeholder="How many years are you investing for?"
            onChange={(e) => handleForm("periods", e.target.value)}
          />

          <label htmlFor="objective"></label>
          <Input
            type="text"
            legend="Objective"
            value={form.objective}
            placeholder="What is your target?"
            onChange={(e) => handleForm("objective", e.target.value)}
          />

          <label htmlFor="increment"></label>
          <Input
            type="text"
            legend="Increment"
            value={form.increment}
            placeholder="Set how much you want to reinvest yearly."
            onChange={(e) => handleForm("increment", e.target.value)}
          />

          <label htmlFor="currency"></label>
          <Select
            required
            legend="Currency"
            value={form.currency}
            onChange={(e) => handleForm("currency", e.target.value)}
          />

          {CURRENCIES_KEYS.map((currency, index) => (
            <option key={index} value={currency}>
              {CURRENCIES[currency].name}
              {<img src={CURRENCIES[currency].icon} alt={`${currency} icon`} />}
            </option>
          ))}
          <Select />
        </form>
        <button
          onClick={(event) => {
            event.preventDefault();
            handleCalculate();
          }}
        >
          Calculate 🧮
        </button>
        <div>
          <h2>Result</h2>
          <p>{result?.amount}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
