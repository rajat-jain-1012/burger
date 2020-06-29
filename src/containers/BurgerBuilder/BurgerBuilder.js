import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad :20,
    cheese : 25,
    bacon : 30,
    meat : 50,
};


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     };
    // }
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0,
        },
        price : 50,
    };
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]  = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            price : newPrice,
            ingredients : updatedIngredients,
        });
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice - priceReduction;
        this.setState({
            price : newPrice,
            ingredients : updatedIngredients,
        });
    }

    render() {
        const disabledInfo = {
          ...this.state.ingredients,      
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}/>
            </Aux>
        );        
    }
}

export default BurgerBuilder;

