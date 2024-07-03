// Sent.jsx
import React, { useEffect, useState } from "react";
import Message from "./Message";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const Sent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.appSlice.user);
  const emails = useSelector((state) => state.appSlice.emails);
  const searchText = useSelector((state) => state.appSlice.searchText);
  const [tempEmails, setTempEmails] = useState(emails);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "emails"),
      where("from", "==", user.email),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      dispatch(setEmails(allEmails));
    });

    return () => unsubscribe();
  }, [dispatch, user]);

  useEffect(() => {
    const filteredEmail = emails.filter((email) => {
      return (
        email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to.toLowerCase().includes(searchText.toLowerCase()) ||
        email.message.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setTempEmails(filteredEmail);
  }, [searchText, emails]);

  return (
    <div>
      {tempEmails && tempEmails.map((email) => <Message key={email.id} email={email} />)}
    </div>
  );
};

export default Sent;
