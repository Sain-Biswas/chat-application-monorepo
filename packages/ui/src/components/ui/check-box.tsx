import { Checkbox as Primitive } from "@base-ui-components/react";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import CheckIcon from "../../icons/check-icon";
import MinusIcon from "../../icons/minus-icon";
import { cn } from "../../lib/cn";

const checkBoxVariant = cva("check-box", {
  variants: {
    variant: {
      default: "check-box__default",
      error: "check-box__error",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

const { Indicator, Root } = Primitive;

export default function CheckBox({
  className,
  variant = "default",
  isDeterminate = false,
  ...props
}: ComponentProps<typeof Root> &
  VariantProps<typeof checkBoxVariant> & { isDeterminate?: boolean }) {
  return (
    <Root className={cn(checkBoxVariant({ variant, className }))} {...props}>
      <Indicator className="check-box__indicator">
        {isDeterminate ? (
          <MinusIcon className="check-box__icon" />
        ) : (
          <CheckIcon className="check-box__icon" />
        )}
      </Indicator>
    </Root>
  );
}
