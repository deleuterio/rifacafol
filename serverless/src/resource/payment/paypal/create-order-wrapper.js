// 1. Set up your server to make calls to PayPal

// 1a. Import the SDK package
const paypal = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const PaypalClient = require('./paypal-interface');

class CreateOrder extends PaypalClient {
    // 2. Set up your server to receive a call from the client
    async handler({ amountValue }) {
        // 3. Call PayPal to set up a transaction
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'BRL',
                        value: amountValue,
                    },
                },
            ],
        });
        
        // 5. Return a successful response to the client with the order ID
        const { result: order } = await this.paypalClient.execute(request);

        return order;
    }
}

module.exports = CreateOrder;
