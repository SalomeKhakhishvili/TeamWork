import { useState } from 'react';
import './App.css';
import IngredientsForm from './components/IngredientsForm';

const API_KEY = 'NHeb4sjXvNrHFq4eS06DJPPKgQzyge9kS-qg1mTdcbIPj6ZeAg';

function App() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getIngredients = () => {
    setLoading(true);
    setError(null);
    fetch('/api/v1/ingredientsform', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch ingredients");
        return res.json();
      })
      .then(data => {
        setIngredientsList(data.items.map(ingredient => ({
          IngredientsName: ingredient.IngredientsName,
          IngredientsDescription: ingredient.IngredientsDescription,
          Price: ingredient.Price,
          id: ingredient._uuid
        })));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFormSubmit = (IngredientsName, IngredientsDescription, Price) => {
    if (Price <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    fetch('/api/v1/ingredientsform', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify([{ IngredientsName, IngredientsDescription, Price }])
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add ingredient");
        return res.json();
      })
      .then(data => {
        const firstItem = data.items[0];
        const newIngredient = {
          IngredientsName: firstItem.IngredientsName,
          IngredientsDescription: firstItem.IngredientsDescription,
          Price: firstItem.Price,
          id: firstItem._uuid
        };
        setIngredientsList(prev => [...prev, newIngredient]);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <IngredientsForm onFormSubmit={onFormSubmit} />
          <button onClick={getIngredients}>Get Ingredients</button>
          {ingredientsList.map(ingredient => (
            <div key={ingredient.id}>
              <h3>{ingredient.IngredientsName}</h3>
              <h3>{ingredient.IngredientsDescription}</h3>
              <h3>{ingredient.Price} ₾</h3> 
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
