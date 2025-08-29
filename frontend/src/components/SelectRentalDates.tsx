import { Calendar as CalendarIcon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRentalDates } from "@/hooks/useRentalDates";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

export function SelectRentalDates() {
  const {
    startDate: contextStartDate,
    endDate: contextEndDate,
    keyword,
    changeRentalDates,
  } = useRentalDates();

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(
    contextStartDate ?? undefined
  );
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(
    contextEndDate ?? undefined
  );
  const [search, setSearch] = useState<string | undefined>(keyword);
  const navigate = useNavigate();

  const changeContextDates = (
    startDate: Date | undefined,
    endDate: Date | undefined,
    keyword: string | undefined
  ) => {
    if (startDate && endDate) {
      changeRentalDates(startDate, endDate, keyword);
    }
    if (keyword) {
      navigate(`/recherche?keyword=${keyword}`);
    }
  };

  return (
    <div className="rounded-full shadow-md px-4 py-2 my-4 bg-green/30 ">
      <div className="flex items-center gap-2">
        <div>
          <Label htmlFor="date" className="px-3 pt-2">
            Produit
          </Label>
          <Input
            value={search}
            className="border-none shadow-none focus:ring-0 focus:border-none focus:shadow-none focus-visible: ring-none focus-visible:border-none focus-visible:ring-0 "
            placeholder="Rechercher un produit"
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="date" className="px-3 pt-2">
            Début de la location
          </Label>
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal border-none shadow-none bg-transparent text-gray-700"
              >
                {startDate
                  ? startDate.toLocaleDateString()
                  : "Sélectionnez une date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={startDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setStartDate(date);
                  setStartDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="date" className="px-3 pt-2">
            Fin de la location
          </Label>
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal border-none shadow-none bg-transparent text-gray-700"
              >
                {endDate
                  ? endDate.toLocaleDateString()
                  : "Sélectionnez une date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={startDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setEndDate(date);
                  setEndDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <button
          className="p-3.5 rounded-full bg-green hover:cursor-pointer text-white hover:bg-white hover:text-black "
          onClick={() => changeContextDates(startDate, endDate, search)}
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}
