import type { OmitKnownKeys } from "@repo/types";
import type { ComponentProps } from "react";

import { Checkbox } from "@repo/ui/components/checkbox";
import { Field, FieldLabel } from "@repo/ui/components/field";

import { useFieldContext } from "@/contexts";

interface CheckFieldProps extends OmitKnownKeys<
  ComponentProps<typeof Checkbox>,
  "onCheckedChange" | "aria-invalid" | "checked" | "onBlur" | "name" | "id"
> {
  label: string;
}

export function CheckField({ label, ...props }: CheckFieldProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <Checkbox
        onCheckedChange={(checked) => field.handleChange(checked)}
        checked={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        name={field.name}
        id={field.name}
        {...props}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  );
}
