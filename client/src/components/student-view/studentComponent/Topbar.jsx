import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow p-4">
      <input
        type="text"
        placeholder="Search Class, Documents, Activities..."
        className="w-1/2 px-4 py-2 border border-gray-300 rounded"
      />
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">11/12/2024</span>
        <span className="text-sm text-gray-500">6:50:32 PM</span>
        <Link
          to="profile"
          className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"
        ></Link>
      </div>
    </div>
  );
};

export default TopBar;
