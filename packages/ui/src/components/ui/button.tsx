import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { TMaterialIcon } from "../../icons/types";
import { cn } from "../../lib/cn";

const buttonVariants = cva("button-base", {
  variants: {
    variant: {
      primary: "button-base__primary",
      tonal: "button-base__tonal",
      outlined: "button-base__outlined",
      text: "button-base__text",
      elevated: "button-base__elevated",
    },
    shape: {
      rounded: "button-base__rounded",
      square: "button-base__square",
    },
    size: {
      "xtra-small": "button-base__xtra-small",
      small: "button-base__small",
      medium: "button-base__medium",
      large: "button-base__large",
      "xtra-large": "button-base__xtra-large",
    },
    defaultVariants: {
      variant: "primary",
      shape: "rounded",
      size: "small",
    },
  },
});

export default function Button({
  children,
  className,
  variant = "primary",
  shape = "rounded",
  size = "small",
  asChild = false,
  // eslint-disable-next-line unicorn/no-null
  Icon = null,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    Icon?: TMaterialIcon | null;
  }) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, shape, size, className }))}
      {...props}
    >
      {Icon && <Icon className="button-base__icon" />}
      {children}
    </Component>
  );
}
