import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option.ts";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
};

export function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length) {
              onChange(newValue);
            }
          }}
          value={value.length ? value : [options?.[0].id]}
          {...rest}
        >
          {options?.map((option) => (
            <ToggleButton value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    ></Controller>
  );
}
