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
import { GET_COURSES } from "@/graphql/query";
import { Search } from "lucide-react";
import Link from "next/link";
import { sanitizeTitleForURL } from "@/lib/utils";

function CourseSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const frameworks = data?.courses;

  const preprocessInput = (input) => {
    return input.toLowerCase().replace(/[\W_]+/g, "");
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
            ? frameworks.find(
                (framework) =>
                  preprocessInput(framework.courseName) === preprocessInput(value)
              )?.courseName
            : "Select Course..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-48 lg:w-[425px] p-0">
        <Command>
          <CommandInput placeholder="Search Course..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup className="overflow-x-hidden overflow-y-scroll">
            {frameworks
              .filter((framework) =>
                preprocessInput(framework.courseName).includes(
                  preprocessInput(value)
                )
              )
              .map((framework) => (
                <Link
                  key={framework.courseName}
                  href={`/courses/${sanitizeTitleForURL(framework.courseName)}/${
                    framework.customId
                  }`}
                >
                  <CommandItem
                    value={framework.courseName}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.courseName}
                  </CommandItem>
                </Link>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CourseSearch;
