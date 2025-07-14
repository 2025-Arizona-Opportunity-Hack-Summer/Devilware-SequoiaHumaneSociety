import { useAuthFrontendApis } from "@propelauth/frontend-apis-react";
import { useLogoutFunction, withAuthInfo } from "@propelauth/react";
import shsLogo from "../../assets/images/shs-logo.png";

export default withAuthInfo(function ConfirmEmail({ isLoggedIn, user, accessToken }) {
  const { resendEmailConfirmation } = useAuthFrontendApis();
  const logout = useLogoutFunction();

  const onClickResendEmailConfirmation = async () => {
    try {
      const response = await resendEmailConfirmation();

      response.handle({
        success() {
          console.log("Confirmation email resent");
        },
        rateLimited(error) {
          console.log("Rate limited", error.user_facing_error);
        },
        emailAlreadyConfirmed(error) {
          console.log("Email already confirmed", error.user_facing_error);
        },
      });
    } catch (err) {}
  };
  return (
    <div className="bg-[#eef0f2] w-screen h-screen flex flex-col items-center justify-center gap-5">
      <div>
        <img src={shsLogo} alt="shs" className="w-48" />
        <h2 className="text-2xl font-semibold">Confirm your email</h2>
      </div>
      <div className="bg-[#f8f9fa] p-6 border border-[#adb5bd] flex flex-col items-center gap-5 rounded-md">
        <p className="max-w-[320px] text-justify text-lg">
          You should receive an email with a link to confirm your email address within the next few minutes. If you do
          not receive an email, make sure to check your spam
        </p>
        <button
          onClick={onClickResendEmailConfirmation}
          className="py-1 bg-[#7c0f0f] text-white rounded-xl cursor-pointer font-semibold w-full hover:bg-[#000] duration-300">
          Resend confimation email
        </button>
      </div>

      <button
        onClick={logout}
        className="text-lg cursor-pointer font-semibold text-[#7c0f0f] hover:bg-[#ffdbda] rounded-md p-2 duration-300">
        Log out
      </button>
    </div>
  );
});
