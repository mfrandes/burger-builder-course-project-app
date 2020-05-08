import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])] //return an array with a given number of empty elements
                .map((_, i) => {
                    return <BurgerIngredient key={ingKey + i} type={ingKey} />
                });
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;

// transformedIngredients = is a way to transform a object in to an array of burger ingredients where the value is important fro me to 
// decide how many ingredients we need and the key indicates what ingredient we need this is kewl stuff
