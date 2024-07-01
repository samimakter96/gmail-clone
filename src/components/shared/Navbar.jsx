import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setUser } from "../../redux/appSlice";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.appSlice.user)
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(setSearchText(searchInput));
  }, [searchInput]);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <RxHamburgerMenu size={"20px"} />
          </div>
          <img
            onClick={() => navigate("/")}
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail-logo"
          />
        </div>
      </div>
      <div className="md:block hidden w-[50%] mr-80">
        <div className="flex items-center bg-[#eaf1fb] px-2 py-3 rounded-full">
          <IoIosSearch size={"24px"} className="text-gray-700" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Mail"
            className="rounded-full w-full bg-transparent outline-none px-1"
          />
        </div>
      </div>
      <div className="md:block hidden">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <GoQuestion size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoSettingsOutline size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <PiDotsNineBold size={"20px"} />
          </div>
          <div className="relative cursor-pointer">
            <Avatar
              onClick={() => setToggle(!toggle)}
              src={user.photoURL}
              size="35"
              round={true}
            />
            <AnimatePresence>
              {toggle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-2 z-20 shadow-lg bg-white rounded-md"
                >
                  <p onClick={signOutHandler} className="p-2 underline">
                    Logout
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
