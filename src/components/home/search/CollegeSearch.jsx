"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@apollo/client";
import { GET_COLLEGES } from "@/graphql/query";
import { Search } from "lucide-react";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";

function CollegeSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { loading, error, data } = useQuery(GET_COLLEGES);

  const frameworks = data?.colleges || [];

  const preprocessInput = (input) => {
    return new RegExp(input.toLowerCase().replace(/[\W_]+/g, ""));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? frameworks.find((framework) =>
                preprocessInput(value).test(framework.name.toLowerCase())
              )?.name
            : "Select College..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-48 lg:w-[425px] p-0">
        <Command>
          <CommandInput
            placeholder="Search College..."
            onChange={(e) => setValue(e.target.value)}
          />
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {frameworks.length === 0 && (
            <CommandEmpty>No college found.</CommandEmpty>
          )}
          <CommandGroup className="overflow-x-hidden overflow-y-scroll">
            {frameworks
              .filter((framework) =>
                preprocessInput(value).test(framework.name.toLowerCase())
              )
              .map((framework) => (
                <Link
                  key={framework.name}
                  href={`/colleges/${sanitizeTitleForURL(framework.name)}/${
                    framework.customId
                  }`}
                >
                  <CommandItem
                    value={framework.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.name}
                  </CommandItem>
                </Link>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CollegeSearch;
