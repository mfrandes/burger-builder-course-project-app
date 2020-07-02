import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])] //return an array with a given number of empty elements
                .map((_, i) => {
                    return <BurgerIngredient key={ingKey + i} type={ingKey} />
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []); // we need to reduce the array in order to check if there are ingreidens added at all plain JS array.redice()

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start add ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default withRouter(burger);

// transformedIngredients = is a way to transform a object in to an array of burger ingredients where the value is important fro me to 
// decide how many ingredients we need and the key indicates what ingredient we need this is kewl stuff
