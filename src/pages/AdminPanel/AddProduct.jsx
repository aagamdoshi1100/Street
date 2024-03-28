import React, { useState } from "react";
import { API_URL } from "../../constants";

function AddProduct() {
  const [formData, setFormData] = useState({
    Name: "",
    Price: "",
    Rating: "",
    Quantity: "",
    Discount: "",
    Category: "",
    Return_Policy: false,
    About: "",
  });

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addProductResponse = await fetch(`${API_URL}/products/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await addProductResponse.json();
      if (!addProductResponse.ok) {
        throw resData;
      } else {
        console.log(resData);
        setFormData({
          Name: "",
          Price: "",
          Rating: "",
          Quantity: "",
          Discount: "",
          Return_Policy: false,
          About: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(formData);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="Price">Price:</label>
        <input
          type="number"
          id="Price"
          name="Price"
          value={formData.Price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Rating">Rating:</label>
        <input
          type="number"
          id="Rating"
          name="Rating"
          value={formData.Rating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Quantity">Quantity:</label>
        <input
          type="number"
          id="Quantity"
          name="Quantity"
          value={formData.Quantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Discount">Discount:</label>
        <input
          type="number"
          id="Discount"
          name="Discount"
          value={formData.Discount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Category">Category:</label>
        <select
          id="Category"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
        >
          <option value={"Electronics"}>Electronics</option>
          <option value={"FootWear"}>Foot Wear</option>
        </select>
      </div>
      <div>
        <label htmlFor="Return_Policy">Return Policy:</label>
        <input
          type="checkbox"
          id="Return_Policy"
          name="Return_Policy"
          checked={formData.Return_Policy}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="About">About:</label>
        <textarea
          id="About"
          name="About"
          value={formData.About}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddProduct;
