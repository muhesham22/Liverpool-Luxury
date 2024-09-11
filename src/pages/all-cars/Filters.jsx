import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateRangePicker from "../../components/date-range-picker/DateRangePicker";
import {
  carBrands,
  powerSystemOptions,
  seatsOptions,
  transmissionOptions,
  vehicleTypes,
} from "../../Data/carsData";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  clearFilters,
  setShowFilteredCars,
  fetchAvailableCars,
} from "../../store/slices/carsSlice";
import { LinearScaleOutlined } from "@mui/icons-material";
import {
  clearDateRange,
} from "../../store/slices/dateRangeSlice";

const FilterSection = ({ title, options, selectedOptions, onChange }) => (
  <Accordion defaultExpanded className="shadow-none border-none">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${title}-content`}
      id={`${title}-header`}
    >
      <h4 className="font-medium text-base">{title}</h4>
    </AccordionSummary>
    <AccordionDetails className="p-0">
      <div className="flex flex-col gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option.toString())}
              onChange={onChange}
              className={`mr-2 ${
                selectedOptions.includes(option.toString())
                  ? "accent-red-500"
                  : "accent-current"
              }`}
            />
            {option}
          </label>
        ))}
      </div>
    </AccordionDetails>
  </Accordion>
);

const Filters = ({ isOpen, setIsOpen }) => {
  const { filters } = useSelector((state) => state.carsData);
  const { startDate, endDate } = useSelector((state) => state.dateRangeData);
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [modelYear, setModelYear] = useState(filters.yearRange);
  const [selectedBrand, setSelectedBrand] = useState(filters.brand);
  const [selectedSeats, setSelectedSeats] = useState(filters.seats);
  const [selectedTypes, setSelectedTypes] = useState(filters.vehicleTypes);
  const [selectedPowerSystem, setSelectedPowerSystem] = useState(
    filters.powerSystem
  );
  const [selectedTransmissionOptions, setSelectedTransmissionOptions] =
    useState(filters.transmissionType);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const fetchAvailableCarsEnabled = useSelector(
    (state) => state.carsData.fetchAvailableCarsEnabled
  );

  const dispatch = useDispatch();

  const handleBrandChange = (event) => setSelectedBrand(event.target.value);

  const handlePriceRangeChange = (event, newValue) => setPriceRange(newValue);

  const handleModelYearChange = (event, newValue) => setModelYear(newValue);

  const handleCheckboxChange = (setter, selected) => (e) => {
    const value = e.target.value;
    const newSelection = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setter(newSelection);
  };

  useEffect(() => {
    setPriceRange(filters.priceRange);
    setModelYear(filters.yearRange);
    setSelectedBrand(filters.brand);
    setSelectedSeats(filters.seats);
    setSelectedTypes(filters.vehicleTypes);
    setSelectedPowerSystem(filters.powerSystem);
    setSelectedTransmissionOptions(filters.transmissionType);
  }, [filters]);

  const reset = () => {
    dispatch(clearFilters());
    dispatch(clearDateRange());
    dispatch(setShowFilteredCars(false));
  };

  const applyFilters = async () => {
    setFiltersLoading(true);
    dispatch(setFilter({ filter: "yearRange", value: modelYear }));
    dispatch(
      setFilter({
        filter: "transmissionType",
        value: selectedTransmissionOptions,
      })
    );
    dispatch(setFilter({ filter: "powerSystem", value: selectedPowerSystem }));
    dispatch(setFilter({ filter: "vehicleTypes", value: selectedTypes }));
    dispatch(setFilter({ filter: "seats", value: selectedSeats }));
    dispatch(setFilter({ filter: "priceRange", value: priceRange }));
    dispatch(setFilter({ filter: "brand", value: selectedBrand }));

    // Fetch available cars based on selected date range
    if (fetchAvailableCarsEnabled) {
      dispatch(fetchAvailableCars());
    }
    dispatch(setShowFilteredCars(true));
    setTimeout(() => setFiltersLoading(false), 300);
    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="bg-white w-full shadow-md px-4 py-6 rounded-xl space-y-5 relative">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">Filters</h3>
        <h5
          onClick={reset}
          className="text font-semibold text-green-500 cursor-pointer"
        >
          Reset all
        </h5>
      </div>
      <button
        className="bg-main hover:bg-mainHover transition-all duration-300 text-white py-2 px-4 rounded-lg w-full"
        onClick={applyFilters}
      >
        {filtersLoading ? <LinearScaleOutlined /> : "Apply Filters"}
      </button>
      <div className="relative w-full">
        <DateRangePicker top={-10} left={0} />
      </div>
      <div className="space-y-2">
        <label htmlFor="price-range" className="font-medium">
          Price <span className="text-main text-xs ps-1">{"(Per Day)"}</span>
        </label>
        <div className="flex justify-between">
          <input
            type="number"
            className="border border-gray-400 hover:border-gray-800 cursor-pointer rounded-md p-2 w-2/5 text-center"
            value={priceRange[0]}
            onChange={(e) =>
              handlePriceRangeChange(e, [Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="number"
            className="border border-gray-400 hover:border-gray-800 cursor-pointer rounded-md p-2 w-2/5 text-center"
            value={priceRange[1]}
            onChange={(e) =>
              handlePriceRangeChange(e, [priceRange[0], Number(e.target.value)])
            }
          />
        </div>
        <Slider
          id="price-range"
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={50}
          max={50000}
          color="error"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label className="text-headlines" htmlFor="brand">
          Car Brand
        </label>
        <input
          type="text"
          list="carBrandsList"
          id="brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="w-full p-3 border rounded-lg"
        />
        <datalist id="carBrandsList">
          {carBrands.map((brand, index) => (
            <option key={index} value={brand.value} />
          ))}
        </datalist>
      </div>
      <div className="space-y-2">
        <label htmlFor="model-year" className="font-medium">
          Model Year
        </label>
        <div className="flex justify-between">
          <input
            type="number"
            className="border border-gray-400 hover:border-gray-800 cursor-pointer rounded-md p-2 w-2/5 text-center"
            value={modelYear[0]}
            onChange={(e) =>
              handleModelYearChange(e, [Number(e.target.value), modelYear[1]])
            }
          />
          <input
            type="number"
            className="border border-gray-400 hover:border-gray-800 cursor-pointer rounded-md p-2 w-2/5 text-center"
            value={modelYear[1]}
            onChange={(e) =>
              handleModelYearChange(e, [modelYear[0], Number(e.target.value)])
            }
          />
        </div>
        <Slider
          id="model-year"
          value={modelYear}
          onChange={handleModelYearChange}
          valueLabelDisplay="auto"
          min={1980}
          max={2024}
          color="error"
        />
      </div>
      <FilterSection
        title="Number of Seats"
        options={seatsOptions}
        selectedOptions={selectedSeats}
        onChange={handleCheckboxChange(setSelectedSeats, selectedSeats)}
      />
      <FilterSection
        title="Vehicle Type"
        options={vehicleTypes}
        selectedOptions={selectedTypes}
        onChange={handleCheckboxChange(setSelectedTypes, selectedTypes)}
      />
      <FilterSection
        title="Power System"
        options={powerSystemOptions}
        selectedOptions={selectedPowerSystem}
        onChange={handleCheckboxChange(
          setSelectedPowerSystem,
          selectedPowerSystem
        )}
      />
      <FilterSection
        title="Transmission Type"
        options={transmissionOptions}
        selectedOptions={selectedTransmissionOptions}
        onChange={handleCheckboxChange(
          setSelectedTransmissionOptions,
          selectedTransmissionOptions
        )}
      />
    </div>
  );
};

export default Filters;
