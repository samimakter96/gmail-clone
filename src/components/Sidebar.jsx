import React from "react";
import { MdInbox } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setSelectedFolder } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    icon: <MdInbox size={"24px"} />,
    text: "Inbox",
    path: '/'
  },
  {
    icon: <IoMdStar size={"24px"} />,
    text: "Starred",
  },
  {
    icon: <MdOutlineWatchLater size={"24px"} />,
    text: "Snoozed",
  },
  {
    icon: <TbSend2 size={"24px"} />,
    text: "Sent",
    path: '/sent'
  },
  {
    icon: <MdOutlineDrafts size={"24px"} />,
    text: "Draft",
  },
  {
    icon: <MdOutlineKeyboardArrowDown size={"24px"} />,
    text: "More",
  },
];

const Sidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const unReadEmailCount = useSelector((state) => state.appSlice.emails.filter((email) => !email.read).length)

  const handleNavigation = (item) => {
    if (item.path) {
      dispatch(setSelectedFolder(item.text))
      navigate(item.path)
    }
  }

  return (
    <div className="w-[15%]">
      <div className="p-3">
        <button onClick={() => dispatch(setOpen(true))} className="flex items-center gap-2 p-4 rounded-2xl hover:shadow-md bg-[#c2e7ff]">
          <LuPencil size={"24px"} />
          Compose
        </button>
      </div>
      <div className="text-gray-500">
        {sidebarItems.map((item, index) => {
          return (
            <div key={index} onClick={() => handleNavigation(item)} className="flex items-center gap-4 pl-6 py-1 rounded-r-full hover:cursor-pointer my-2 hover:bg-gray-200">
              {item.icon}
              <p>{item.text} {item.text === 'Inbox' && `(${unReadEmailCount})`}</p> 
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
