import React from 'react';
import IngredientForm from '../components/IngredientForm';

const IngredientsPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Manage Ingredients</h1>
      <IngredientForm />
    </div>
  );
};

const styles = {
  page: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  }
};

export default IngredientsPage;
