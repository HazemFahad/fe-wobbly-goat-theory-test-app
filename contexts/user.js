import { createContext } from "react";
import useUser from "../hooks/useUser";
 
export const UserContext = createContext();

export const UserProvider = (props) => {
  const {user,setUser} = useUser();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
