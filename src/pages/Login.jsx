import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Button from "../components/Button.jsx";
import Message from "../components/Message.jsx";
import PageNav from "../components/PageNav.jsx";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, error, reset, login } = useAuthContext();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("Jack");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    reset();
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    reset();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={handleChangeEmail}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChangePassword}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
      <div>{error && <Message message={error} />}</div>
    </main>
  );
}
