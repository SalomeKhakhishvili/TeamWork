import React, { useState } from 'react';
import '../App.css';

const API_KEY = 'sKjBmGs3LCkGrtPWL5n9LbsMe4gXMYsWo6vWPFb8leMjHn2t_Q';

const IngredientForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleCreate = async (callback) => {
    const parsedPrice = parseFloat(price);
    
  
    if (isNaN(parsedPrice)) {
      console.error('Price must be a valid number.');
      return;
    }

    const newIngredient = {
      name: name.trim(),
      price: parsedPrice,
      description: description.trim(),
    };

    try {
      const response = await fetch('https://crudapi.co.uk/api/v1/ingredients', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(newIngredient),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setIngredients([...ingredients, data]);
      setName('');
      setPrice('');
      setDescription('');

      if (callback) {
        callback(null, data);
      }

    } catch (error) {
      console.error('Error during create ingredient:', error);

      if (callback) {
        callback(error, null);
      }
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
      <button 
        className="button" 
        onClick={() => handleCreate((error, data) => {
          if (error) {
            console.log('Failed to create ingredient:', error.message);
          } else {
            console.log('Ingredient created successfully:', data);
          }
        })}
      >
        Create Ingredient
      </button>
    </div>
  );
};

export default IngredientForm;
