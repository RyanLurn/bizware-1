import { createFormHook } from "@tanstack/react-form";

import { CheckField } from "@/components/check-field";
import { SubmitButton } from "@/components/submit-button";
import { TextField } from "@/components/text-field";
import { fieldContext, formContext } from "@/contexts";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, CheckField },
  formComponents: { SubmitButton },
});
