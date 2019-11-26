import React, { Component } from 'react'
import api from '../../services/api.services'
import apiMap from '../../constants/api.map'

import './Checkout.css'

export default class Checkout extends Component {

    state = {
        amount : 0,
        orderId: null,
        contentTypeId: '5d31a1a2755ca5365cc8d27d',
        projectId: '5d6661b8f51ac761b51a3ddb',
        orderParams: {},
        razorpay: {}
    }

    componentDidMount() {
        try {
            api.get(apiMap.GET_ORDER_DETAILS, {
                contentTypeId: 'type:number',
                projectId    : 'type:number',
            })
                .then(res => this.setState({
                    amount : res.amount,
                    orderId: res.orderId,
                }))
        } catch (error) {
            console.log('Could not fetch orderId')
        }
    }

    handlePayClick = async () => {
        const { orderId, contentTypeId, projectId } = this.state
        /**
         * Method to verify the payment
         *
         * @param {Object} razorpay - the razorpay object containing purchase details
         */
        const razorPayHandler = async (razorpay) => {
            this.setState({razorpay})
            try {
            const paymentStatus = await api.post(apiMap.VALIDATE_ORDER, {}, {
                orderId,
                contentTypeId,
                projectId,
                razorpay,
            });
        
            if (paymentStatus.data.success) {
                alert('success')
            }
            } catch (err) {
            console.error('Could not validate order! Get in touch with support.')
            alert('error')
            }
        }
  
        const orderParams = {
            orderId,
            contentTypeId,
            projectId,
        }
        try {
            let orderResp = await api.post(apiMap.INIT_RP_CHECKOUT, {}, orderParams)
            if (orderResp.data.success) {
                const razorPayOptions = orderResp.data.options
                razorPayOptions.handler = razorPayHandler
        
                const razorPayInstance = new window.Razorpay(razorPayOptions);
                razorPayInstance.open();
            }
          } catch (error) {
            console.error('Something went wrong while fetching order details!')
            alert('error')
          }
    }
    

    render() {
        console.log('State: ', JSON.stringify(this.state, null , 2))
        const {amount} = this.state

        return (
            <div className="wrapper">
                <div className="section">
                    {`contentTypeId: ${this.state.contentTypeId}`}
                    <br/>
                    {`projectId: ${this.state.projectId}`}
                </div>
                <div className="section">
                    {'--------------------------------------|| App State ||--------------------------------------'}
                    <br/>
                    {`state: ${JSON.stringify(this.state, null , 2)}`}
                </div>
                <button className="btn" onClick={this.handlePayClick}>
                    {
                        `Pay ${amount}`
                    }
                </button>
            </div>
        )
    }
}
