const config = require('../../../shared/config');
/**
 *
 * PayPal Node JS SDK dependency
 */
const paypal = require('@paypal/checkout-server-sdk');


class PaypalClient {
    /**
     * @constructor
     * Returns PayPal HTTP client instance with environment that has access
     * credentials context. Use this instance to invoke PayPal APIs, provided the
     * credentials have access.
     */
    constructor() {
        this.paypalClient = new paypal.core.PayPalHttpClient(environment());
    }
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {
    let clientId = config.PAYPAL_CLIENT_ID;
    let clientSecret = config.PAYPAL_CLIENT_SECRET;

    if (config.NODE_ENV === 'production') {
        return new paypal.core.LiveEnvironment(clientId, clientSecret);
    } else {
        return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }
}

module.exports = PaypalClient;
