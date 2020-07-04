import React , {Component} from 'react'; 
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients : null,
        price : 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let params of query.entries()) {
            //['salad', '1'] format this is 
            if(params[0] === 'price') {
                price = params[1];
            }
            else {
                ingredients[params[0]] = +params[1];
            }
            
        }
        this.setState({
            ingredients : ingredients,
            price : price,
        });
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                                  checkoutCancel = {this.checkoutCancelled}
                                  checkoutContinue = {this.checkoutContinued}/>
                <Route path = {this.props.match.path + '/contact-data'} render = {(props) => (<ContactData price = {this.state.price} 
                                                                                ingredients = {this.state.ingredients}
                                                                                {...props}/>)}/> 
                {/* can use url also */}
            </div>
        );
        
    }
}

export default Checkout;