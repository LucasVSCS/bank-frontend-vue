<template>
  <v-sheet rounded="lg">
    <p class="text-h6 text-center text-uppercase font-weight-black pt-4">
      <v-icon large color="black darken-2">mdi-history</v-icon>
      Últimas transações
    </p>
    <v-divider />
    <v-data-table
      :headers="headers"
      :items="transactionsHistory"
      item-key="code"
      class="elevation-1"
    />
  </v-sheet>
</template>

<script>
import moment from "moment";
import { formatCurrency } from "@/helpers/helpers.js";

export default {
  name: "Balance",
  props: ["transactions"],
  computed: {
    transactionsHistory() {
      if (Object.keys(this.transactions).length) {
        return this.transactions.map((transaction) => ({
          ...transaction,
          transaction_type_id:
            transaction.transaction_type_id == 1 ? "Depósito" : "Saque",
          amount: formatCurrency(transaction.amount),
          last_balance: formatCurrency(transaction.last_balance),
          postdate: moment(transaction.postdate).format("LLL"),
        }));
      } else {
        return [this.transactions];
      }
    },
  },
  data() {
    return {
      headers: [
        { text: "Tipo transação", value: "transaction_type_id" },
        { text: "Valor", value: "amount" },
        { text: "Novo saldo", value: "last_balance" },
        { text: "Data", value: "postdate" },
        { text: "Descricão", value: "description" },
      ],
    };
  },
};
</script>
