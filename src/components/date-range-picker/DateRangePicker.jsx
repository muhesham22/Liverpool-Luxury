import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import CalenderIcon from "../../assets/icons/calender.svg";
import { setDateRange } from "../../store/slices/dateRangeSlice";

const DateRangePicker = ({ left, top, bookings = [] }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { startDate: startDateState, endDate: endDateState } = useSelector(
    (state) => state.dateRangeData
  );
  const [dateRange, setDateRangeState] = useState([
    {
      startDate: startDateState ? new Date(startDateState) : null,
      endDate: endDateState ? new Date(endDateState) : null,
      key: "selection",
    },
  ]);
  const [disabledDates, setDisabledDates] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setDateRangeState([
      {
        startDate: startDateState ? new Date(startDateState) : null,
        endDate: endDateState ? new Date(endDateState) : null,
        key: "selection",
      },
    ]);
  }, [startDateState, endDateState]);

  useEffect(() => {
    const calculateDisabledDates = () => {
      const dates = [];
      bookings.forEach((booking) => {
        let currentDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate) - 1;
        while (currentDate <= endDate && booking.status !== "Cancelled") {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      setDisabledDates(dates);
    };

    if (bookings && bookings.length > 0) {
      calculateDisabledDates();
    }
  }, [bookings]);

  const handleDateChange = (item) => {
    let startDate = item.selection.startDate;
    let endDate = item.selection.endDate;

    // Automatically adjust endDate if it's the same as startDate
    if (startDate && endDate && startDate.getTime() === endDate.getTime()) {
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
    }

    setDateRangeState([
      {
        startDate,
        endDate,
        key: "selection",
      },
    ]);

    dispatch(
      setDateRange({
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
      })
    );
  };

  return (
    <>
    
    {showDatePicker && (<div
        className="bg-black opacity-10 fixed top-0 right-0 w-full h-full z-10"
        onClick={() => setShowDatePicker(false)}
        aria-label="Close menu overlay"
      ></div>
      )}
      {showDatePicker && (
        <div
          style={{ top: `${top}px`, left: `${left}px` }}
          className="absolute w-full transform z-20 flex justify-center items-center"
        >
          <div className="p-5 bg-white rounded-lg shadow-lg space-x-2">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              disabledDates={disabledDates}
              minDate={new Date()}
              className=""
            />
            <button
              className="mt-3 bg-headlines text-white py-2 px-4 rounded-lg"
              onClick={() => setShowDatePicker(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="date-range" className="text-base font-semibold">
          Pickup & Drop off
        </label>
        <div
          className="border border-gray-400 hover:border-gray-800 rounded-md px-3 py-2 flex gap-2 cursor-pointer"
          onClick={() => setShowDatePicker(true)}
        >
          <img src={CalenderIcon} alt="Calender Icon" />
          {dateRange[0].startDate && dateRange[0].endDate
            ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
            : "Select Date Range"}
        </div>
      </div>
    </>
  );
};

export default DateRangePicker;
