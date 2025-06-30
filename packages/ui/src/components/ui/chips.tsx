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

export function FilterChip({ className, isElevated = false, ...props }: ComponentProps<typeof Root> & { isElevated?: boolean }) {
  return (
    <Root className={cn("filter-chip", isElevated ? "filter-chip__elevated" : "", className)} {...props}>
      <Indicator className="">
        <CheckIcon className="filter-chip__icon__start" />
      </Indicator>
      <p className="filter-chip">{}</p>
    </Root>
  );
}
