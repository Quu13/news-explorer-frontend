import { createContext } from "react";

const UserContext = createContext({
  currentUser: [],
  isLoggedIn: false,
});

export default UserContext;