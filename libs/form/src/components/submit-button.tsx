import type { OmitKnownKeys } from "@repo/types";
import type { ComponentProps } from "react";

import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

import { useFormContext } from "@/contexts";

interface SubmitButtonProps extends OmitKnownKeys<
  ComponentProps<typeof Button>,
  "disabled" | "form" | "type"
> {
  submitText?: string;
  submittingText?: string;
}

export function SubmitButton({
  submitText = "Submit",
  submittingText = "Submitting...",
  ...props
}: SubmitButtonProps) {
  const formContext = useFormContext();

  return (
    <formContext.Subscribe
      selector={(state) => ({
        isPristine: state.isPristine,
        canSubmit: state.canSubmit,
        isSubmitting: state.isSubmitting,
      })}
    >
      {({
        isPristine,
        canSubmit,
        isSubmitting,
      }: {
        isPristine: boolean;
        canSubmit: boolean;
        isSubmitting: boolean;
      }) => (
        <Button
          disabled={isPristine || !canSubmit || isSubmitting}
          form={formContext.formId}
          type="submit"
          {...props}
        >
          {isSubmitting ? (
            <>
              <Spinner data-icon="inline-start" /> {submittingText}{" "}
            </>
          ) : (
            submitText
          )}
        </Button>
      )}
    </formContext.Subscribe>
  );
}
