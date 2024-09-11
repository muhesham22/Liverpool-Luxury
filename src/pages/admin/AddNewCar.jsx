import React, { useState, useCallback, useEffect } from "react";
import InputComp from "../../components/Inputs/InputComp";
import CustomSelect from "../../components/selects/CustomSelect";
import { CloseRounded } from "@mui/icons-material";
import FileInput from "../../components/FilesInp/FileInput";
import { addNewCar } from "../../services/cars.service";
import {
  carBrands,
  vehicleTypes,
  powerSystemOptions,
  transmissionOptions,
  doorsOptions,
  seatsOptions,
  yearsOptions,
} from "../../Data/carsData";

const AddNewCar = ({ isOpen, onClose }) => {
  const [carDetails, setCarDetails] = useState({
    name: "",
    brand: "",
    model: "",
    type: "",
    year: "",
    images: [],
    description: "",
    transmissionType: "",
    doors: "",
    seats: "",
    powerSystem: "",
    rentalPrice: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { id, value, files } = e.target;
    if (files) {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        images: [...prevDetails.images, ...Array.from(files)],
      }));
    } else {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [id]: value,
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!carDetails.name) newErrors.name = "Car name is required.";
    if (!carDetails.brand) newErrors.brand = "Car brand is required.";
    if (!carDetails.model) newErrors.model = "Car model is required.";
    if (!carDetails.type) newErrors.type = "Car type is required.";
    if (!carDetails.year) newErrors.year = "Car year is required.";
    if (carDetails.images.length === 0)
      newErrors.images = "At least one image is required.";
    if (!carDetails.description)
      newErrors.description = "Car description is required.";
    if (!carDetails.transmissionType)
      newErrors.transmissionType = "Transmission type is required.";
    if (!carDetails.doors) newErrors.doors = "Number of doors is required.";
    if (!carDetails.seats) newErrors.seats = "Number of seats is required.";
    if (!carDetails.powerSystem)
      newErrors.powerSystem = "Power system is required.";
    if (!carDetails.rentalPrice)
      newErrors.rentalPrice = "Rental price is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    setLoading(true);

    try {
      await addNewCar(carDetails);
      setCarDetails({
        name: "",
        brand: "",
        model: "",
        type: "",
        year: "",
        images: [],
        description: "",
        transmissionType: "",
        doors: "",
        seats: "",
        powerSystem: "",
        rentalPrice: "",
      });
      onClose();
    } catch (error) {
      console.error("Error adding new car:", error);
      setErrors({
        general:
          error.response.data.error ||
          "Failed to add new car. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      images: prevDetails.images.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    return () => {
      carDetails.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [carDetails.images]);

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="bg-black bg-opacity-55 fixed top-0 left-0 w-full h-full z-40"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 md:top-4 bg-white right-0 md:right-[16%] z-50 shadow-lg w-full md:w-2/3 space-y-7 md:max-h-[95vh] max-h-screen rounded-xl overflow-auto hide-scrollbar">
        <div className="p-8 fixed bg-white border-b-2 w-full md:w-4/6 rounded-xl">
          <h2 className="text-center text-headlines text-3xl font-bold">
            Add New Car
          </h2>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-headlines text-2xl"
          >
            <CloseRounded className="hover:text-main" />
          </button>
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5 p-8 pt-24"
          onSubmit={handleSubmit}
        >
          {errors.general && (
            <div className="col-span-full text-red-500 text-center">
              {errors.general}
            </div>
          )}
          <div className="w-full flex flex-col gap-1">
            <label className="text-subtitles" htmlFor="brand">
              Car Brand
            </label>
            <input
              type="text"
              list="carBrandsList"
              id="brand"
              value={carDetails.brand}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.brand ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand}</p>
            )}
            <datalist id="carBrandsList">
              {carBrands.map((brand, index) => (
                <option key={index} value={brand.value} />
              ))}
            </datalist>
          </div>
          <InputComp
            label="Car Name"
            id="name"
            type="text"
            value={carDetails.name}
            handleChange={handleChange}
            isRequired
            error={errors.name}
          />

          <CustomSelect
            label="Car Year"
            id="year"
            value={carDetails.year}
            options={yearsOptions}
            handleChange={handleChange}
            isRequired
            error={errors.year}
          />

          <CustomSelect
            label="Car Type"
            id="type"
            type="text"
            value={carDetails.type}
            options={vehicleTypes}
            handleChange={handleChange}
            isRequired
            error={errors.type}
          />

          <CustomSelect
            label="Doors"
            id="doors"
            value={carDetails.doors}
            options={doorsOptions}
            handleChange={handleChange}
            isRequired
            error={errors.doors}
          />

          <CustomSelect
            label="Seats"
            id="seats"
            value={carDetails.seats}
            options={seatsOptions}
            handleChange={handleChange}
            isRequired
            error={errors.seats}
          />

          <CustomSelect
            label="Power Type"
            id="powerSystem"
            value={carDetails.powerSystem}
            options={powerSystemOptions}
            handleChange={handleChange}
            isRequired
            error={errors.powerSystem}
          />

          <CustomSelect
            label="Transmission Type"
            id="transmissionType"
            value={carDetails.transmissionType}
            options={transmissionOptions}
            handleChange={handleChange}
            isRequired
            error={errors.transmissionType}
          />

          <InputComp
            label="Price Per Day"
            id="rentalPrice"
            type="number"
            value={carDetails.rentalPrice}
            handleChange={handleChange}
            isRequired
            error={errors.rentalPrice}
          />
          <div>
            <label htmlFor="description" className="text-subtitles text-lg">
              Car Description
            </label>
            <textarea
              id="description"
              value={carDetails.description}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg h-14`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <FileInput
            title={"Car Images"}
            label={"Upload Car Images"}
            id={"images"}
            handleChange={handleChange}
            isRequired
            isMultiple
            error={errors.images}
          />
          <div className="col-span-full">
            <div className="flex flex-wrap gap-2">
              {carDetails.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Car"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-0 right-0 text-red-500 bg-white hover:bg-main hover:text-white transition-all duration-300 rounded-full p-1"
                  >
                    <CloseRounded />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-main text-white p-3 rounded-lg font-bold text-lg w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCar;
