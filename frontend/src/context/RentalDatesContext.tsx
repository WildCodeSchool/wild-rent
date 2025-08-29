import { createContext, PropsWithChildren, useState } from "react";

type RentalDatesContextType = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  keyword: string | undefined;
  changeRentalDates: (
    startDateValue: Date,
    endDateValue: Date,
    keyword: string | undefined
  ) => void;
};

export const RentalDatesContext = createContext<
  RentalDatesContextType | undefined
>(undefined);

export const RentalDatesProvider = ({ children }: PropsWithChildren) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const changeRentalDates = (
    startDateValue: Date,
    endDateValue: Date,
    keywordValue: string | undefined
  ) => {
    setStartDate(startDateValue);
    setEndDate(endDateValue);
    setKeyword(keywordValue);
  };

  return (
    <RentalDatesContext.Provider
      value={{ startDate, endDate, keyword, changeRentalDates }}
    >
      {children}
    </RentalDatesContext.Provider>
  );
};
