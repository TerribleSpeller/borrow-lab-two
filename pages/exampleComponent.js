// ExampleComponent.js
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/login";

function ExampleComponent() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default ExampleComponent;