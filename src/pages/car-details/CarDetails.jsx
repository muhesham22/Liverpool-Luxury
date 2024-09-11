import React, { useEffect, useMemo, useState } from "react";

import CarImg1 from "../../assets/images/car-details/car-img (1).png";
import CarImg2 from "../../assets/images/car-details/car-img (2).png";
import CarImg3 from "../../assets/images/car-details/car-img (3).png";
import CarImg4 from "../../assets/images/car-details/car-img (4).png";
import CarImg5 from "../../assets/images/car-details/car-img (5).png";

import DoorsIcon from "../../assets/icons/car-details/doorIcon.svg";
import PetrolIcon from "../../assets/icons/car-details/PetrolIcon";
import SeatIcon from "../../assets/icons/car-details/seat-airline.svg";
import BoltIcon from "../../assets/icons/car-details/bolt.svg";
import GearsIcon from "../../assets/icons/car-details/GearsIcon";

import WhatsApp from "../../assets/icons/social-media/whatsapp.svg";
import Phone from "../../assets/icons/social-media/phone.svg";
import MainBtn from "../../components/Buttons/MainBtn";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalenderIcon from "../../assets/icons/calender.svg";
import RequirementModal from "./RequirementModal";
import FAQmodal from "./FAQmodal";
import ImageSlider from "../../components/slider/ImageSlider";
import ImageSliderModal from "./ImageSliderModal";
import { useNavigate, useParams } from "react-router-dom";
import DateRangePicker from "../../components/date-range-picker/DateRangePicker";
import { deleteCar, getCarById } from "../../services/cars.service";
import { Bolt } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import UpdateCarDetails from "../admin/UpdateCarDetails";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";

