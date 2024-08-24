import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. 
   If so, programmatically navigate to `/app`
4) In `User.jsx`, read and display logged in user from context (`user` object). 
   Then include this component in `AppLayout.jsx`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
