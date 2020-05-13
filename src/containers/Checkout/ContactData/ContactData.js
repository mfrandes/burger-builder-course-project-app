import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            posatalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Mircea Frandes',
                address: {
                    street: 'moonstreet 26',
                    zip: '556222'
                },
                email: 'test@test.com',
                delliverMethod: 'Drone'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false });

                console.log(error)
            });
    }

    render() {
        const form = this.state.loading ? <Spinner /> : (
            <form>
                <Input inputType="input" type='text' name='name' placeholder='Your name' />
                <Input inputType="input" type='email' name='email' placeholder='Your email' />
                <Input inputType="input" type='text' name='street' placeholder='Your street' />
                <Input inputType="input" type='text' name='postCode' placeholder='Your moom' />
                <Button clicked={this.orderHandler} btnType='Success'>ORDER</Button>
            </form>
        );
        return (
            <div className={classes.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;