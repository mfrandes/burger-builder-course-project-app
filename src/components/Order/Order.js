import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = []
    for (let ingName in props.ingredinets) {
        ingredients.push({ name: ingName, amount: props.ingredinets[ingName] });
    }

    const ingredientOutput = ingredients.map(ingredient => (
        <span 
        key={ingredient.name} 
        style={{
            textTransform: 'capitalize', 
            displai: 'inline-block', 
            margin: '0.8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
        >{ingredient.name} ({ingredient.amount})</span>
        
    ));
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)} </strong></p>
        </div>
    )
};

export default order;