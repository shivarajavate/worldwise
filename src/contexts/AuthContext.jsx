import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;

    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };

    case "logout":
      return { ...state, user: null, isAuthenticated: false, error: "" };

    case "error":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "Jack",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function reset() {
    dispatch({ type: "reset" });
  }

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    else {
      dispatch({ type: "error", payload: "Invalid email or password" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, reset, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthContextProvider, useAuthContext };
