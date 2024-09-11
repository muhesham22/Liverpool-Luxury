import React from "react";
import Logo from "../../assets/images/logo-svg.svg";
import { Close } from "@mui/icons-material";
import InputComp from "../Inputs/InputComp";
import { login } from "../../services/auth.service";
import { Navigate, useNavigate } from "react-router-dom";

const SignIn = ({ isOpen, onClose, openSignUpModal }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Invalid email address");
      return false;
    } else if (
      formData.password.length < 6 ||
      formData.password.length > 20 ||
      !/[a-z]/.test(formData.password) ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      setError(
        "Password must be between 6 and 20 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
      );
      return false;
    }

    // If all validations pass
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
      await login(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      setError("");
      navigate("/");
      onClose();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setError("User not found");
      } else if (error.response && error.response.status === 401) {
        setError("Invalid credentials");
      } else {
        setError("An error occurred. Please try again later");
      }
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
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-5 rounded-xl space-y-2 w-11/12 md:w-1/2 lg:w-1/3">
          <div className="flex justify-between items-center">
            <img src={Logo} alt="Logo" />
            <Close onClick={onClose} className="cursor-pointer" />
          </div>
          <h2 className="text-2xl font-bold text-center">
            Welcome to Liverpool!
          </h2>
          <h3 className="text-main font-bold py-5 text-xl text-center">
            Login
          </h3>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputComp
              label="Email"
              id="email"
              type="text"
              value={formData.email}
              handleChange={handleChange}
              placeholder="Email"
              isRequired
            />
            <InputComp
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              handleChange={handleChange}
              placeholder="**********"
              isRequired
            />
            <button
              type="submit"
              className={`bg-main text-white py-4 px-4 rounded-md w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
            <p className="text-center font-semibold text-sm cursor-pointer">
              No Account yet?{" "}
              <span
                onClick={() => {
                  openSignUpModal();
                  onClose();
                }}
                className="text-main hover:underline"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </>
    )
  );
};

export default SignIn;
