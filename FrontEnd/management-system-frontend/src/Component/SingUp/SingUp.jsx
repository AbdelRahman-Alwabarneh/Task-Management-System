import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SingUp() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [FirstNameShowAndHide, setFirstNameShowAndHide] = useState("hidden");
  const [LastNameShowAndHide, setLastNameShowAndHide] = useState("hidden");

  const [ValidationEmail, setValidationEmail] = useState("");
  const [EmailMessage, setEmailMessage] = useState("hidden");

  const Email_Message = /^(?![^\s@]+@[^\s@]+\.[^\s@]+$).+/.test(
    ValidationEmail
  );
  useEffect(() => {
    setEmailMessage(Email_Message ? "block" : "hidden");
  }, [ValidationEmail]);

  const [ValidationPassword, setValidationPassword] = useState("");
  const [ShowAndHide, setShowAndHide] = useState("hidden");
  const [NoArabic, setNoArabic] = useState("hidden");
  const [EightLettersColor, setEightLettersColor] = useState("text-red-500");
  const [CapitalLetterColor, setCapitalLetterColor] = useState("text-red-500");
  const [NoAtleastColor, setNoAtleastColor] = useState("text-red-500");
  const [SpecialCharactersColor, setSpecialCharacters] =
    useState("text-red-500");

  const NoArabicPassword = /[\u0600-\u06FF]/.test(ValidationPassword);
  const EightLetters = /[A-Za-z\d\W]{8,}/.test(ValidationPassword);
  const CapitalLetter = /[A-Z]/.test(ValidationPassword);
  const NoAtleast = /\d/.test(ValidationPassword);
  const SpecialCharacters = /(?=.*[^\w\s])/.test(ValidationPassword);

  useEffect(() => {
    setEightLettersColor(EightLetters ? "text-green-500" : "text-red-500");
    setCapitalLetterColor(CapitalLetter ? "text-green-500" : "text-red-500");
    setNoAtleastColor(NoAtleast ? "text-green-500" : "text-red-500");
    setSpecialCharacters(SpecialCharacters ? "text-green-500" : "text-red-500");
    setShowAndHide(ValidationPassword ? "block" : "hidden");
    setNoArabic(NoArabicPassword ? "flex" : "hidden");
  }, [ValidationPassword]);

  const [ShowPassword, setShowPassword] = useState(false);
  function ShowThPassword() {
    setShowPassword(!ShowPassword);
  }

  const [VerificationSendPassword, setVerificationSendPassword] =
    useState("hidden");

  const SubmitPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W])(?=.*\S)(?!.*\s{2,})[A-Za-z\d\W_]{8,}$/.test(
      ValidationPassword
    );

  const navigate = useNavigate();

  async function sub() {
    if (FirstName === "") {
      setFirstNameShowAndHide("block");
      return;
    } else {
      setFirstNameShowAndHide("hidden");
    }
    if (LastName === "") {
      setLastNameShowAndHide("block");
      return;
    } else {
      setLastNameShowAndHide("hidden");
    }
    if (ValidationEmail === "" || Email_Message) {
      setEmailMessage("block");
      return;
    }
    if (ValidationPassword === "" || !SubmitPassword) {
      setVerificationSendPassword("flex");
      return;
    } else {
      setVerificationSendPassword("hidden");
    }

    // console.log(`First Name : ${FirstName}`);
    // console.log(`Last Name : ${LastName}`);
    // console.log(`Email : ${ValidationEmail}`);
    // console.log(`Password : ${ValidationPassword}`);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        {
          First_Name: FirstName,
          Last_Name: LastName,
          Email: ValidationEmail,
          Password: ValidationPassword,
        },
        { withCredentials: true }
      );

      console.log("Success:", response.data);
      navigate("/"); // Navigate to another page on successful registration
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Show error message if email already registered
      } else {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    }
  }

  return (
    <>
      <title>Create Account - NanoByte</title>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 font-sans">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div
            className={`${NoArabic} mb-4 p-4 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50`}
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
            <span>Please use English characters for the password</span>
          </div>

          <div
            className={`${VerificationSendPassword} mb-4 p-4 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50`}
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
            <span>
              Please enter the password according to the specified requirements
            </span>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              NoArabicPassword ? null : sub();
            }}
            id="Form_SingUp"
            className="flex flex-col"
          >
            <label
              htmlFor="First_Name"
              className="mb-2 font-semibold text-gray-700"
            >
              First Name
            </label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
                if (e.target.value) setFirstNameShowAndHide("hidden");
              }}
              type="text"
              name="First_Name"
              id="First_Name"
              placeholder="Enter your first name"
              className="border-b-2 border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <div className={`${FirstNameShowAndHide} text-red-500 mb-2`}>
              Please enter your first name
            </div>

            <label
              htmlFor="Last_Name"
              className="mb-2 font-semibold text-gray-700"
            >
              Last Name
            </label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
                if (e.target.value) setLastNameShowAndHide("hidden");
              }}
              type="text"
              name="Last_Name"
              id="Last_Name"
              placeholder="Enter your last name"
              className="border-b-2 border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <div className={`${LastNameShowAndHide} text-red-500 mb-2`}>
              Please enter your last name
            </div>

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
            <div className={`${EmailMessage} text-red-500 mb-2`}>
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
            <div className={`${ShowAndHide} mt-2 text-sm text-gray-600`}>
              <div className={`${EightLettersColor}`}>
                • Password must be at least 8 characters long
              </div>
              <div className={`${CapitalLetterColor}`}>
                • Must contain at least one uppercase letter
              </div>
              <div className={`${NoAtleastColor}`}>
                • Must contain at least one number
              </div>
              <div className={`${SpecialCharactersColor}`}>
                • Must contain at least one special character
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Create Account
            </button>
            <div className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SingUp;
