import { Checkbox } from "@base-ui-components/react";
import type { ComponentProps } from "react";
import { cn } from "../..//lib/cn";
import CheckIcon from "../../icons/check-icon";
import type { TMaterialIcon } from "../../icons/types";

export function AssistChip({ className, Icon, text, isElevated = false, ...props }: ComponentProps<"button"> & { Icon?: TMaterialIcon | undefined; text?: string; isElevated?: boolean }) {
  return (
    <button className={cn("assist-button", isElevated ? "assist-button__elevated" : "", className)} {...props}>
      {Icon && <Icon className="assist-button__icon" />}
      <p className="assist-button__text">{text}</p>
    </button>
  );
}

const { Root, Indicator } = Checkbox;

export function FilterChip({ className, isElevated = false, text = "", Icon, ...props }: ComponentProps<typeof Root> & { isElevated?: boolean; text?: string; Icon?: TMaterialIcon }) {
  return (
    <Root className={cn("filter-chip", isElevated ? "filter-chip__elevated" : "", className)} {...props}>
      <Indicator className="filter-chip__indicator">
        <CheckIcon className="filter-chip__icon filter-chip__icon__start" />
      </Indicator>
      <p className="filter-chip__text">{text}</p>
      {Icon && <Icon className="filter-chip__icon filter-chip__icon__end" />}
    </Root>
  );
}
