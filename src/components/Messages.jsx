import { useEffect, useState } from "react";
import Message from "./Message";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.appSlice.emails);
  const searchText = useSelector((state) => state.appSlice.searchText);
  const [tempEmails, setTempEmails] = useState(emails);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      dispatch(setEmails(allEmails));
    });

    // Unsubscribe from events when no longer in use || cleanup
    return () => unsubscribe();
  }, []);

  // search functionality
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
      {tempEmails && tempEmails?.map((email) => <Message email={email} />)}
    </div>
  );
};

export default Messages;
