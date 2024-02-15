import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, error, isPending } = useAuth("login");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await auth(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label htmlFor="email">Email:</label>
      <input
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="email">Password:</label>
      <input
        name="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isPending} type="submit">
        Log In
      </button>
      {error && (
        <div style={{ textAlign: "center" }} className="error">
          {error}
        </div>
      )}
    </form>
  );
}

export default Login;
