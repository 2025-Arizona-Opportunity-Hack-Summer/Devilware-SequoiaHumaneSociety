import { useAuthFrontendApis } from "@propelauth/frontend-apis-react";
import { SocialLoginProvider } from "@propelauth/frontend-apis";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";

import Modal from "../../../../components/common/Modal/Modal";
import useRegistrationForm from "../../hooks/useRegistrationForm";
import useErrorModal from "../../hooks/useErrorModal";

import { fetchCreateUser } from "../../services/authServices";

import "./RegistrationForm.css";

import googleLogo from "../../../../assets/images/GOOGLE.png";
import puppy from "../../../../assets/images/Puppy.png";

import { WarningSVG, TickSVG } from "../../utils/SVG";

function RegistrationForm() {
  const navigate = useNavigate();
  const { signup, loginWithSocialProvider, emailPasswordLogin } = useAuthFrontendApis();

  const [formData, validFormData, handleInputChange] = useRegistrationForm();
  const [errorMessage, visibleModal, openErrorModal] = useErrorModal();

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
      Check form validation
    */
    for (const name in validFormData) {
      if (validFormData[name] !== true) {
        openErrorModal(
          "Make sure that the following required fields have valid form: First Name, Last Name, Email, Password, Re-type Password"
        );

        return;
      }
    }

    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      response.handle({
        success: async () => {
          await fetchCreateUser(
            formData.email,
            formData.firstName,
            formData.lastName,
            formData.dateOfBirth,
            formData.gender
          );

          const autoLoginAfterRegister = await emailPasswordLogin({
            email: formData.email,
            password: formData.password,
          });

          if (autoLoginAfterRegister.ok) {
            Cookies.set("email-auth", email, { expires: 30 });
            navigate("/confirm-email");
          } else {
            openErrorModal(thirdResponse.error.user_facing_error);
          }
        },
        badRequest(error) {
          const errorMessage = Object.entries(error.user_facing_errors)[0][1];
          openErrorModal(errorMessage);
        },
      });
    } catch (err) {
      console.log(err);
      openErrorModal(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8 lg:py-20 xl:py-28">
        <div className="max-w-2xl w-full mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-center text-4xl sm:text-5xl md:text-6xl text-black tracking-[0.15em] mb-4"
              style={{ fontFamily: "'Koulen', sans-serif" }}>
              REGISTER
            </h1>
            <div className="w-full h-px bg-gray-300 mx-auto"></div>
          </div>

          {/* Google Register Button */}
          <div>
            <input
              type="button"
              id="sign-up-google-button"
              className="hidden"
              onClick={() => loginWithSocialProvider(SocialLoginProvider.GOOGLE)}
            />
            <label
              htmlFor="sign-up-google-button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors mb-4 cursor-pointer">
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
              Register with Google
            </label>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or register manually</span>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <fieldset className="space-y-6 border-t border-gray-200 pt-6">
              <legend className="text-lg font-medium text-gray-900">Personal Information</legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                  {validFormData.minLengthFirstName === false && (
                    <p className="text-sm font-semibold text-[#C1272D]">First name must have at least 1 character</p>
                  )}
                  {validFormData.minLengthFirstName === true && <TickSVG />}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                  {validFormData.minLengthLastName === false && (
                    <p className="text-sm font-semibold text-[#C1272D]">Last name must have at least 1 character</p>
                  )}
                  {validFormData.minLengthLastName === true && <TickSVG />}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  autoComplete="off"
                />
                {validFormData.validEmail === false && (
                  <p className="text-sm font-semibold text-[#C1272D]">
                    Email must have valid form, for example john@doe.com
                  </p>
                )}
                {validFormData.validEmail === true && <TickSVG />}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  autoComplete="off"
                />
                {validFormData.minLengthPassword === false && (
                  <p className="text-sm font-semibold text-[#C1272D]">The length of password is at least 8</p>
                )}
                {validFormData.minLengthPassword === true && <TickSVG />}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Re-type Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  autoComplete="off"
                />
                {validFormData.matchPassword === false && (
                  <p className="text-sm font-semibold text-[#C1272D]">
                    The re-type password does not match the password
                  </p>
                )}
                {validFormData.matchPassword === true && <TickSVG />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800">
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </fieldset>
            <div>
              <div className="flex items-center pt-4">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="h-4 w-4 text-gray-800 focus:ring-gray-700 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700 font-semibold ">
                  I agree to create Sequoia accout{" "}
                  {/*the{" "}
                  <a href="#" className="font-medium text-gray-800 hover:text-gray-600 underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-gray-800 hover:text-gray-600 underline">
                    Privacy Policy
                  </a>*/}
                </label>
              </div>
            </div>

            <input type="submit" id="submit-button" className="hidden" />
            <label
              htmlFor="submit-button"
              className="cursor-pointer text-center block w-full mt-6 py-4 px-6 border border-transparent rounded-lg text-lg font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors">
              Create Account
            </label>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/sign-in" className="font-medium text-gray-800 hover:text-gray-600 underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
          <div className="xl:block hidden float-left bottom-0 right-0 rotate-y-180 absolute">
            <img src={puppy} alt="dog" className="relative 2xl:w-2xl xl:w-xl" />
          </div>
        </div>
      </div>
      <Modal visible={visibleModal} className="!w-max !h-max !right-0 !top-1/8 !bg-transparent ">
        <div className="bg-white border-2 border-l-0 border-[#a4133c] max-w-[250px] border-r-4 py-2 px-5 error-modal">
          <div className="flex gap-2 items-center">
            <WarningSVG />
            <p className="font-semibold uppercase text-[#a4133c]">Cannot sign up</p>
          </div>
          <p>{errorMessage}</p>
        </div>
      </Modal>
    </>
  );
}

export default RegistrationForm;
