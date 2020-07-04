import React , {Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        name : '',
        email :'',
        address :{
            street : '',
            postalCode : ''
        },
        loading :false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({
            loading:true,
        });
        const order = {
            ingredients : this.state.ingredients,
            price : this.props.price,
            customer : {
                name : 'Rajat',
                address : {
                    street : 'Kala pathar road',
                    code : '201210',
                    country : 'india'
                },
                email : 'test@testmail'                
            },
            deliveryMethod : 'fastest',
        };
        axios.post('/orders.json', order)
              .then( response => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
              }
              ).catch(error => {
                this.setState({
                    loading: false,
                });
              });
    }

    render() {

        let form = (
            <form>
                <input className = {classes.Input} type = "text" name = "name" placeholder= "Your Name"/>
                <input className = {classes.Input} type = "email" name = "email" placeholder= "Your email"/>
                <input className = {classes.Input} type = "text" name = "street" placeholder= "Street"/>
                <input className = {classes.Input} type = "text" name = "postal" placeholder= "Postalcode"/>
                <Button btnType = "Success" clicked = {this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }


}

export default ContactData;