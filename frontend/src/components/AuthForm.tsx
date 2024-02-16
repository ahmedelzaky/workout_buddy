import { useState } from "react";
import useAuth from "../hooks/useAuth";

type AuthFormProps = {
  title: string;
  action: "login" | "signup";
};

function AuthForm({ title, action }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, error, isPending } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await auth(email, password, action);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>{title}</h3>

      <label htmlFor="email">Email:</label>
      <input
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        name="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isPending} type="submit">
        {title}
      </button>
      {error && (
        <div style={{ textAlign: "center" }} className="error">
          {error}
        </div>
      )}
    </form>
  );
}

export default AuthForm;
