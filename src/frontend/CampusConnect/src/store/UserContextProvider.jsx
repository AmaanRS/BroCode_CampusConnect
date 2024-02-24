import { createContext, useReducer } from "react";

export const UserContext = createContext({
  userId: "",
  updateUserId: () => "",
});
UserContext;
function userReducer(userId, action) {
  console.log("in dispatch", action);
  switch (action.type) {
    case "updateId":
      console.log("in dispatch reducer", action);
      return action.payload.email;

    default:
      return "error";
  }
}

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [userId, userIDDispatch] = useReducer(userReducer, "s");
  function updateUserId(email) {
    console.log("before dispatch", email);
    userIDDispatch({
      type: "updateId",
      payload: {
        email,
      },
    });
  }

  const value = {
    userId,
    updateUserId,
  };
  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}
