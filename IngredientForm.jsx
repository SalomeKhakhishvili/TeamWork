import React, { useState } from 'react';
import '../App.css';

 const API_KEY =  'GnLX-OeliVaHuB42JXBSJIGQrAd-nXuZbE7k3TW0TACIcRw67w'

  const IngredientForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  

  const handleCreate = () => {
    const newIngredient = { 
      name: name.trim(), 
      price: parseFloat(price),
       description: description.trim()
       };
    const response = fetch('/api/v1/ingredients', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${API_KEY}` 
      },
      body: JSON.stringify(newIngredient),
    });
    if (response.ok) {
      const data = response.json();
      setIngredients([...ingredients, data]);
      setName('');
      setPrice('');
      setDescription('');
    }
  };


  return (
    <div className="form-container">
      <input
        className="input"
        type="text"
        placeholder="Ingredient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Price input with Lari symbol */}
      <div className="price-input-container">
        <span className="currency-symbol">₾</span>
        <input
          className="input price-input"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <textarea
        className="textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="button" onClick={handleCreate}>
        Create Ingredient
      </button>
    </div>
  );
};

export default IngredientForm;
