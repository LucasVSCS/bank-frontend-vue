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

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            Menu
            <v-img
              src="@/assets/logo-icon.png"
              alt="Capg-bank logo"
              contain
              width="60"
              height="32"
            />
          </v-btn>
        </template>
        <v-list>
          <v-list-item link v-on:click="loggof()">
            <v-list-item-title>Fazer logoff</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <router-view
              @updateBalance="updateBalance"
              @updateTransactionsHistory="updateTransactionsHistory"
              :transactions="this.transactionsData"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <Balance :balance="this.accountData.current_balance || 0" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Balance from "@/components/Balance";
import instance from "@/services/api.js";
import Cookie from "js-cookie";

export default {
  data: () => ({
    activeTab: "/transactions",
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
  methods: {
    getUserData() {
      instance
        .post("user/user-account", null, {
          headers: {
            Authorization: "Bearer " + Cookie.get("_capg-bank_token"),
          },
        })
        .then((response) => {
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
    loggof() {
      instance
        .post("auth/logout", null, {
          headers: {
            Authorization: "Bearer " + Cookie.get("_capg-bank_token"),
          },
        })
        .then((response) => {
          this.$toasted.success(response.data.message);
          Cookie.remove("_capg-bank_token");
          this.$router.push("/login");
        })
        .catch((error) => {
          this.$toasted.error(error.response.data.message);
        });
    },
  },
  created() {
    this.getUserData();
  },
  components: {
    Balance,
  },
};
</script>

