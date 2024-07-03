import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    open: false,
    emails: [],
    selectedEmail: null,
    searchText: "",
    user: null,
    selectedFolder: "Inbox"
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    markAsRead: (state, action) => {
      state.emails = state.emails.map((email) => {
        if (email.id === action.payload) {
          return { ...email, read: true };
        }
        return email;
      });
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    }
    
  },
});

export const { setOpen, setEmails, setSelectedEmail, setSearchText, setUser, markAsRead, setSelectedFolder } =
  appSlice.actions;

export default appSlice.reducer;
