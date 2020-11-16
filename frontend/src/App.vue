<template>
  <v-app>
    <v-main>
      <Raffles/>
    </v-main>
  </v-app>
</template>

<script>
import Raffles from './components/Raffles/Raffles';

export default {
  name: 'App',

  components: { Raffles },

  data: () => ({
    //
  }),
};
</script>
