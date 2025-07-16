import Sweets from "../models/Sweet.js";

export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Enter valid details",
      });
    }

    const existingSweet = await Sweets.findOne({ name, category });

    if (existingSweet) {
      return res.status(409).json({
        success: false,
        message: "Sweet already exists in this category",
      });
    }

    const sweet = await Sweets.create({
      name,
      category,
      price,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "New sweet added!",
      sweet,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while adding sweet",
    });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweets.findById(id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: "Sweet not found",
      });
    }

    await sweet.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Sweet deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting sweet",
    });
  }
};

export const showSweet = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, sortBy, sortOrder } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const sort = {};
    if (sortBy) sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const sweets = await Sweets.find(filter).sort(sort);

    return res.status(200).json({
      success: true,
      sweets,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching sweets",
    });
  }
};

export const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await Sweets.findById(id);
    if (!sweet) {
      return res
        .status(404)
        .json({ success: false, message: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `only ${sweet.quantity} left in stock`,
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    return res.status(200).json({
      success: true,
      message: `${quantity} units purchased`,
      sweet,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Error purchasing sweet",
    });
  }
};

export const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await Sweets.findById(id);

    if (!sweet) {
      return res
        .status(404)
        .json({ success: false, message: "Sweet not found" });
    }

    sweet.quantity += quantity;
    await sweet.save();

    return res.status(200).json({
      success: true,
      message: `${quantity} units restocked`,
      sweet,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Error restocking sweet",
    });
  }
};
