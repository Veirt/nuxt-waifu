<template>
  <v-card flat class="py-12">
    <v-card-text>
      <v-row no-gutters>
        <v-col v-for="filter in filters" :key="filter" cols="auto">
          <v-btn-toggle v-model="filtered">
            <v-btn :value="filter">
              {{ filter }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['filters', 'filtered']),
    filtered: {
      get() {
        return this.$store.state.filtered
      },
      set(filter) {
        this.$store.commit('SET_FILTERED', { filter })
      },
    },
  },
  watch: {
    '$store.state.filtered'() {
      this.$store.dispatch('fetchImages', {
        $axios: this.$axios,
        action: 'set',
      })
    },
  },
  created() {
    this.$store.dispatch('fetchFilters', { $axios: this.$axios })
  },
}
</script>
