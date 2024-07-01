import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { markAsRead, setSelectedEmail } from "../redux/appSlice";
import { motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Message = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markEmailAsRead = async (emailId) => {
    const emailRef = doc(db, "emails", emailId);
    await updateDoc(emailRef, {
      read: true,
    });
  };

  const openMail = async () => {
    dispatch(setSelectedEmail(email));
    // first update in the client side redux store mark as read 
    dispatch(markAsRead(email.id));

    try {
      // then update in the server side firebase fireStore mark as read
      await markEmailAsRead(email.id);
    } catch (error) {
      console.log("Failed to mark email as read", error);
    }
    navigate(`/mail/${email.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={openMail}
      className="flex items-start justify-between border-b border-gray-200 px-4 py-2 text-sm hover:cursor-pointer hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div
          // blue dot only shows when the mail in unread 
          className={`w-2 h-2 rounded-full ${
            !email.read ? "bg-blue-500" : "bg-transparent"
          }`}
        ></div>
        <div className="flex-none text-gray-300">
          <MdCropSquare className="w-5 h-5" />
        </div>
        <div className="flex-none text-gray-300">
          <RiStarLine className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-semibold">{email.to}</h1>
        </div>
      </div>
      <div className="flex-1 ml-4">
        <p className="text-gray-600 truncate inline-block max-w-full">
          {email?.message}
        </p>
      </div>
      <div className="flex-none text-gray-400 text-sm">
        <p>{new Date(email?.createdAt?.seconds * 1000).toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default Message;
