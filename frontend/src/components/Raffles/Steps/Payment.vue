<template>
  <div>
    <div id="paypal" style="margin-top: 15px" />
  </div>
</template>

<script>
import { request } from "../../../plugins/request";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      payment: null,
    };
  },
  mounted() {
    const user = { ...this.user };
    // Render the PayPal button into #paypal-button-container
    window.paypal
      .Buttons({
        // Call your server to set up the transaction
        createOrder: async () => {
          const { data } = await request.post("/payment/order", { ...user, amountValue: user.quantity * 5 });
          const { order } = data;
          this.$emit('input', order);
          return order.id;
        },

        // Call your server to finalize the transaction
        onApprove: () => {
          this.$emit('nextStep');
        },
      })
      .render("#paypal");
  },
};
</script>