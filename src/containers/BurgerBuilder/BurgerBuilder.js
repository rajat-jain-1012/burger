import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        purchasable : false,
        purchasing : false,
        loading : false,
    };
    
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        },0);          
        this.setState({
            purchasable : sum > 0, 
        });
    }   

    //craetes an array of strings keys ie salad, bacon....


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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true,
        });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }
    //sending data to firebase with fixed user data
    purchaseContinueHandler = () => {
        // alert('Burger Ordered Succesfully');
        this.setState({
            loading:true,
        });
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.price,
            customer : {
                name : 'Rajat',
                address : {
                    street : 'Kala pathar road',
                    code : '201210',
                    country : 'india'
                },
                email : 'test@testmail'                
            },
            delievryMethod : 'fastest',
        };
        axios.post('/orders.json', order)
              .then( response => {
                this.setState({
                    loading: false,
                    purchasing : false,
                });
              }
              ).catch(error => {
                this.setState({
                    loading: false,
                    purchasing : false,
                });
              });

    }

    render() {
        const disabledInfo = {
          ...this.state.ingredients,      
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary ingredients = {this.state.ingredients}
        purchaseCancelled = {this.purchaseCancelHandler}
        purchaseDone = {this.purchaseContinueHandler}
        price  = {this.state.price}/>;

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (

            <Aux>
                <Modal show  = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}
                price = {this.state.price}/>
            </Aux>
        );        
    }
}

export default BurgerBuilder;

