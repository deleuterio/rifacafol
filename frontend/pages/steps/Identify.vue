<template>
  <div class="container">
    <div>
      <h1 class="title">Rifas</h1>
      <h2 class="subtitle">
        Os números para o sorteio serão enviados após a confirmação de
        pagamento!
      </h2>
      <form class="container">
        <label for="name">Nome Completo</label>
        <input type="text" id="name" v-model="form.name" />

        <label for="email">Email</label>
        <input type="text" id="email" v-model="form.email" />

        <label for="phone">Telefone</label>
        <input type="text" id="phone" v-model="form.phone" />

        <label for="address">Endereço</label>
        <input type="text" id="address" v-model="form.address" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
    };
  },
}
</script>