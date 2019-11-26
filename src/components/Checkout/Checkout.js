import React, { Component } from 'react'
import api from '../../services/api.services'

import './Checkout.css'

export default class Checkout extends Component {

    state = {
        amount : 0,
        orderId: null,
    }

    componentDidMount() {
        api.get('URL to get amount initially', {
            contentTypeId: 'type:number',
            projectId    : 'type:number',
        })
            .then(res => this.setState({
                amount : res.amount,
                orderId: res.orderId,
            }))
    }
    

    render() {
        const {amount} = this.state

        return (
            <div>
                <button>
                    {
                        `Pay ${amount}`
                    }
                </button>
            </div>
        )
    }
}
