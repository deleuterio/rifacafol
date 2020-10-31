<template>
  <v-app>
    <v-main>
      <v-container>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">
              Identificação
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2">
              Pagamento
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> Números </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <Identity v-model="form" />
              <v-btn
                color="primary"
                v-on:click="createIdentity"
                :disabled="!form.isValid"
              >
                Seguir
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <Payment />

              <v-btn color="primary" @click="step = 3"> Continue </v-btn>

              <v-btn text> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn color="primary" @click="step = 1"> Continue </v-btn>

              <v-btn text> Cancel </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Identity from "./steps/Identity";
import Payment from "./steps/Payment";
export default {
  components: { Identity, Payment },
  data() {
    return {
      step: 1,
      form: {
        valid: false,
        data: {},
      },
      data: {
        user: null,
      },
    };
  },
  methods: {
    async createIdentity() {
      this.user = await this.$axios.post('/user', { ...this.form.data });
      this.step = 2;
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
