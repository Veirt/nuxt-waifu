<template>
  <div>
    <FilterCard />
    <ImagesDisplay />
  </div>
</template>

<script lang="ts">
export default {
  head() {
    return {
      title: 'Index',
    }
  },

  mounted() {
    this.getNextImages()
  },

  methods: {
    getNextImages() {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.$store.dispatch('fetchImages', { $axios: this.$axios })
        }
      }
    },
  },
}
</script>
