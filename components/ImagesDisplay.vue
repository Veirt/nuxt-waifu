<template>
  <v-row>
    <v-col v-for="image in images" :key="image" cols="6" sm="6" md="4" lg="4">
      <v-dialog scrollable>
        <template #activator="{ on, attrs }">
          <v-img
            v-bind="attrs"
            :src="image"
            aspect-ratio="1"
            class="grey"
            position="top"
            v-on="on"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="#000"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </template>

        <v-card>
          <img class="image" :src="image" alt="Waifu Image" />
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapState } from 'vuex'
export default {
  computed: mapState(['images']),
  created() {
    this.$store.dispatch('fetchImages', { $axios: this.$axios })
  },
}
</script>

<style scoped>
.image {
  width: 100% !important;
  height: auto !important;
}
</style>
