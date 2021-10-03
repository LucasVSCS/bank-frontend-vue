<template>
  <v-sheet rounded="lg" min-height="40vh">
    <p class="text-h6 text-center text-uppercase font-weight-black pt-4">
      <v-icon large color="black darken-2">mdi-cash</v-icon>
      Depositar saldo
    </p>
    <v-divider />
    <v-row align="center" justify="center" class="pt-12">
      <v-col cols="12" sm="9">
        <validation-observer ref="observer">
          <v-form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="depositAmount"
              rules="required|double|greaterThanZero"
            >
              <v-text-field-money
                v-model="depositAmount"
                label="Digite o valor do depósito"
                name="depositAmount"
                :error-messages="errors"
                v-bind:properties="{
                  prefix: 'R$',
                  readonly: false,
                  disabled: false,
                  outlined: true,
                  clearable: true,
                  placeholder: ' ',
                }"
                v-bind:options="{
                  locale: 'pt-BR',
                  length: 10,
                  precision: 2,
                  empty: null,
                }"
                required
              />
            </validation-provider>
            <v-btn
              type="submit"
              class="rounded-0"
              color="#000000"
              x-large
              block
              dark
              >Realizar depósito</v-btn
            >
          </v-form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-sheet>
</template>


<script>
import { required, double } from "vee-validate/dist/rules";
import {
  extend,
  ValidationProvider,
  setInteractionMode,
  ValidationObserver,
} from "vee-validate";

import instance from "@/services/api.js";
import Cookie from "js-cookie";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} não pode ser vazio.",
});

extend("double", {
  ...double,
  message: "Preencha um valor válido.",
});

extend("greaterThanZero", {
  getMessage: (field) => field + " o valor do deposito não pode ser R$ 0.",
  validate: (value) => {
    if (value > 0) return true;
    return false;
  },
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    depositAmount: null,
  }),
  computed: {
    params() {
      return {
        depositAmount: this.depositAmount,
      };
    },
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();

      if (valid) {
        instance
          .post("account/deposit-balance", JSON.stringify(this.params), {
            headers: {
              Authorization: "Bearer " + Cookie.get("_capg-bank_token"),
            },
          })
          .then((response) => {
            if (response.data.newBalance) {
              this.$toasted.success(response.data.message);
              this.$emit("updateBalance", response.data.newBalance);
              this.$emit(
                "updateTransactionsHistory",
                response.data.transactionData
              );
              this.clear();
            } else {
              this.$toasted.error(response.data.message);
            }
          })
          .catch((error) => {
            this.$toasted.error(error.response.data.message);
          });
      }
    },
    clear() {
      this.depositAmount = 0;
      this.$refs.observer.reset();
    },
  },
};
</script>
