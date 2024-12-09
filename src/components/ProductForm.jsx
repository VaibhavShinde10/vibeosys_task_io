import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ initialData = {}, isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: initialData.id || Date.now(),
    name: initialData.name || '',
    category: initialData.category || 'Finished',
    expiry: initialData.expiry || '',
    materials: initialData.materials || [],
    totalCost: initialData.totalCost || 0,
  });

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...product.materials];
    updatedMaterials[index][field] = value;
    if (field === 'quantity' || field === 'price') {
      updatedMaterials[index].totalPrice = updatedMaterials[index].quantity * updatedMaterials[index].price;
      updatedMaterials[index].tax = updatedMaterials[index].totalPrice * 0.1;
      updatedMaterials[index].totalAmount = updatedMaterials[index].totalPrice + updatedMaterials[index].tax;
    }
    setProduct({ ...product, materials: updatedMaterials });
  };

  const calculateTotalCost = () => {
    return product.materials.reduce((sum, mat) => sum + mat.totalAmount, 0);
  };

  const handleSubmit = () => {
    const totalCost = calculateTotalCost();
    const updatedProduct = { ...product, totalCost };
    isEdit ? dispatch(updateProduct(updatedProduct)) : dispatch(addProduct(updatedProduct));
    navigate('/');
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit' : 'Add'} Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <select
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      >
        <option>Finished</option>
        <option>Semi finished</option>
        <option>Subsidiary</option>
      </select>
      <input
        type="date"
        value={product.expiry}
        onChange={(e) => setProduct({ ...product, expiry: e.target.value })}
      />
      <h2>Materials</h2>
      {product.materials.map((material, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Material Name"
            value={material.name || ''}
            onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={material.quantity || 0}
            onChange={(e) => handleMaterialChange(index, 'quantity', +e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={material.price || 0}
            onChange={(e) => handleMaterialChange(index, 'price', +e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => setProduct({ ...product, materials: [...product.materials, {}] })}>
        Add Material
      </button>
      <button onClick={handleSubmit}>Save Product</button>
    </div>
  );
};

export default ProductForm;
