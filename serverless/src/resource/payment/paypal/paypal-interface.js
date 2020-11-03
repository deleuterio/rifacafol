const config = require('../../../shared/config');
/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
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
        return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
    } else {
        return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
    }
}

module.exports = { client };
