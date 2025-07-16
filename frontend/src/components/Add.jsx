import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addSweet } from "../api/sweets";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addSweet(formData);
      toast.success(res.message); // "New sweet added!"
      navigate("/");
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to add sweet");
      toast.error(
        "Error: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };
  return (
    <div className="flex flex-col items-center mt-18">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 h-[15rem] w-[30rem] "
      >
        <h1 className="text-center text-xl font-medium">Add Sweets</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          required
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="border-2 rounded-sm p-2"
        />

        <label htmlFor="category">Category</label>
        <select
          required
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="border-2 rounded-sm p-2"
        >
          <option value="">Select a category</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Nut">Nut</option>
          <option value="Milk">Milk</option>
          <option value="Flour">Flour</option>
          <option value="Candy">Candy</option>
          <option value="Pastry">Pastry</option>
        </select>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          required
          min="0"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="border-2 rounded-sm p-2"
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          required
          min="1"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border-2 rounded-sm p-2"
        />

        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
