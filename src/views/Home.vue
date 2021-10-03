<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs v-model="activeTab" centered class="ml-n9" color="grey darken-1">
        <v-tab
          v-for="(link, index) in links"
          :key="index"
          :to="{ path: link.route }"
          exact
        >
          {{ link.page }}
        </v-tab>
      </v-tabs>

      <v-img
        src="@/assets/logo-icon.png"
        alt="Capg-bank logo"
        contain
        width="60"
        height="32"
      />
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <router-view
              v-if="isMounted"
              @updateBalance="updateBalance"
              @updateTransactionsHistory="updateTransactionsHistory"
              :transactions="this.transactionsData"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <Balance :balance="this.accountData.current_balance" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Balance from "@/components/Balance";
import instance from "@/services/api.js";

export default {
  data: () => ({
    activeTab: "/transactions",
    isMounted: false,
    links: [
      {
        page: "Página principal",
        route: "/",
      },
      {
        page: "Sacar dinheiro",
        route: "/withdraw-balance",
      },
      {
        page: "Depositar dinheiro",
        route: "/deposit-balance",
      },
    ],
    userData: {},
    accountData: {},
    transactionsData: {},
  }),
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      instance.post("user/user-account").then((response) => {
        this.transactionsData = response.data.accountTransactions;
        this.userData = response.data.userData;
        this.accountData = response.data.userAccount;
      });
    },
    updateBalance(newBalance) {
      this.accountData.current_balance = newBalance;
    },
    updateTransactionsHistory(newTransaction) {
      this.transactionsData.unshift(newTransaction);
    },
  },
  components: {
    Balance,
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

