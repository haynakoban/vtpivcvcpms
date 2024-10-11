import { useNavigate } from "react-router-dom";
import { auth, db, google } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import useUsersStore from "@/store/useUsersStore";
import useAuditStore from "@/store/useAuditStore";

export default function SignInWithGoogle() {
  const { createUser } = useUsersStore();
  const { addAudit } = useAuditStore();
  const navigate = useNavigate();

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, google);
      const userRef = doc(db, "users", result.user?.uid);
      const user = await getDoc(userRef);

      // If there are no matching documents, proceed to create a new user account
      if (!user.exists()) {
        createUser({
          fullName: result?.user?.displayName || "John Doe",
          user: {
            uid: result.user.uid,
            email: result.user.email || "",
            emailVerified: result.user.emailVerified,
            photoURL: result.user.photoURL || "",
            refreshToken: result.user.refreshToken,
          },
        });
      }

      addAudit({
        userId: user.id,
        log: "Signed in with google",
        action: "Logged In",
      });

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <button
      type="button"
      className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
      onClick={signInWithGoogle}
    >
      <svg
        className="w-4 h-4 me-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 19"
      >
        <path
          fillRule="evenodd"
          d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
          clipRule="evenodd"
        />
      </svg>
      Sign in with Google
    </button>
  );
}
