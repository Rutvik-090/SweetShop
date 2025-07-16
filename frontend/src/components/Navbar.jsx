import { Store } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full h-[4rem] border-b-2">
      <nav className="flex flex-row items-center justify-between m-4 ">
        <h1 className="flex flex-row items-center gap-2 text-2xl font-semibold">
          <Store />
          Sweet Shop
        </h1>

        <div className="text-sm">
          <button className="w-18 h-8 border-2 rounded-md mr-4 font-medium cursor-pointer">
            Sign-up
          </button>
          <button className="w-18 h-8 border-2 rounded-md font-medium cursor-pointer">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
