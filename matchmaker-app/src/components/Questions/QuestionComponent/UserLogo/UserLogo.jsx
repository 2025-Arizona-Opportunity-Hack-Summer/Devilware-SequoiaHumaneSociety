function UserLogo({ src }) {
  return (
    <div className="flex items-center">
      <img src={src} alt="you" className="xl:w-12 xl:h-12" />
    </div>
  );
}

export default UserLogo;
