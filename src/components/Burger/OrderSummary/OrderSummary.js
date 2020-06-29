import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

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
            <Button btnType = "Success" clicked = {props.purchaseDone}>Continue</Button>
            <Button btnType = "Danger"  clicked = {props.purchaseCancelled}>Cancel</Button>
        </Aux>
    );
};

export default orderSummary;