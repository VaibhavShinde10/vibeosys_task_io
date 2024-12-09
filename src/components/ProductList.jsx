import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const ProductList = () => {
  const products = useSelector(state => state.products);

  return (
    <div className='container'>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Total Cost</th>
            <th>Raw Materials</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td><Link to={`/edit/${product.id}`}>{product.name}</Link></td>
              <td>{product.category}</td>
              <td>{product.totalCost}</td>
              <td>{product.materials.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add" className="btn">Add New Product</Link>
    </div>
  );
};

export default ProductList;
