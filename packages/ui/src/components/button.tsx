import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "button-base",
  {
    variants: {
      variant: {
        default: "",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  },
);

export default function Button({ className, variant, asChild = false, ...props }: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Component = asChild ? Slot : "button";

  return <Component data-slot="button" className={cn(buttonVariants({ variant, className }))} {...props} />;
}
