import { cn } from "@/web/lib/utils";
import { IconCheck, IconCirclePlusFilled, type Icon, type IconProps } from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Separator } from "../../ui/separator";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  optionKeys: string[];
  options: Record<string, { title: string; icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>> }>;

}

export default function DataTableFacetedFilter<TData, TValue>({ column, title, optionKeys, options }: DataTableFacetedFilterProps<TData, TValue>) {
  "use no memo";
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <IconCirclePlusFilled />
          {title}
          {
            selectedValues.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {
                    selectedValues.size > 2
                      ? (
                          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                            {selectedValues.size}
                            {" "}
                            selected
                          </Badge>
                        )
                      : (
                          optionKeys.filter((option) => selectedValues.has(option)).map((option) => {
                            const o = options[option];

                            if (!o) return <></>;

                            return (
                              <Badge variant="secondary" key={option} className="rounded-sm px-1 font-normal">
                                {o?.title}
                              </Badge>
                            );
                          })
                        )
                  }
                </div>
              </>
            )
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {
                optionKeys.map((option) => {
                  const isSelected = selectedValues.has(option);
                  const o = options[option];

                  return (
                    <CommandItem
                      key={option}
                      onSelect={() => {
                        if (isSelected)
                          selectedValues["delete"](option);
                        else
                          selectedValues.add(option);

                        const filterValues = [...selectedValues];
                        column?.setFilterValue(
                          filterValues.length > 0 ? filterValues : undefined,
                        );
                      }}
                    >
                      <div
                        className={
                          cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                          )
                        }
                      >
                        <IconCheck />
                      </div>
                      {
                        o?.icon && <o.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      }
                      <span>{o?.title}</span>
                      {
                        facets?.get(option) && (
                          <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                            {facets?.get(option)}
                          </span>
                        )
                      }
                    </CommandItem>
                  );
                })
              }
            </CommandGroup>

            {
              selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )
            }

          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
