import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  dateValue,
  handleChange,
}: {
  dateValue: Date | null;
  handleChange: (args: Date | string) => void;
}) => {
  const handleDateChange = (date: Date | null) => {
    handleChange(date ?? new Date()); // Use `??` to provide a default value
  };

  return (
    <DatePicker
      selected={dateValue}
      onChange={handleDateChange}
      className="dark:bg-[rgb(18,18,18)] dark:border-slate-700 date_picker_custom"
    />
  );
};

export default DatePickerComponent;
