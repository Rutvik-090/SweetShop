import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mt-10 relative">
      <h1 className="text-3xl font-bold mb-6">Sweet Shop Management</h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          className="w-32 h-10 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => navigate("/create")}
        >
          Add Sweet
        </button>

        <button
          className="w-32 h-10 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
          onClick={() => navigate("/view")}
        >
          View Sweets
        </button>

        <button
          className="w-32 h-10 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer"
          onClick={() => navigate("/purchase")}
        >
          Purchase
        </button>

        <button
          className="w-32 h-10 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer"
          onClick={() => navigate("/restock")}
        >
          Restock
        </button>
      </div>
    </div>
  );
};

export default Home;
