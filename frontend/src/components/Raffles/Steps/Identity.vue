<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="form.data.name"
      :counter="0"
      :rules="nameRules"
      label="Nome Completo"
      required
    />
    <v-text-field v-model="form.data.email" :rules="emailRules" label="" required>
      <template v-slot:label>
        <div>Email <small>(exemplo@cafol.org)</small></div>
      </template>
    </v-text-field>
    <v-text-field v-model="form.data.phone" :rules="phoneRules" required>
      <template v-slot:label>
        <div>Telefone <small>(XX) XXXX-XXXX</small></div>
      </template>
    </v-text-field>
    <v-text-field v-model="form.data.address" label="Endereço" required />

    <v-select
      v-model="form.data.amountValue"
      :items="raffleItems"
      label="Quantidade de rifas"
      required
    >
      <template v-slot:item="{ item, on }">
        <v-list-item v-on="on">
          <v-list-item-content>
            <v-list-item-title>{{ item.value }},00 R$</v-list-item-title>
            <v-list-item-subtitle
              >{{ item.text }} rifa{{
                item.text === 1 ? "" : "s"
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>

    <v-btn color="primary" v-on:click="createIdentity" :disabled="!valid || !dirty">
      Seguir
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "IdentityView",
  data() {
    return {
      valid: false,
      dirty: false,
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) => (v && v.length >= 4) || "Nome tem que ter no mínimo 4 letras",
      ],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail tem que ser válido",
      ],
      phoneRules: [
        (v) => !!v || "Telefone é obrigatório",
        (v) => /^\d+$/g.test(v) || "Telefone deve conter apenas números",
        (v) => v.length >= 10 || "Telefone deve pelo menos 10 números",
      ],
      raffleItems: [...new Array(20)].map((_v, i) => ({
        text: i + 1,
        value: (i + 1) * 15,
      })),

      form: {
        data: {
          name: "",
          email: "",
          phone: "",
          address: "",
          amountValue: 15,
        },
      },
    };
  },
  methods: {
    validate() {
      this.dirty = true;
      this.valid = this.$refs.form.validate();
    },
    async createIdentity() {
      this.$emit("input", this.form.data);
      this.$emit("nextStep");
    },
  },

  watch: {
    "form.data": {
      deep: true,
      handler() {
        this.validate();
      },
    },
  },
};
</script>