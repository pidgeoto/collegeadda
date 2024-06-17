import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";

const CollegeFilter = ({
  affiliatedToOptions,
  // tagOptions,
  cityOptions,
  stateOptions,
  countryOptions,
  handleAffiliatedToFilterChange,
  // handleTagFilterChange,
  handleCityFilterChange,
  handleStateFilterChange,
  handleCountryFilterChange,
  resetFilters,
}) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Filter
            size={20}
            strokeWidth={1.75}
            className="p-2 rounded-md h-10 w-10 cursor-pointer bg-[#4f2e8e] text-white  border border-purple-800 hover:bg-white hover:text-[#4f2e8e]"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="overflow-y-scroll overflow-x-hidden"
        >
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
            <SheetDescription>
              <div>
                <div className="mb-4">
                  <p className="text-base">Affiliated To</p>
                  <Command>
                    <CommandInput placeholder="Search Affiliated To..." />
                    <CommandEmpty>No affiliated to found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[240px] h-auto">
                      {affiliatedToOptions.map((option, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() =>
                            handleAffiliatedToFilterChange(option)
                          }
                        >
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
                {/* <div className="mb-4">
                  <p className="text-base">Tags</p>
                  <Command>
                    <CommandInput placeholder="Search Tags..." />
                    <CommandEmpty>No tags found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[240px] h-auto">
                      {tagOptions.map((option, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleTagFilterChange(option)}
                        >
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div> */}
                <div className="mb-4">
                  <p className="text-base">City</p>
                  <Command>
                    <CommandInput placeholder="Search City..." />
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[240px] h-auto">
                      {cityOptions.map((option, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleCityFilterChange(option)}
                        >
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
                <div className="mb-4">
                  <p className="text-base">State</p>
                  <Command>
                    <CommandInput placeholder="Search State..." />
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[240px] h-auto">
                      {stateOptions.map((option, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleStateFilterChange(option)}
                        >
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>

                <div className="mb-4">
                  <p className="text-base">Country</p>
                  <Command>
                    <CommandInput placeholder="Search Country..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll max-h-[240px] h-auto">
                      {countryOptions.map((option, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleCountryFilterChange(option)}
                        >
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <button
                onClick={resetFilters}
                className="p-2 rounded-md h-10 bg-[#4f2e8e] text-white border border-purple-800 hover:bg-white hover:text-[#4f2e8e]"
              >
                Reset Filters
              </button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CollegeFilter;
