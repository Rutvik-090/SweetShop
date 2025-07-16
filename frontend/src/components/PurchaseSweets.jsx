import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllSweets, purchaseSweet } from "../api/sweets";

const PurchaseSweets = () => {
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

  const handlePurchase = async (id) => {
    const quantity = quantities[id] || 1;

    const sweet = sweets.find((s) => s._id === id);
    if (!sweet) {
      toast.error("Sweet not found");
      return;
    }

    if (quantity > sweet.quantity) {
      toast.error(`Only ${sweet.quantity} items available`);
      return;
    }

    if (quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    try {
      await purchaseSweet(id, quantity);
      toast.success("Purchased successfully!");

      setQuantities({ ...quantities, [id]: "" });

      fetchSweets();
    } catch (err) {
      console.error("Purchase error:", err);
      toast.error(err.response?.data?.message || "Error purchasing sweet");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Purchase Sweets</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Purchase Sweets</h2>
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
      <h2 className="text-2xl font-bold mb-4">Purchase Sweets</h2>

      {sweets.length === 0 ? (
        <p className="text-gray-500">No sweets available for purchase.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Available</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sweets
              .filter((sweet) => sweet.quantity > 0) // Only show items in stock
              .map((sweet) => (
                <tr key={sweet._id} className="text-center">
                  <td className="border px-4 py-2">{sweet.name}</td>
                  <td className="border px-4 py-2">₹{sweet.price}</td>
                  <td className="border px-4 py-2">{sweet.quantity}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min={1}
                      max={sweet.quantity}
                      value={quantities[sweet._id] || ""}
                      onChange={(e) => handleChange(sweet._id, e.target.value)}
                      className="border w-16 text-center p-1"
                      placeholder="1"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handlePurchase(sweet._id)}
                      disabled={sweet.quantity === 0}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {sweets.filter((sweet) => sweet.quantity === 0).length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-red-600">
            Out of Stock
          </h3>
          <div className="text-sm text-gray-600">
            {sweets
              .filter((sweet) => sweet.quantity === 0)
              .map((sweet) => sweet.name)
              .join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseSweets;
