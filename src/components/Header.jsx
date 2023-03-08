import {useAuthContext} from "../context/AuthContext";

const Header = () => {
  const { user }= useAuthContext()
  return (
    <div className="pt-12 pb-3 px-4 sm:py-8 flex font-bold font-josefin sm:items-center  text-xl sm:text-4xl justify-center drop-shadow-xl">
      <div className="flex items-center">
        <h2 className="pr-3 dark:text-specialGray-200">{user.username}</h2>
        <h2 className="py-3 px-4 bg-gradient-to-r from-orangish to-wine text-specialGray-100 rounded-xl text-center">
          To Do List
        </h2>
      </div>
    </div>
  );
};

export default Header;
