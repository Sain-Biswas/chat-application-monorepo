import { Checkbox as Primitive } from "@base-ui-components/react";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import CheckIcon from "../../icons/check-icon";
import { cn } from "../../lib/cn";

const checkBoxVariant = cva("check-box", {
  variants: {
    variant: {
      default: "check-box__default",
      indeterminate: "check-box__indeterminate",
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
  ...props
}: ComponentProps<typeof Root> & VariantProps<typeof checkBoxVariant>) {
  return (
    <Root className={cn(checkBoxVariant({ variant, className }))} {...props}>
      <Indicator className="check-box__indicator">
        <CheckIcon className="check-box__icon" />
      </Indicator>
    </Root>
  );
}
