import React from "react";
import Navbar from "./components/shared/Navbar";
// import Sidebar from "./components/Sidebar";
// import { createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Inbox from "./components/Inbox";
import Mail from "./components/Mail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComposeMail from "./components/ComposeMail";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Body />,
//     children: [
//       {
//         path: "/",
//         element: <Inbox />,
//       },
//       {
//         path: "/mail/:id",
//         element: <Mail />,
//       },
//     ],
//   },
// ]);

const App = () => {
  return (
    <Router>
      <div className="bg-[#f6f8fc] h-screen w-screen overflow-hidden">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Body />}>
            <Route path="/" element={<Inbox />} />
            <Route path="/mail/:id" element={<Mail />} />
          </Route>
        </Routes>
          <div className="absolute w-[30%] bottom-0 right-20 z-10">
            <ComposeMail />
          </div>
      </div>
    </Router>
  );
};

export default App;
