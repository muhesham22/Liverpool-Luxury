import React, { useState } from "react";
import Logo from "../../assets/images/logo-svg.svg";
import { Close } from "@mui/icons-material";
import FileInput from "../FilesInp/FileInput";
import InputComp from "../Inputs/InputComp";
import { register } from "../../services/auth.service";

const SignUp = ({ isOpen, onClose, openSignInModal }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (id === "Profile-Picture") {
      setProfilePicture(files[0]);
    } else if (id === "License-Photo") {
      setLicensePhoto(files[0]);
    }
  };

  const validateForm = () => {
    if (
      !userData.email ||
      !userData.name ||
      !userData.phone ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    } else if (!userData.email.includes("@") || !userData.email.includes(".")) {
      setError("Invalid email address");
      return false;
    } else if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    } else if (
      userData.password.length < 6 ||
      userData.password.length > 20 ||
      !/[a-z]/.test(userData.password) ||
      !/[A-Z]/.test(userData.password) ||
      !/[0-9]/.test(userData.password)
    ) {
      setError(
        "Password must be between 6 and 20 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await register(userData);
      setUserData({
        email: "",
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "customer",
      });
      setProfilePicture(null);
      setLicensePhoto(null);
      onClose();
      openSignInModal();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <>
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
          onClick={onClose}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[97vh] overflow-auto hide-scrollbar bg-white z-50 p-5 rounded-xl space-y-2 w-11/12 md:w-1/2 lg:w-3/5">
          <div className="flex justify-between items-center">
            <img src={Logo} alt="Logo" />
            <Close onClick={onClose} className="cursor-pointer" />
          </div>
          <h2 className="text-2xl font-bold text-center">
            Welcome to Liverpool!
          </h2>
          <h3 className="text-main font-bold py-5 text-xl text-center">
            Sign Up
          </h3>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-2" onSubmit={handleSubmit}>
            <InputComp
              label="Email"
              id="email"
              type="email"
              value={userData.email}
              handleChange={handleChange}
              isRequired
            />

            <InputComp
              label="Full Name"
              id="name"
              type="text"
              value={userData.name}
              handleChange={handleChange}
              isRequired
            />
            <InputComp
              label="Phone Number"
              id="phone"
              type="tel"
              value={userData.phone}
              handleChange={handleChange}
              isRequired
            />

            <InputComp
              label="Password"
              id="password"
              type="password"
              value={userData.password}
              handleChange={handleChange}
              placeholder="**********"
              isRequired
            />
            <InputComp
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={userData.confirmPassword}
              handleChange={handleChange}
              placeholder="**********"
              isRequired
            />

            <div className="flex gap-5">
              <FileInput
                title="Profile Picture"
                label="Upload Profile Picture"
                id="Profile-Picture"
                handleChange={handleFileChange}
                isRequired
              />
              <FileInput
                title="License Photo"
                label="Upload License Photo"
                id="License-Photo"
                handleChange={handleFileChange}
                isRequired
              />
            </div>
            <button
              type="submit"
              className={`bg-main text-white py-3 text-lg rounded-md w-full mt-3 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="text-center font-semibold text-sm cursor-pointer">
              Already Have an Account?{" "}
              <span
                onClick={() => {
                  openSignInModal();
                  onClose();
                }}
                className="text-main hover:underline"
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </>
    )
  );
};

export default SignUp;
