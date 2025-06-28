import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const cardVariants = cva("card-base", {
  variants: {
    variant: {
      elevated: "card-base__elevated",
      filled: "card-base__filled",
      outlined: "card-base__outlined",
    },
    defaultVariants: {
      variant: "filled",
    },
  },
});

export function Card({
  children,
  className,
  variant = "filled",
  ...props
}: ComponentProps<"button"> & VariantProps<typeof cardVariants>) {
  return (
    <button className={cn(cardVariants({ variant, className }))} {...props}>
      {children}
    </button>
  );
}

export function CardHeader({
  className,
  title,
  subtitle,
  description,
}: ComponentProps<"div"> & {
  title: string;
  description: string;
  subtitle: string;
}) {
  return (
    <div className={cn("card-base__header", className)}>
      <div className="card-base__header__title">{title}</div>
      <div className="card-base__header__subtitle">{subtitle}</div>
      <div className="card-base__header__description">{description}</div>
    </div>
  );
}

export function CardContent({ className, children }: ComponentProps<"div">) {
  return <div className={cn("card-base__content", className)}>{children}</div>;
}

export function CardFooter({ className, children }: ComponentProps<"div">) {
  return <div className={cn("card-base__footer", className)}>{children}</div>;
}
