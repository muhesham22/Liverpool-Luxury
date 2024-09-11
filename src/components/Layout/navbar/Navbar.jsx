import React, { useEffect, useState, useCallback } from "react";
import BurgerIcon from "../../../assets/icons/BurgerIcon";
import LogoSVG from "../../../assets/images/logo-svg.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignIn from "../../sign-in/SignIn";
import SignUp from "../../sign-up/SignUp";
import { clearDateRange } from "../../../store/slices/dateRangeSlice";
import { clearFilters } from "../../../store/slices/carsSlice";
import { useDispatch } from "react-redux";

// Extract navItems to a separate file or use a hook if it becomes dynamic
const navItems = [
  { name: "Home", path: "/" },
  { name: "All Cars", path: "/all-cars" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  const userName = localStorage.getItem("name") || "";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const closeSignInModal = () => setSignInModal(false);
  const openSignInModal = () => setSignInModal(true);
  const closeSignUpModal = () => {
    setSignUpModal(false);
    setShowBurgerMenu(false);
  };
  const openSignUpModal = () => {
    setSignUpModal(true);
    setShowBurgerMenu(false);
  };

  const handleTabChange = useCallback(
    (path) => {
      setActiveTab(path);
      navigate(path);
    },
    [navigate]
  );

  const toggleBurgerMenu = () => {
    setShowBurgerMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redirect to homepage or login page after logout
  };

  const toggleProfileDropDown = () => {
    setShowProfileDropDown((prev) => !prev);
  };

  return (
    <nav className="bg-white w-full grid grid-cols-12 gap-5 p-5">
      <div className="md:col-start-1 lg:col-start-2 md:col-end-5 col-span-8">
        <Link to="/">
          <img
            src={LogoSVG}
            className="cursor-pointer w-11/12 sm:w-8/12 md:w-11/12 lg:w-9/12 xl:w-8/12"
            alt="Logo"
          />
        </Link>
      </div>
      <ul className="col-start-5 md:col-end-10 lg:col-end-9 gap-5 hidden md:flex justify-center items-center">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`cursor-pointer hover:text-main ${
                activeTab === item.path ? "text-main" : ""
              } md:text-lg text-base font-sansation leading-6 tracking-tight text-headlines font-bold select-none`}
              onClick={() => {
                handleTabChange(item.path);
                if (item.path === "/all-cars") {
                  dispatch(clearDateRange());
                  dispatch(clearFilters());
                }
              }}
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="col-start-10 col-end-13 xl:col-end-12 justify-around hidden md:flex relative">
        {isLoggedIn ? (
          <>
            <button
              className="bg-main rounded-full p-2 px-4 max-h-14 min-h-14 min-w-14 max-w-14 text-white cursor-pointer hover:scale-105 hover:bg-opacity-80 text-2xl font-bold text-center"
              onClick={toggleProfileDropDown}
              aria-label="Go to profile"
            >
              {userName[0].toUpperCase()}
            </button>
            {showProfileDropDown && (
              <ProfileDropDown
                handleLogout={handleLogout}
                onClose={() => setShowProfileDropDown(false)}
              />
            )}
          </>
        ) : (
          <>
            <button
              className="text-headlines font-bold py-2 px-4 rounded-lg hover:bg-subtitles/30 transition-all duration-300"
              onClick={openSignUpModal}
              aria-label="Open Sign Up Modal"
            >
              Sign Up
            </button>
            <button
              className="bg-headlines text-white hover:bg-headlines/80 py-2 px-4 rounded-lg transition-all duration-300"
              onClick={openSignInModal}
              aria-label="Open Sign In Modal"
            >
              Login
            </button>
          </>
        )}
      </div>
      <div
        className="md:hidden col-start-11 col-end-13 flex flex-row-reverse cursor-pointer"
        onClick={toggleBurgerMenu}
        aria-label="Open menu"
      >
        <BurgerIcon />
      </div>
      {showBurgerMenu && (
        <BurgerMenu
          toggleBurgerMenu={toggleBurgerMenu}
          closeBurgerMenu={() => setShowBurgerMenu(false)}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          openSignUpModal={openSignUpModal}
          openSignInModal={openSignInModal}
          handleLogout={handleLogout}
        />
      )}
      <SignIn
        isOpen={signInModal}
        onClose={closeSignInModal}
        openSignUpModal={openSignUpModal}
      />
      <SignUp
        isOpen={signUpModal}
        onClose={closeSignUpModal}
        openSignInModal={openSignInModal}
      />
    </nav>
  );
};

const BurgerMenu = ({
  toggleBurgerMenu,
  closeBurgerMenu,
  activeTab,
  handleTabChange,
  openSignUpModal,
  openSignInModal,
  handleLogout,

}) => (
  <>
    <div
      className="bg-black opacity-50 fixed top-0 right-0 w-full h-full z-40"
      onClick={closeBurgerMenu}
      aria-label="Close menu overlay"
    ></div>
    <div className="bg-white fixed top-0 right-0 w-2/3 sm:w-1/2 h-full z-50 transition-transform transform-gpu ease-in-out">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-end">
          <button onClick={toggleBurgerMenu} aria-label="Close menu">
            <BurgerIcon />
          </button>
        </div>
        <ul className="flex flex-col gap-5">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`cursor-pointer hover:text-main ${
                  activeTab === item.path ? "text-main" : ""
                } md:text-lg text-base font-sansation leading-6 tracking-tight text-headlines font-bold select-none`}
                onClick={() => {
                  handleTabChange(item.path);
                  if (item.path === "/all-cars") {
                    dispatch(clearDateRange());
                    dispatch(clearFilters());
                  }
                }}
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {!localStorage.getItem("isLoggedIn") ? (
          <div className="flex flex-col gap-5">
            <button
              className="text-headlines font-bold text-lg"
              onClick={() => {
                closeBurgerMenu();
                openSignUpModal();
              }}
              aria-label="Sign Up"
            >
              Sign Up
            </button>
            <button
              className="bg-headlines text-white rounded font-bold text-lg"
              onClick={() => {
                closeBurgerMenu();
                openSignInModal();
              }}
              aria-label="Login"
            >
              Login
            </button>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/profile"
                className="text-headlines font-bold"
                onClick={closeBurgerMenu}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                className="text-headlines font-bold"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  </>
);

const ProfileDropDown = ({ handleLogout, onClose }) => (
  <>
    <div
      className="bg-black opacity-5 fixed top-0 right-0 w-full h-full z-40"
      onClick={onClose}
      aria-label="Close menu overlay"
    ></div>
    <div className="bg-white absolute top-16 right-0 w-48 p-5 rounded-md shadow-md z-50">
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to="/profile"
            className="text-headlines font-bold"
            onClick={onClose}
          >
            Profile
          </Link>
        </li>
        <li>
          <button
            className="text-headlines font-bold"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </>
);

export default Navbar;
