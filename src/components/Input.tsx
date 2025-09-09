type InputProps = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, ...rest }: InputProps) {
  return (
    <fieldset>
      {legend && <legend>{legend}</legend>}
      <input {...rest} />
    </fieldset>
  );
}
