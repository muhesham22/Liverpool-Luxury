import React, { useEffect, useState } from "react";
import ConfirmBookingCard from "../../components/Cards/confirm-booking-card/ConfirmBookingCard";
import DateRangePicker from "../../components/date-range-picker/DateRangePicker";
import Switch from "../../components/Switches/Switch";
import LocationIcon from "../../assets/icons/location.svg";
import AddressModal from "./AddressModal";
import ImgIcon from "../../assets/icons/imgIcon.svg";
import {
  RadioButtonCheckedOutlined,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import MainBtn from "../../components/Buttons/MainBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addNewBooking } from "../../services/bookings.service";
import SuccessModal from "./SuccessModal";
import { getUserInfo } from "../../services/auth.service";
import { Skeleton } from "@mui/material";

const CheckOutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChauffeur, setIsChauffeur] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [fetchingUser, setFetchingUser] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchUserDetails = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    setFetchingUser(true);
    try {
      const response = await getUserInfo();
      setUserDetails(response.user);
    } catch (error) {
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 403
      ) {
        console.log("User is unauthorized. Logging out...");
        const itemsToRemove = ["token", "userId", "role", "name"];
        itemsToRemove.forEach((item) => localStorage.removeItem(item));
        localStorage.setItem("isLoggedIn", false);
        window.location.href = "/";
      }
    } finally {
      setFetchingUser(false);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const navigate = useNavigate();

  const { state } = useLocation();
  const { car, bookings } = state;
  const { startDate, endDate } = useSelector((state) => state.dateRangeData);

  if (startDate === null || endDate === null) {
    window.location.href = "/all-cars";
  }

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (date) => {
    // Format date to yyyy-mm-dd
    const d = new Date(date);
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let day = String(d.getDate()).padStart(2, '0');
    let year = d.getFullYear();
    
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  
  
  console.log(formatDate(startDate)); // Output: 2024-08-26
  
  

  const closeAddressModal = () => setAddressModal(false);
  const toggleChauffeur = () => setIsChauffeur(!isChauffeur);
  const toggleDelivery = () => setIsDelivery(!isDelivery);

  const handleBooking = async () => {
    setLoading(true);
    setSuccess(false);
    setError("");

    const bookingDetails = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      delivery: isDelivery,
      chauffeur: isChauffeur,
      paymentMethod,
    };
    console.log(bookingDetails);
    if (isDelivery) {
      bookingDetails.street = userAddress.street;
      bookingDetails.district = userAddress.district;
      bookingDetails.building = userAddress.building;
      bookingDetails.floor = userAddress.floor;
    }

    if (!localStorage.getItem("token")) {
      bookingDetails.guestName = userDetails.name || "";
      bookingDetails.guestPhone = userDetails.phone || "";
      bookingDetails.guestEmail = userDetails.email || "";
    }
    console.log(bookingDetails);
    try {
      await addNewBooking(car._id, bookingDetails);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        if (!localStorage.getItem("token")) {
          navigate("/all-cars");
        } else {
          navigate("/profile");
        }
      }, 3000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while processing your booking."
      );
    } finally {
      setLoading(false);
    }
  };
  console.log(currentStep);
  const handleNext = () => {
    setError("");
    if (currentStep === 1 && isDelivery && !userAddress) {
      setError("Please Enter Your Address");
      return;
    }
    if (currentStep === 2) {
      if (
        userDetails.name === "" ||
        userDetails.email === "" ||
        userDetails.phone === ""
      ) {
        console.log("userDetails", userDetails);
        setError("Please Enter Your Contact Information");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setError("");
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="py-10 md:px-8 lg:px-10 px-3 space-y-5">
      <h1 className="text-3xl font-bold">Confirm Booking</h1>
      <ConfirmBookingCard
        status={"checkout"}
        car={car}
        booking={{
          startDate,
          endDate,
          total: car?.rentalPrice * calculateDays(),
          status: "pending",
        }}
      />
      {error && (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-red-500 text-center text-red-600">
          <p>{error}</p>
        </div>
      )}
      {currentStep === 1 && (
        <div className="p-5 relative space-y-5 gap-5 border border-gray-300 transition-colors duration-300 rounded-xl bg-white">
          <h3 className="text-xl font-bold">Confirm your Booking</h3>
          <div className="md:w-1/3 relative">
            <DateRangePicker left={0} top={0} bookings={bookings} />
          </div>
          <div className="flex gap-3">
            <Switch isOn={isChauffeur} toggle={toggleChauffeur} />
            <span>Get chauffeur with your car </span>
          </div>
          <div className="flex gap-3">
            <Switch isOn={isDelivery} toggle={toggleDelivery} />
            <span>Get your Car Delivery Now!</span>
          </div>
          {isDelivery && (
            <div
              className="border border-gray-400 hover:border-gray-800 rounded-md w-full md:w-1/3 px-3 py-2 flex gap-2 cursor-pointer"
              onClick={() => setAddressModal(true)}
            >
              <img src={LocationIcon} alt="LocationIcon" />
              <p>
                {userAddress && Object.values(userAddress).some((val) => val)
                  ? `${userAddress.street || ""}, ${
                      userAddress.district || ""
                    }, 
         Building: ${userAddress.building || ""}, Floor: ${
                      userAddress.floor || ""
                    }`
                  : "Enter Your Address"}
              </p>
            </div>
          )}
          <AddressModal
            isOpen={addressModal}
            onClose={closeAddressModal}
            setUserAddress={setUserAddress}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="p-5 relative space-y-5 gap-5 border border-gray-300 transition-colors duration-300 rounded-xl bg-white w-full">
          <h3 className="text-xl font-bold">
            Confirm your Contact Information
          </h3>
          {fetchingUser ? (
            <>
              <Skeleton variant="rectangular" height={50} />
              <Skeleton variant="rectangular" height={50} />
              <Skeleton variant="rectangular" height={50} />
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3 md:w-1/3">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  placeholder="Enter your Name"
                  className="border border-gray-300 rounded-md p-2"
                  value={userDetails?.name}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, name: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 md:w-1/3">
                <label htmlFor="Phone">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  className="border border-gray-300 rounded-md p-2"
                  value={userDetails?.email}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, email: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 md:w-1/3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your Phone"
                  className="border border-gray-300 rounded-md p-2"
                  value={userDetails?.phone}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, phone: e.target.value });
                  }}
                />
              </div>
              <div className="flex gap-5">
                <div className="space-y-3">
                  <h4>License Photo</h4>
                  <label
                    htmlFor="License-Photo"
                    className="border-dashed border-2 border-gray-200 hover:border-gray-300 cursor-pointer rounded-md p-5 center gap-5"
                  >
                    <input
                      type="file"
                      name="licensePhoto"
                      id="License-Photo"
                      className="hidden"
                    />
                    <img src={ImgIcon} alt="ImgIcon" />
                    <p>Upload License Photo</p>
                  </label>
                </div>
                <div className="space-y-3">
                  <h4>Passport Photo</h4>
                  <label
                    htmlFor="Passport-Photo"
                    className="border-dashed border-2 border-gray-200 hover:border-gray-300 cursor-pointer rounded-md p-5 center gap-5"
                  >
                    <input
                      type="file"
                      name="PassportPhoto"
                      id="Passport-Photo"
                      className="hidden"
                    />
                    <img src={ImgIcon} alt="ImgIcon" />
                    <p>Upload Passport Photo</p>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="p-5 relative space-y-5 gap-5 border border-gray-300 transition-colors duration-300 rounded-xl bg-white w-full">
          <h3 className="text-xl font-bold">Confirm your Payment Method</h3>
          <div className="flex gap-5">
            <div
              className="border border-gray-200 rounded-lg p-3 flex gap-3"
              onClick={() => setPaymentMethod("cash")}
            >
              {paymentMethod === "cash" ? (
                <RadioButtonCheckedOutlined
                  color="error"
                  className="hover:bg-red-100 hover:scale-105 hover:rounded-full transition-all duration-300"
                />
              ) : (
                <RadioButtonUnchecked
                  color="action"
                  className="hover:bg-gray-200 rounded-full font-extralight transition-all duration-300"
                />
              )}
              <p>Pay On Delivery</p>
            </div>
          </div>
          {/* <div
            className="border border-gray-200 rounded-lg p-3 flex gap-3"
            onClick={() => setPaymentMethod("creditCard")}
          >
            {paymentMethod === "creditCard" ? (
              <RadioButtonCheckedOutlined
                color="error"
                className="hover:bg-red-100 hover:scale-105 hover:rounded-full transition-all duration-300"
              />
            ) : (
              <RadioButtonUnchecked
                color="action"
                className="hover:bg-gray-200 rounded-full font-extralight transition-all duration-300"
              />
            )}
            <p>Pay with Credit Card</p>
          </div> */}
        </div>
      )}

      {currentStep === 4 && (
        <div className="p-5 relative space-y-3 gap-5 border border-gray-300 transition-colors duration-300 rounded-xl bg-white w-full">
          <h3 className="text-xl font-bold">Checkup Summary</h3>
          <div className="flex gap-5">
            <div className="space-y-1">
              <h5 className="text-sm font-light text-subtitles">Pick Up</h5>
              <p>
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : "Select Date"}
              </p>
            </div>
            <div className="space-y-1">
              <h5 className="text-sm font-light text-subtitles">Drop off</h5>
              <p>
                {endDate
                  ? new Date(endDate).toLocaleDateString()
                  : "Select Date"}
              </p>
            </div>
          </div>
          {isDelivery && (
            <div className="space-y-1">
              <h5 className="text-sm font-light text-subtitles">
                Delivery Address
              </h5>
              <p>
                {userAddress && Object.values(userAddress).some((val) => val)
                  ? `${userAddress.street || ""}, ${
                      userAddress.district || ""
                    }, 
         Building: ${userAddress.building || ""}, Floor: ${
                      userAddress.floor || ""
                    }`
                  : "Enter Your Address"}
              </p>
            </div>
          )}
          <p className="text-sm font-light text-subtitles">
            {car?.rentalPrice} AED/per day <br />
            {car?.rentalPrice} x {calculateDays()} days
          </p>
          <p className="text-green-600 font-semibold">
            Total: {car?.rentalPrice * calculateDays()} AED
          </p>
          <p className="line-through text-xs text-main font-semibold">
            {car?.rentalPrice * calculateDays() * 1.25} AED
          </p>
          {/* <MainBtn
         title={loading ? "Submitting..." : "Submit"}
         onClick={handleBooking}
         disabled={loading}
       /> */}
          {/* {error && <p className="text-red-600">{error}</p>} */}
        </div>
      )}

      <div className="flex justify-between mt-5">
        {currentStep > 1 && (
          <MainBtn
            onClick={handlePrev}
            className="px-6 py-3 text-white bg-gray-500 rounded-lg"
          >
            Previous
          </MainBtn>
        )}
        {currentStep < 4 ? (
          <MainBtn
            onClick={handleNext}
            className="px-6 py-3 text-white bg-red-500 rounded-lg"
          >
            Next
          </MainBtn>
        ) : (
          <MainBtn
            onClick={handleBooking}
            className="px-6 py-3 text-white bg-green-500 rounded-lg"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </MainBtn>
        )}
      </div>

      {success && (
        <SuccessModal isOpen={success} onClose={() => setSuccess(false)} />
      )}
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
    </div>
  );
};

export default CheckOutPage;
