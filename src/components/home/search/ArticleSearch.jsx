"use client"
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
import { GET_ARTICLES } from "@/graphql/query";
import { Search } from "lucide-react";
import { sanitizeTitleForURL } from "@/lib/utils";
import Link from "next/link";

function ArticleSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const articles = data?.articles;

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
            ? articles.find(
                (article) =>
                  preprocessInput(article.title) === preprocessInput(value)
              )?.title
            : "Select Article..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-48 lg:w-[425px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Articles..."
            onChange={(e) => setValue(e.target.value)}
          />
          <CommandEmpty>No article found.</CommandEmpty>
          <CommandGroup className="overflow-x-hidden overflow-y-scroll">
            {articles
              .filter((article) =>
                preprocessInput(article.title).includes(preprocessInput(value))
              )
              .map((article) => (
                <Link
                  key={article.title}
                  href={`/articles/${sanitizeTitleForURL(article.title)}/${article.customId}`}
                >
                  <CommandItem
                    value={article.title}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {article.title}
                  </CommandItem>
                </Link>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ArticleSearch;
