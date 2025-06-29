/**
 * Contain user image
 * @param {string} src string value for image's address
 * **/

function UserLogo({ src }) {
  return <img src={src} alt="you" className="w-12 h-12" />;
}

export default UserLogo;
