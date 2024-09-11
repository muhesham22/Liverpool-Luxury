import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  confirmBooking,
  deleteBooking,
  getBookingById,
  updateBookingStatus,
} from "../../services/bookings.service";
import Skeleton from "@mui/material/Skeleton";
import PersonIcon from "@mui/icons-material/Person";
import CarImg1 from "../../assets/images/car-details/car-img (1).png";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isCancellationLoading, setIsCancellationLoading] = useState(false);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const response = await getBookingById(id);
      setBooking(response.booking);
    } catch (error) {
      setError("Error fetching booking details.");
      setTimeout(() => {
        setError("");
        navigate("/profile");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setStatusUpdating(true);
      await updateBookingStatus(id, { status: newStatus });
      fetchBooking();
    } catch (error) {
      setError(error.response.data.message || "Failed to update status.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleConfirmation = async () => {
    try {
      setIsConfirmLoading(true);
      await confirmBooking(id, { response: "confirmed" });
      fetchBooking();
    } catch (error) {
      setError(error.response.data.message || "Failed to confirm booking.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsConfirmLoading(false);
    }
  };

  const handleCancelation = async () => {
    try {
      setIsCancellationLoading(true);
      await deleteBooking(id);
      fetchBooking();
    } catch (error) {
      setError(error.response.data.message || "Failed to cancel booking.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsCancellationLoading(false);
    }
  };
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Booking Details</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            className="mt-6"
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            className="mt-6"
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            className="mt-6"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Booking Details</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-red-500 text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Booking Details</h1>
      {booking && (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          {/* User and Booking Information */}
          <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
            <img
              src={CarImg1}
              alt="Car"
              className="rounded-md aspect-[1.25] object-cover w-72 md:h-64 cursor-pointer"
              onClick={() => navigate(`/all-cars/${booking.car._id}`)}
            />
            <div className="ml-4">
              <div className="text-xl font-semibold">
                Booking ID: <span className="font-normal">{booking._id}</span>
              </div>
              <div className="text-xl font-semibold">
                Status:{" "}
                <span
                  className={`font-semibold text-lg  ${getStatusClass(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Car Information */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Car Information</h2>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div>
                <strong>Brand:</strong> {booking.car.brand}
              </div>
              <div>
                <strong>Model:</strong> {booking.car.name}
              </div>
              <div>
                <strong>Year:</strong> {booking.car.year}
              </div>
              <div>
                <strong>Type:</strong> {booking.car.type}
              </div>
              <div>
                <strong>Transmission:</strong> {booking.car.transmissionType}
              </div>
              <div>
                <strong>Seats:</strong> {booking.car.seats}
              </div>
              <div>
                <strong>Doors:</strong> {booking.car.doors}
              </div>
              <div>
                <strong>Power System:</strong> {booking.car.powerSystem}
              </div>
              <div>
                <strong>Description:</strong> {booking.car.description}
              </div>
              <div>
                <strong>Rental Price:</strong> {booking.car.rentalPrice} AE
              </div>
            </div>
          </div>

          {/* Rental Period */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Rental Period</h2>
            <div className="text-lg">
              <div>
                <strong>Start Date:</strong>{" "}
                {new Date(booking?.startDate).toLocaleDateString()}
              </div>
              <div>
                <strong>End Date:</strong>{" "}
                {new Date(booking?.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Additional Information
            </h2>
            <div className="text-lg">
              <div>
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Rental Days:</strong>{" "}
                {calculateDays(booking.startDate, booking.endDate)}
              </div>
              <div>
                <strong>Total Price:</strong> {booking.total} AE
              </div>
              <div>
                <strong>Chauffeur Included:</strong>{" "}
                {booking.chauffeur ? "Yes" : "No"}
              </div>
              <div>
                <strong>Delivery Included:</strong>{" "}
                {booking.delivery ? "Yes" : "No"}
              </div>

              <div>
                <strong>Confirmation:</strong>{" "}
                <span
                  className={`font-semibold ${getConfirmationClass(
                    booking.confirmation
                  )}`}
                >
                  {booking.confirmation}
                </span>
              </div>
              <div>
                <strong>Documents:</strong>{" "}
                {booking.documents.length > 0 ? "Available" : "Not provided"}
              </div>
              {booking.documents.length > 0 && (
                <div className="flex items-center gap-2">
                  <PersonIcon />
                  <span>{booking.documents.length} Documents</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {booking.status !== "Cancelled" &&
            localStorage.getItem("role") === "admin" && (
              <div className="flex gap-4 justify-around">
                <>
                  {" "}
                  {booking.confirmation !== "confirmed" && (
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700  "
                      onClick={handleConfirmation}
                      disabled={isConfirmLoading}
                    >
                      {isConfirmLoading ? "Confirming..." : "Confirm Booking"}
                    </button>
                  )}
                  {booking.status === "Upcoming" && (
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700  "
                      onClick={handleCancelation}
                      disabled={isCancellationLoading}
                    >
                      {isCancellationLoading
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </button>
                  )}
                </>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "Upcoming":
      return "text-blue-600";
    case "Ongoing":
      return "text-orange-600";
    case "Cancelled":
      return "text-red-600";
    case "Completed":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getConfirmationClass = (confirmation) => {
  switch (confirmation) {
    case "pending":
      return "text-yellow-600";
    case "confirmed":
      return "text-green-600";
    case "canceled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default BookingDetails;
