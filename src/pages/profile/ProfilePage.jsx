import React, { useEffect, useState } from "react";
import ConfirmBookingCard from "../../components/Cards/confirm-booking-card/ConfirmBookingCard";
import { getUserInfo, updateUserInfo } from "../../services/auth.service";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { getBookings } from "../../services/bookings.service";
import Skeleton from "@mui/material/Skeleton";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [ongoingRentals, setOngoingRentals] = useState([]);
  const [upcomingRentals, setUpcomingRentals] = useState([]);
  const [completedRentals, setCompletedRentals] = useState([]);
  const [pendingRentals, setPendingRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [editMode, setEditMode] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserInfo();
        const { name, phone, email } = userResponse.user;
        setUserInfo(userResponse.user);
        setEditedUserInfo({ name, phone, email });

        const bookingsResponse = await getBookings();
        const bookings = bookingsResponse.bookings.reverse();

        setOngoingRentals(
          bookings.filter(
            (booking) => booking.car?._id && booking.status === "Ongoing"
          )
        );
        setUpcomingRentals(
          bookings.filter(
            (booking) =>
              booking.car?._id &&
              booking.status === "Upcoming" &&
              booking.confirmation === "confirmed"
          )
        );
        setCompletedRentals(
          bookings.filter(
            (booking) => booking.car?._id && booking.status === "Completed"
          )
        );
        setPendingRentals(
          bookings.filter(
            (booking) => booking.car?._id && booking.confirmation === "pending"
          )
        );
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Error fetching data.");

        if (error.response && [401, 403].includes(error.response.status)) {
          console.log("Unauthorized access. Logging out...");
          localStorage.clear();
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    //add validation
    if (!editedUserInfo.name || !editedUserInfo.phone) {
      setError("Name and phone number are required.");
      return;
    }else if(editedUserInfo.phone.length < 10){
      setError("Phone number must be at least 10 characters.");
      return;
    }else if(editedUserInfo.name.length < 3){
      setError("Name number must be at least 3 characters.");
      return;
    }else if(!editedUserInfo.name.match(/^[a-zA-Z ]+$/)){
      setError("Name must contain only alphabets.");
      return;
    } else if(!editedUserInfo.phone.match(/^[0-9]+$/)){
      setError("Phone number must contain only numbers.");
      return;
    }
    try {
      setLoading(true);
      await updateUserInfo(editedUserInfo);
      setUserInfo(editedUserInfo);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user info", error);
      setError("Error updating user info.");
    } finally {
      setLoading(false);
    }
  };

  const renderBookingCards = (bookings, status) => {
    if (loading) {
      return (
        <div className="space-y-5">
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>
      );
    }

    return (
      <div className="space-y-5">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <ConfirmBookingCard
              key={booking._id}
              status={status.toLowerCase()}
              car={booking.car}
              booking={booking}
            />
          ))
        ) : (
          <div className="text-center text-2xl font-semibold">
            No {status} rentals
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-3 md:p-10 lg:px-20 space-y-5">
      <h1 className="text-4xl font-bold">My Account</h1>
      <div className="relative center md:justify-start flex-col md:flex-row gap-10 bg-white rounded-lg p-5 border">
        <div className="relative center ">
          <PersonIcon
            className="text-9xl text-subtitles font-bold"
            style={{ fontSize: 220 }}
          />

          <input
            accept="image/*"
            className="hidden"
            id="profile-pic-input"
            type="file"
            // onChange={handleProfilePicChange}
          />
          <label
            htmlFor="profile-pic-input"
            className="absolute inset-0 bg-black bg-opacity-20 rounded-full flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <div className="w-10 h-10 bg-white hover:bg-gray-200 rounded-full flex justify-center items-center">
              <EditIcon style={{ color: "black" }} />
            </div>
          </label>
        </div>
        <div className="space-y-4">
          {loading ? (
            <>
              <Skeleton variant="text" width={150} height={30} />
              <Skeleton variant="text" width={250} height={30} />
              <Skeleton variant="text" width={300} height={30} />
              <Skeleton variant="rectangular" width={100} height={30} />
              <Skeleton variant="rectangular" width={100} height={30} />
            </>
          ) : editMode ? (
            <>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">Name:</h3>
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  name="name"
                  value={editedUserInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">Phone:</h3>
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  name="phone"
                  value={editedUserInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">Email:</h3>
                <input
                  className="border p-2 rounded-md"
                  type="email"
                  name="email"
                  value={editedUserInfo.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white p-2 w-20 text-lg font-bold hover:bg-blue-700 transition-all duration-300 rounded-md"
              >
                Save
              </button>
              {error && <p className="text-red-500">{error}</p>} 
            </>
          ) : (
            <>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">Name:</h3>
                <p className="font-semibold pt-1">
                  {userInfo.name?.toUpperCase()}
                </p>
              </div>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">Phone:</h3>
                <p className="font-semibold pt-1">{userInfo.phone}</p>
              </div>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">Email:</h3>
                <p className="font-semibold pt-1">{userInfo.email}</p>
              </div>
              <button
                onClick={handleEditToggle}
                className="absolute bottom-5 right-5 bg-green-600 text-white p-2 w-20 text-lg font-bold hover:bg-green-700 transition-all duration-300 rounded-md"
              >
                Edit
              </button>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">Passport Photo:</h3>
                <p className="font-semibold pt-1 text-blue-700 hover:underline cursor-pointer">
                  Photo format
                </p>
              </div>
              <div className="flex gap-3">
                <h3 className="text-xl font-bold">License Photo:</h3>
                <p className="font-semibold pt-1 text-blue-700 hover:underline cursor-pointer">
                  Photo format
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "Pending" ? "bg-main text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("Pending")}
        >
          Pending Confirmations
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "Upcoming" ? "bg-main text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("Upcoming")}
        >
          Upcoming Rentals
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "Ongoing" ? "bg-main text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("Ongoing")}
        >
          Ongoing Rentals
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeTab === "Completed" ? "bg-main text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed Rentals
        </button>
      </div>

      <div>
        {activeTab === "Pending" && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Pending Confirmations</h2>
            {renderBookingCards(pendingRentals, "Pending")}
          </div>
        )}
        {activeTab === "Upcoming" && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Upcoming Rentals</h2>
            {renderBookingCards(upcomingRentals, "Upcoming")}
          </div>
        )}
        {activeTab === "Ongoing" && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ongoing Rentals</h2>
            {renderBookingCards(ongoingRentals, "Ongoing")}
          </div>
        )}
        {activeTab === "Completed" && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Completed Rentals</h2>
            {renderBookingCards(completedRentals, "Completed")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