const CarDetails = () => {
  const { id } = useParams();

  const [carLoading, setCarLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [carImages, setCarImages] = useState([
    CarImg1,
    CarImg3,
    CarImg2,
    CarImg4,
    CarImg5,
  ]);
  const [carBookings, setCarBookings] = useState([]);
  const [error, setError] = useState(null);

  const fetchCarById = async () => {
    setCarLoading(true);
    try {
      const response = await getCarById(id);
      setCar(response?.car);
      setCarBookings(response?.bookings);
      // setCarImages(response?.car?.images);
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setCarLoading(false);
    }
  };

  useEffect(() => {
    fetchCarById();
  }, [id]);

  const navigate = useNavigate();

  const [requirementModalOpen, setRequirementModalOpen] = useState(false);
  const onCloseRequirementModal = () => setRequirementModalOpen(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const onCloseFaqModal = () => setFaqModalOpen(false);
  const [imagesModal, setImagesModal] = useState(false);
  const onCloseImagesModal = () => {
    setImagesModal(false);
  };

  const [openedImage, setOpenedImage] = useState(0);

  const openImageModal = (index) => {
    setOpenedImage(index);
    setImagesModal(true);
  };

  const gotoCheckOut = () => {
    if (startDate === null || endDate === null) {
      alert("Please select the date range");
      return;
    }
    navigate(`/all-cars/${id}/check-out`, { state: { car, bookings:carBookings } });
  };

  const role = localStorage.getItem("role");

  const [showUpdateCarModal, setShowUpdateCarModal] = useState(false);

  const closeUpdateCarModal = () => {
    setShowUpdateCarModal(false);
    fetchCarById();
  };

  const handleDeleteCar = async () => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        navigate("/all-cars");
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const { startDate, endDate } = useSelector((state) => state.dateRangeData);
  

  return (
    <div className="relative p-5 md:p-14 space-y-8">
      {role === "admin" && (
        <div className="absolute top-0 md:top-5 right-0 md:right-10 space-x-3 ">
          <button
            className=" bg-main hover:bg-main/80 text-white p-3 rounded-lg font-bold text-lg"
            onClick={() => setShowUpdateCarModal(true)}
          >
            Update Car
          </button>
          <button
            className=" hover:bg-main hover:text-white text-main transition-all duration-300 p-3 rounded-lg font-bold text-lg"
            onClick={handleDeleteCar}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      )}
      <UpdateCarDetails
        isOpen={showUpdateCarModal}
        onClose={closeUpdateCarModal}
        car={car}
      />
      {carLoading ? (
        <Skeleton variant="text" width="60%" height="30px" />
      ) : (
        <h1 className="text-3xl xl:text-4xl font-bold">
          {car?.brand.toUpperCase()} {car?.name?.toUpperCase()}{" "}
          {car?.model?.toUpperCase()} {car?.year}
        </h1>
      )}
      <div className="block md:hidden">
        {carLoading ? (
          <Skeleton variant="rounded" width="100%" height="400px" />
        ) : (
          <ImageSlider images={carImages} />
        )}
      </div>
      <ImageSliderModal
        images={carImages}
        openedImage={openedImage}
        isOpen={imagesModal}
        onClose={onCloseImagesModal}
      />
      <div className="md:grid grid-cols-9 gap-3 overflow-hidden hidden">
        <div className="col-span-3 rounded-md max-h-[21rem]">
          {carLoading ? (
            <Skeleton variant="rounded" width="100%" height="210px" />
          ) : (
            <img
              src={carImages[0] || CarImg1}
              className="rounded-md w-full cursor-pointer hover:scale-95 duration-300 h-full object-cover"
              onClick={() => openImageModal(0)}
            />
          )}
        </div>

        <div className="col-span-2 max-h-[21rem]">
          {carLoading ? (
            <Skeleton variant="rounded" width="100%" height="210px" />
          ) : (
            <img
              src={carImages[1] || CarImg2}
              className="min-h-32 rounded-md w-full cursor-pointer hover:scale-95 duration-300 object-cover h-full"
              onClick={() => openImageModal(1)}
            />
          )}
        </div>

        <div className="col-span-2 grid grid-rows-2 grid-cols-1 gap-3 overflow-hidden rounded-md max-h-[21rem]">
          {carLoading ? (
            <Skeleton variant="rounded" width="100%" height="105px" />
          ) : (
            <div className="col-span-full row-span-1">
              <img
                src={carImages[2] || CarImg3}
                className="min-h-32 rounded-md w-full cursor-pointer hover:scale-95 duration-300 max-h-40 object-cover"
                onClick={() => openImageModal(2)}
              />
            </div>
          )}
          {carLoading ? (
            <Skeleton variant="rounded" width="100%" height="105px" />
          ) : (
            <div className="col-span-full row-span-1 overflow-hidden">
              <img
                src={carImages[3] || CarImg4}
                className="min-h-32 rounded-md w-full cursor-pointer hover:scale-95 duration-300 max-h-40 object-cover"
                onClick={() => openImageModal(3)}
              />
            </div>
          )}
        </div>

        <div className="size-full col-span-2 relative cursor-pointer hover:scale-95 transition-all duration-300 max-h-[21rem]">
          {carLoading ? (
            <Skeleton variant="rounded" width="100%" height="210px" />
          ) : (
            <img
              src={carImages[4] || CarImg1}
              className="min-h-32 rounded-md w-full cursor-pointer hover:scale-95 duration-300 col-span-full h-full object-cover"
              onClick={() => openImageModal(4)}
            />
          )}
          {carImages.length - 5 > 0 && (
            <div className="absolute inset-0 rounded bg-black bg-opacity-60 hover:bg-opacity-45 center text-4xl font-bold text-white">
              +{carImages.length - 5}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-full md:col-span-2 bg- w-full space-y-4">
          <h3 className="text-3xl font-bold">Description</h3>
          {carLoading ? (
            <Skeleton variant="text" width="97%" height="40px" />
          ) : (
            <p className="text-subtitles text-base ps-2 w-full md:max-w-[70%]">
              {car?.description}
            </p>
          )}
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full md:w-4/6">
            <li className="col-span-1 center flex-col gap-2 hover:border-gray-400 py-2 transition-all duration-300 rounded border border-background">
              <img src={DoorsIcon} alt="DoorsIcon" />
              <span>{car?.doors} Doors</span>
            </li>
            <li className="col-span-1 center text-center flex-col min-w-20 gap-2 hover:border-gray-400 py-2 transition-all duration-300 rounded border border-background">
              {car?.powerSystem !== "Electric" ? (
                <>
                  <PetrolIcon />
                  <span>Gas</span>
                </>
              ) : (
                <>
                  <img src={Bolt} alt="Door Icon" className="size-5" />
                  <span>Electric</span>
                </>
              )}{" "}
            </li>
            <li className="col-span-1 center flex-col gap-2 hover:border-gray-400 py-2 transition-all duration-300 rounded border border-background">
              <img src={SeatIcon} alt="SeatIcon" />
              <span>{car?.seats} Seats</span>
            </li>
            <li className="col-span-1 center flex-col gap-2 hover:border-gray-400 py-2 transition-all duration-300 rounded border border-background">
              <GearsIcon />
              <span>{car?.transmissionType}</span>
            </li>
            <li className="col-span-1 center flex-col gap-2 hover:border-gray-400 py-2 transition-all duration-300 rounded border border-background">
              <img src={BoltIcon} alt="BoltIcon" />
              <span>{car?.powerSystem}</span>
            </li>
          </ul>
          <div className="pb-8 space-y-4">
            <h3 className="text-3xl font-bold">Highlights</h3>
            <ol className="text-subtitles text-sm ps-1">
              <li>1 Day Rental Available</li>
              <li>Deposit: AED 300</li>
              <li>500 km max</li>
            </ol>
          </div>
        </div>
        <div className="relative col-span-full md:col-span-1 bg-white border rounded-lg space-y-5 p-8 flex flex-col justify-start items-center">
          <h4 className="text-2xl font-bold text-center">
            Book Directly From:
          </h4>
          <div className="center gap-4">
            <img src={WhatsApp} alt="WhatsApp" className="cursor-pointer" />
            <img src={Phone} alt="Phone" className="cursor-pointer" />
          </div>
          <div className="flex justify-around items-center bg-background rounded-md gap-8 py-3 px-5">
            <div className="center flex-col ">
              <p className="text-center text-lg font-semibold">
                AED {car?.rentalPrice} <br />{" "}
                <span className="text-subtitles text-sm">/day</span>
              </p>
            </div>
            {/* <div className="center flex-col ">
              <p className="text-center">
                AED 400 <br />{" "}
                <span className="text-subtitles text-sm">/week</span>
              </p>
            </div> */}
          </div>

          <DateRangePicker left={0} top={0} bookings={carBookings} />
          <MainBtn title="Rent Now" onClick={gotoCheckOut} />
        </div>
      </div>
      <div
        className="between bg-white p-5 cursor-pointer"
        onClick={() => setRequirementModalOpen(true)}
      >
        <h4 className="text-xl font-bold">Requirements</h4>
        <div className="flex gap-3">
          <span className="font-bold">Know more</span>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="translate-y-1"
          >
            <path
              d="M1.418 16L7.756 9.65333C8.19209 9.21519 8.43691 8.62218 8.43691 8.004C8.43691 7.38582 8.19209 6.79281 7.756 6.35467L1.41067 0L0 1.414L6.34533 7.768C6.40782 7.83051 6.44293 7.91528 6.44293 8.00367C6.44293 8.09206 6.40782 8.17682 6.34533 8.23933L0.00666682 14.586L1.418 16Z"
              fill="#1E1E1E"
            />
          </svg>
        </div>
      </div>
      <div
        className="between bg-white p-5 cursor-pointer"
        onClick={() => setFaqModalOpen(true)}
      >
        <h4 className="text-xl font-bold">FAQ</h4>
        <div className="flex gap-3">
          <span className="font-bold">Know more</span>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="translate-y-1"
          >
            <path
              d="M1.418 16L7.756 9.65333C8.19209 9.21519 8.43691 8.62218 8.43691 8.004C8.43691 7.38582 8.19209 6.79281 7.756 6.35467L1.41067 0L0 1.414L6.34533 7.768C6.40782 7.83051 6.44293 7.91528 6.44293 8.00367C6.44293 8.09206 6.40782 8.17682 6.34533 8.23933L0.00666682 14.586L1.418 16Z"
              fill="#1E1E1E"
            />
          </svg>
        </div>
      </div>
      <RequirementModal
        isOpen={requirementModalOpen}
        onClose={onCloseRequirementModal}
      />
      <FAQmodal isOpen={faqModalOpen} onClose={onCloseFaqModal} />
    </div>
  );
};

export default CarDetails;
