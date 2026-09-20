import { useAuth } from "../context/AuthContext";

function NavBar() {
  const {
    user,
    signIn,
    signOut,
  } = useAuth();

  return (
    <nav>
      {user ? (
        <>
          <span>
            Hi, {user.email}
          </span>

          <button onClick={signOut}>
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            signIn("user@example.com")
          }
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default NavBar;