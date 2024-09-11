import React from "react";
import MainBtn from "../../components/Buttons/MainBtn";
import MapArrow from "../../assets/icons/map-arrow.svg";

const AddressModal = ({ isOpen, onClose, setUserAddress }) => {
  const [address, setAddress] = React.useState({
    street: "",
    district: "",
    building: "",
    floor: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserAddress(address);
    onClose();
  };

  return (
    isOpen && (
      <div className="m-0">
        <div
          className="bg-black bg-opacity-55 fixed top-0 left-0 w-full h-full z-40"
          onClick={onClose}
        ></div>
        <div className="fixed top-5 left-0 md:left-1/4 w-full md:w-1/2 z-50 overflow-auto">
          <div className="bg-white shadow-lg rounded-xl overflow-auto hide-scrollbar p-5 py-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-center flex-grow">
                Choose your Location Address
              </h3>
              <button onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Enter your Street"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  value={address.street}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  name="district"
                  id="district"
                  placeholder="Enter your District"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  value={address.district}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="building">Building</label>
                <input
                  type="text"
                  name="building"
                  id="building"
                  placeholder="Enter your Building"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  value={address.building}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="floor">Floor</label>
                <input
                  type="text"
                  name="floor"
                  id="floor"
                  placeholder="Enter your Floor"
                  className="border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  value={address.floor}
                />
              </div>
              <button
                type="submit"
                className="bg-main hover:bg-mainHover transition-all duration-500 text-white rounded py-3 w-full font-medium text-base"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddressModal;
