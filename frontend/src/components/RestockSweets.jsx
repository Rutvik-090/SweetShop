import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllSweets, restockSweet } from "../api/sweets";

const RestockSweet = () => {
  const [sweets, setSweets] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      setError(null);
      const sweetsData = await getAllSweets();
      setSweets(sweetsData || []);
    } catch (err) {
      console.error("Error fetching sweets", err);
      setError("Failed to fetch sweets");
      setSweets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id, value) => {
    setQuantities({ ...quantities, [id]: Number(value) });
  };

  const handleRestock = async (id) => {
    const quantity = quantities[id] || 0;

    if (quantity <= 0) {
      toast.error("Please enter a valid quantity to restock");
      return;
    }

    try {
      await restockSweet(id, quantity);
      toast.success("Restocked successfully!");

      setQuantities({ ...quantities, [id]: "" });

      fetchSweets();
    } catch (err) {
      console.error("Restock error:", err);
      toast.error(err.response?.data?.message || "Error restocking sweet");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Restock Sweets</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Restock Sweets</h2>
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchSweets}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Restock Sweets</h2>

      {sweets.length === 0 ? (
        <p className="text-gray-500">No sweets found to restock.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Current Stock</th>
              <th className="border px-4 py-2">Add Quantity</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map((sweet) => (
              <tr key={sweet._id} className="text-center">
                <td className="border px-4 py-2">{sweet.name}</td>
                <td className="border px-4 py-2">{sweet.category}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`font-semibold ${
                      sweet.quantity === 0
                        ? "text-red-500"
                        : sweet.quantity < 10
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {sweet.quantity}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min={1}
                    value={quantities[sweet._id] || ""}
                    onChange={(e) => handleChange(sweet._id, e.target.value)}
                    className="border w-20 text-center p-1"
                    placeholder="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRestock(sweet._id)}
                    disabled={
                      !quantities[sweet._id] || quantities[sweet._id] <= 0
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:bg-gray-400"
                  >
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {sweets.filter((sweet) => sweet.quantity < 10).length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-yellow-600">
            Low Stock Items
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sweets
              .filter((sweet) => sweet.quantity < 10)
              .map((sweet) => (
                <div
                  key={sweet._id}
                  className="bg-yellow-50 p-3 rounded border"
                >
                  <div className="font-semibold">{sweet.name}</div>
                  <div className="text-sm text-gray-600">{sweet.category}</div>
                  <div className="text-sm">
                    Stock:{" "}
                    <span
                      className={
                        sweet.quantity === 0
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                    >
                      {sweet.quantity}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestockSweet;
