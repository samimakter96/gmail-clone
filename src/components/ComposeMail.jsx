import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";

const ComposeMail = () => {
  const [fromData, setFromData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const open = useSelector((state) => state.appSlice.open);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(fromData);
  };
  return (
    <>
      {open && (
        <div
          className={`bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}
        >
          <div className="flex px-3 py-2 bg-[#f2f6fc] justify-between rounded-t-md">
            <h1>New Message</h1>
            <div
              onClick={() => dispatch(setOpen(false))}
              className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <RxCross2 size={"20px"} />
            </div>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col p-3 gap-2">
            <input
              type="text"
              value={fromData.to}
              name="to"
              onChange={handleInputChange}
              placeholder="To"
              className="outline-none py-1"
            />
            <input
              type="text"
              value={fromData.subject}
              name="subject"
              onChange={handleInputChange}
              placeholder="Subject"
              className="outline-none py-1"
            />
            <textarea
              rows={"10"}
              cols={"30"}
              value={fromData.message}
              name="message"
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="outline-none py-1"
            />
            <button
              onClick={() => dispatch(setOpen(false))}
              type="submit"
              className="bg-[#0b57d0] rounded-full w-fit px-4 text-white font-medium"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ComposeMail;
