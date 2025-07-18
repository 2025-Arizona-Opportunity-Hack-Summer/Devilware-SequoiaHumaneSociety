import React, { useState } from "react";
import { useAuthFrontendApis } from "@propelauth/frontend-apis-react";
import { SocialLoginProvider } from "@propelauth/frontend-apis";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import Modal from "../../components/Modal/Modal";

import googleLogo from "../../assets/images/GOOGLE.png";
import puppy from "../../assets/images/Puppy.png";

import { fetchCreateUser } from "../../features/fetchUserRoutes";

import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    agreeToTerms: false,
    // shedLevel: "",
    // hasAllergies: "no",
    // allergyDetails: "",
    // housingType: "",
    // animalType: "",
    // activityLevel: "",
    // otherAnimalTypes: [],
  });
  const [validFormData, setValidFormData] = useState({
    minLengthPassword: null,
    matchPassword: null,
    validEmail: null,
    minLengthFirstName: null,
    minLengthLastName: null,
  });

  const [getError, setError] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const { signup, loginWithSocialProvider, emailPasswordLogin } = useAuthFrontendApis();
  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      checkValidation(name, value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const condition in validFormData) {
      if (validFormData[condition] === null || validFormData[condition] === false) {
        openVisibleErrorModal(
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
            openVisibleErrorModal(thirdResponse.error.user_facing_error);
          }
        },
        badRequest(error) {
          const errorMessage = Object.entries(error.user_facing_errors)[0][1];
          openVisibleErrorModal(errorMessage);
        },
      });
    } catch (err) {
      console.log(err);
      openVisibleErrorModal(err);
    }
  };

  function checkValidation(name, value) {
    if (name === "firstName") {
      setValidFormData((prev) => ({
        ...prev,
        minLengthFirstName: value.length > 0,
      }));
    } else if (name === "lastName") {
      setValidFormData((prev) => ({
        ...prev,
        minLengthLastName: value.length > 0,
      }));
    } else if (name === "password") {
      setValidFormData((prev) => ({
        ...prev,
        minLengthPassword: value.length >= 8,
      }));

      if (validFormData.matchPassword !== null) {
        setValidFormData((prev) => ({
          ...prev,
          matchPassword: formData.confirmPassword === value,
        }));
      }
    } else if (name === "confirmPassword") {
      setValidFormData((prev) => ({
        ...prev,
        matchPassword: formData.password === value,
      }));
    } else if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setValidFormData((prev) => ({
        ...prev,
        validEmail: value.match(emailRegex) !== null ? true : false,
      }));
    }
  }

  const openVisibleErrorModal = (error) => {
    setError((prev) => error);
    setVisibleModal((prev) => true);

    setTimeout(() => {
      setError((prev) => null);
      setVisibleModal((prev) => false);
    }, 10000);
  };
  return (
    <>
      <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
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
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors mb-4">
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
                  {validFormData.minLengthFirstName !== null && (
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: validFormData.minLengthFirstName === false ? "#C1272D" : "#52b788",
                      }}>
                      First name must have at least 1 character
                    </p>
                  )}
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
                  {validFormData.minLengthLastName !== null && (
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: validFormData.minLengthLastName === false ? "#C1272D" : "#52b788",
                      }}>
                      Last name must have at least 1 character
                    </p>
                  )}
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
                />
                {validFormData.validEmail !== null && (
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: validFormData.validEmail === false ? "#C1272D" : "#52b788",
                    }}>
                    Email must a valid form *@*.*
                  </p>
                )}
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
                {validFormData.minLengthPassword !== null && (
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: validFormData.minLengthPassword === false ? "#C1272D" : "#52b788",
                    }}>
                    The length of password is at least 8
                  </p>
                )}
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
                {validFormData.matchPassword !== null && (
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        validFormData.matchPassword === false || formData.confirmPassword.length === 0
                          ? "#C1272D"
                          : "#52b788",
                    }}>
                    The re-type password does not match the password
                  </p>
                )}
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

            {/* Animal Preferences Section */}
            {/* <fieldset className="space-y-6 border-t border-gray-200 pt-6">
            <legend className="text-lg font-medium text-gray-900">Animal Preferences</legend>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Animal Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {['cats', 'dogs', 'both', 'other'].map(type => (
                  <label key={type} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="animalType" value={type} checked={formData.animalType === type} onChange={handleInputChange} className="h-4 w-4 text-gray-800 focus:ring-gray-700 border-gray-300" />
                    <span className="ml-3 capitalize">{type === 'both' ? 'Both' : type === 'other' ? 'Other' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.animalType === 'other' && (
              <div className="pt-2">
                <label htmlFor="otherAnimalTypes" className="block text-sm font-medium text-gray-700 mb-2">
                  Specify Other Animal Types (hold Ctrl/Cmd to select multiple)
                </label>
                <select
                  id="otherAnimalTypes"
                  name="otherAnimalTypes"
                  multiple
                  value={formData.otherAnimalTypes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 h-32 resize-y"
                >
                  <option value="rabbits">Rabbits</option>
                  <option value="guinea-pigs">Guinea Pigs</option>
                  <option value="hamsters">Hamsters</option>
                  <option value="ferrets">Ferrets</option>
                  <option value="reptiles">Reptiles</option>
                  <option value="birds">Birds</option>
                </select>
              </div>
            )}

            <div>
              <label htmlFor="shedLevel" className="block text-sm font-medium text-gray-700 mb-2">Preferred Shed Level</label>
              <select id="shedLevel" name="shedLevel" value={formData.shedLevel} onChange={handleInputChange} className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800">
                <option value="">Select a preference</option>
                <option value="low">Low Shedding</option>
                <option value="medium">Medium Shedding</option>
                <option value="high">High Shedding</option>
                <option value="no-preference">No Preference</option>
              </select>
            </div>

            <div>
              <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-2">Preferred Activity Level</label>
              <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleInputChange} className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800">
                <option value="">Select a preference</option>
                <option value="low">Low (Couch Potato)</option>
                <option value="medium">Medium (Walks & Playtime)</option>
                <option value="high">High (Running & Hiking Buddy)</option>
              </select>
            </div>

            <div>
              <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-2">Your Housing Type</label>
              <select id="housingType" name="housingType" value={formData.housingType} onChange={handleInputChange} className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800">
                <option value="">Select your housing type</option>
                <option value="apartment">Apartment / Condo</option>
                <option value="house-no-yard">House (No Yard)</option>
                <option value="house-with-yard">House (With Yard)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have pet allergies?</label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                <label className="flex items-center"><input type="radio" name="hasAllergies" value="no" checked={formData.hasAllergies === 'no'} onChange={handleInputChange} className="h-4 w-4 text-gray-800 focus:ring-gray-700 border-gray-300" /><span className="ml-2">No</span></label>
                <label className="flex items-center"><input type="radio" name="hasAllergies" value="yes" checked={formData.hasAllergies === 'yes'} onChange={handleInputChange} className="h-4 w-4 text-gray-800 focus:ring-gray-700 border-gray-300" /><span className="ml-2">Yes</span></label>
              </div>
            </div>

            {formData.hasAllergies === 'yes' && (
              <div>
                <label htmlFor="allergyDetails" className="block text-sm font-medium text-gray-700 mb-2">Please specify your allergies</label>
                <textarea id="allergyDetails" name="allergyDetails" value={formData.allergyDetails} onChange={handleInputChange} rows="3" className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 resize-y" placeholder="e.g., Cats, long-haired dogs..."></textarea>
              </div>
            )}
          </fieldset> */}

            {/* Terms and Submit */}
            <div>
              <div className="flex items-start pt-4">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="h-4 w-4 text-gray-800 focus:ring-gray-700 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="/terms" className="font-medium text-gray-800 hover:text-gray-600 underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-medium text-gray-800 hover:text-gray-600 underline">
                    Privacy Policy
                  </a>
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
                Already have an account?
                <a href="/sign-in" className="font-medium text-gray-800 hover:text-gray-600 underline">
                  Sign in here
                </a>
              </p>
            </div>
          </form>
          <div className="float-left bottom-0 right-0 rotate-y-180 absolute">
            <img src={puppy} alt="dog" className="relative w-2xl" />
          </div>
        </div>
      </div>
      <Modal visible={visibleModal} className="!w-max !h-max !right-0 !top-1/8 !bg-transparent ">
        <div className="bg-white border-2 border-l-0 border-[#a4133c] max-w-[250px] border-r-4 py-2 px-5 error-modal">
          <div className="flex gap-2 items-center">
            <WarningSVG />
            <p className="font-semibold uppercase text-[#a4133c]">Cannot sign up</p>
          </div>
          <p>{getError}</p>
        </div>
      </Modal>
    </>
  );
}

function WarningSVG() {
  return (
    <svg className="w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z"
        fill="#a4133c"
      />
    </svg>
  );
}
export default Register;
