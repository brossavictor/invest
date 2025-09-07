type InputProps = React.ComponentProps<"input"> & {
  legend?: string;
  /*   options: {
      currency: "CAD" | "USD" | "GBP" | "EUR" | "BRL" | "JPY" | "CNY";
      
  }; */
};

export function Input({ legend, ...rest }: InputProps) {
  return (
    <fieldset>
      {legend && <legend>{legend}</legend>}
      <input {...rest} />
    </fieldset>
  );
}
