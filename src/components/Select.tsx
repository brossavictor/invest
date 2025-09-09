type Select = React.ComponentProps<"select"> & {
  legend?: string;
};

export function Select({ legend, children, ...rest }: Select) {
  return (
    <fieldset>
      {legend && <legend>{legend}</legend>}
      <select {...rest} />
    </fieldset>
  );
}
