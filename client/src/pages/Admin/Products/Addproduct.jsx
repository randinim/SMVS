import React, { useState } from 'react';
import axios from 'axios';
import ResponsiveDrawer from "../../Layout/Drawer";

function AddProduct() {
  const initialProductState = {
    name: '',
    brand: '',
    model: '',
    price: '',
    stock: '',
    description: ''
  };

  const [product, setProduct] = useState(initialProductState);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/products/add', product);
      console.log(response.data); // Assuming you want to log the response
  
      // Optionally, you can redirect or show a success message here
      setProduct(initialProductState); // Reset form fields after successful submission
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error state or display an error message
    }
  };
  

  return (
    <div>
       <ResponsiveDrawer>
      <section className="bg-white light:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 light:text-light">Add a new product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 light:text-light">Product Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={handleChange}
                  className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div>
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 light:text-light">Brand</label>
                <select
                  id="brand"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-primary-500 light:focus:border-primary-500"
                  required
                >
                  <option value="">Select brand</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Mazda">Mazda</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 light:text-light">Model</label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  value={product.model}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-primary-500 light:focus:border-primary-500"
                  placeholder="Product Model"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 light:text-light">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-primary-500 light:focus:border-primary-500"
                  placeholder="Rs. 3000"
                  required
                />
              </div>
              <div>
                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 light:text-light">Stock</label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-primary-500 light:focus:border-primary-500"
                  placeholder="12"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 light:text-light">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  value={product.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-primary-500 light:focus:border-primary-500"
                  placeholder="Your description here"
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-bold text-center text-white bg-primary rounded-lg"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
      </ResponsiveDrawer>
    </div>
  );
}

export default AddProduct;
