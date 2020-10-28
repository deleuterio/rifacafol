<template>
  <div>
    <div>
      <h1 class="title">Rifas</h1>
      <h2 class="subtitle">
        Os números para o sorteio serão enviados após a confirmação de
        pagamento!
      </h2>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.data.name"
          :counter="0"
          :rules="nameRules"
          label="Nome Completo"
          required
        />
        <v-text-field
          v-model="form.data.email"
          :rules="emailRules"
          label="Email"
          required
        />
        <v-text-field v-model="form.data.phone" label="Telefone" required />
        <v-text-field v-model="form.data.address" label="Endereço" required />
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdentityView",
  data() {
    return {
      valid: true,
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) => (v && v.length >= 4) || "Nome tem que ter no mínimo 4 letras",
      ],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail tem que ser válido",
      ],

      form: {
        isValid: false,
        data: {
          name: "Douglas",
          email: "douglaseleuterio@gmail.com",
          phone: "8948949848",
          address: "Rua 1",
        },
      },
    };
  },

  methods: {
    validate() {
      return this.$refs.form.validate();
    },
  },

  watch: {
    form: {
      deep: true,
      handler() {
        this.form.isValid = this.validate();
        console.log(this.validate());
        this.$emit("input", { ...this.form });
      },
    },
  },
};
</script>