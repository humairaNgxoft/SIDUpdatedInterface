import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  users: []
};

const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USERS: "SET_USERS",

};
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role
      };
    case ActionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };


    case ActionTypes.SET_USERS:
      return {
        ...state,
        user: {
          ...state.user,
          users: action.payload.map((user) => {
            return {
              ...user,
              // genre: genre.find((el) => book.genre == el.title),
            };
          }),
        },
      };


    default:
      return state;
  }
};

export const AuthProvidor = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        ActionTypes,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
