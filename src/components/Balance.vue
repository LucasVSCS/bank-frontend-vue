<template>
  <v-sheet rounded="lg" min-height="140">
    <p class="text-h6 text-center text-uppercase font-weight-black pt-4">
      <v-icon large color="black darken-2">mdi-bank</v-icon>
      Saldo bancário
    </p>
    <v-divider></v-divider>
    <p
      class="
        text-h4 text-center text-uppercase
        font-weight-black
        pt-4
        green--text
      "
    >
      {{ currentBalance }}
    </p>
  </v-sheet>
</template>

<script>
import { formatCurrency } from "@/helpers/helpers.js";

export default {
  name: "Balance",
  props: ["balance"],
  computed: {
    currentBalance() {
      return formatCurrency(this.balance);
    },
  },
};
</script>

