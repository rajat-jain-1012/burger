import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const orderSummary  = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
        return (<li key = {igKey}><strong><span>{igKey}</span></strong> : {props.ingredients[igKey] }</li>);
    });
    return ( 
        <Aux>
            <h3>Your Order</h3>
            <p>Enjoy your Meal</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
};

export default orderSummary;