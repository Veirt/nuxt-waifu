<template>
  <v-card flat class="py-12">
    <v-card-text>
      <v-btn-toggle mandatory v-model="filtered">
        <v-row no-gutters>
          <v-col v-for="filter in filters" :key="filter" cols="auto">
            <v-btn outlined aria-label="Filter Buton" :value="filter">
              {{ filter }}
            </v-btn>
          </v-col>
        </v-row>
      </v-btn-toggle>
    </v-card-text>
  </v-card>
</template>

<script>
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
