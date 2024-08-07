import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LogIn() {
  const [ValidationEmail, setValidationEmail] = useState("");
  const [ValidationPassword, setValidationPassword] = useState("");
  const [ValidationEmailShowAndHide, setValidationEmailShowAndHide] =
    useState("hidden");
  const [ValidationPasswordShowAndHide, setValidationPasswordShowAndHide] =
    useState("hidden");
  const [ShowPassword, setShowPassword] = useState(false);

  function ShowThPassword() {
    setShowPassword(!ShowPassword);
  }

  const Email_Message = /^(?![^\s@]+@[^\s@]+\.[^\s@]+$).+/.test(
    ValidationEmail
  );

  useEffect(() => {
    if (Email_Message) {
      setValidationEmailShowAndHide("block");
    } else {
      setValidationEmailShowAndHide("hidden");
    }
  }, [ValidationEmail]);

  const navigate = useNavigate();

  async function sub() {
    if (ValidationEmail === "" || Email_Message) {
      setValidationEmailShowAndHide("block");
      return;
    } else {
      setValidationEmailShowAndHide("hidden");
    }
    if (ValidationPassword === "") {
      setValidationPasswordShowAndHide("block");
      return;
    } else {
      setValidationPasswordShowAndHide("hidden");
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          Email: ValidationEmail,
          Password: ValidationPassword,
        },
        { withCredentials: true } // ارسال المعلومات مع الطلب مثل الكوكيز
      );
      if (response.status === 200) {
        alert("Log in successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Invalid credentials");
      } else {
        alert("Internal Server Error");
      }
    }
    // console.log(`Email : ${ValidationEmail}`);
    // console.log(`Password : ${ValidationPassword}`);
  }

  return (
    <>
      <title>Log In - NanoByte</title>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 font-sans">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div
            className={`${ValidationEmailShowAndHide} mb-4 p-4 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50`}
          >
            <svg
              className="inline w-5 h-5 mr-2 text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-3-3v6"
              />
            </svg>
            <span>Please enter a valid email address</span>
          </div>

          <div
            className={`${ValidationPasswordShowAndHide} mb-4 p-4 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50`}
          >
            <svg
              className="inline w-5 h-5 mr-2 text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-3-3v6"
              />
            </svg>
            <span>Please enter your password</span>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sub();
            }}
            id="Form_LogIn"
            className="flex flex-col"
          >
            <label htmlFor="Email" className="mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setValidationEmail(e.target.value)}
              type="email"
              name="Email"
              id="Email"
              placeholder="Enter your email"
              className="border-b-2 border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <div className={`${ValidationEmailShowAndHide} text-red-500 mb-2`}>
              Invalid email address
            </div>

            <label
              htmlFor="Password"
              className="mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                value={ValidationPassword}
                onChange={(e) => setValidationPassword(e.target.value)}
                type={ShowPassword ? "text" : "password"}
                name="Password"
                id="Password"
                placeholder="Enter your password"
                className="border-b-2 border-gray-300 p-2 mb-4 rounded-lg w-full focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 cursor-pointer"
                onClick={ShowThPassword}
              >
                {ShowPassword ? (
                  <i className="fa fa-eye-slash"></i>
                ) : (
                  <i className="fa fa-eye"></i>
                )}
              </button>
            </div>
            <div
              className={`${ValidationPasswordShowAndHide} text-red-500 mb-2`}
            >
              Please enter your password
            </div>

            <button
              type="submit"
              className="mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Log In
            </button>
            <div className="text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
