<template>
  <v-container fluid>
    <v-layout justify-center style="width: 100%">
      <v-flex sm12 md8 align-self-center>
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
              <Identity v-model="data.user" v-on:nextStep="step = 2" />
            </v-stepper-content>

            <v-stepper-content step="2">
              <Payment
                v-if="step == 2"
                v-model="data.payment"
                :user="data.user"
                v-on:nextStep="step = 3"
              />
            </v-stepper-content>

            <v-stepper-content step="3">
              <Done v-if="step == 3" :user="data.user" />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Identity from "./Steps/Identity";
import Payment from "./Steps/Payment";
import Done from "./Steps/Done";
export default {
  components: { Identity, Payment, Done },
  data() {
    return {
      step: 1,
      user: null,
      data: {
        user: null,
        payment: null,
      },
    };
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
