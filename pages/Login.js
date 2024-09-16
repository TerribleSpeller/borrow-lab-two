// ExampleComponent.js
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/login";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";


function ExampleComponent() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/equipment"); // Redirect to the desired page
    }
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">

            <Link href="/register">Haven't made an Account Yet?</Link>
          </div>
        </div>
      </div>
    </>

  );
}

export default ExampleComponent;