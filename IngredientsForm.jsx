import { useState } from "react";

const IngredientsForm = ({ onFormSubmit }) => {
   const [IngredientsName, setIngredientsName] = useState("");
   const [IngredientsDescription, setIngredientsDescription] = useState("");
   const [Price, setPrice] = useState("");

   const onSubmit = (e) => {
      e.preventDefault(); 
      onFormSubmit(IngredientsName, IngredientsDescription, parseFloat(Price)); 
   };

   return (
      <form onSubmit={onSubmit}>
         <input 
            type="text" 
            placeholder="Ingredients Name" 
            required
            onChange={e => setIngredientsName(e.target.value)}
            name="ingredientsName" 
         />
         <input
            type="text" 
            placeholder="Ingredients Description" 
            required
            onChange={e => setIngredientsDescription(e.target.value)}
            name="ingredientsDescription" 
         />
         <div>
            <input 
               type="number" 
               placeholder="Price"
               value={Price}
               onChange={e => setPrice(e.target.value)}
               name="price" 
            />
            <span>₾</span> 
         </div>
         <button type="submit">Submit</button>
      </form>
   );
};

export default IngredientsForm;
