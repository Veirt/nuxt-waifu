<template>
  <div>
    <v-card flat class="py-12">
      <v-card-text>
        <v-row no-gutters>
          <v-col v-for="filter in filters.sfw" :key="filter" cols="auto">
            <v-btn-toggle v-model="filtered">
              <v-btn :value="filter">
                {{ filter }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col v-for="image in images" :key="image" cols="4">
        <v-img :src="image" aspect-ratio="1" class="grey" position="top">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="#000"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      filters: [{ sfw: [] }],
      filtered: 'waifu',
    }
  },
  methods: {
    filterImages(image) {
      if (!this.images.includes(image)) this.images.push(image)
    },

    async getImages() {
      const res = await this.$axios({
        method: 'POST',
        baseURL: 'https://api.waifu.pics',
        url: `/many/sfw/${this.filtered}`,
        data: {
          exclude: [],
        },
      })
      if (this.filtered) this.images = []
      res.data.files.forEach((image) => this.filterImages(image))
    },

    getNextImages() {
      window.onscroll = async () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          const res = await this.$axios({
            method: 'POST',
            baseURL: 'https://api.waifu.pics',
            url: `/many/sfw/${this.filtered}`,
            data: {
              exclude: [],
            },
          })
          res.data.files.forEach((image) => this.filterImages(image))
        }
      }
    },

    async getFilters() {
      const res = await this.$axios({
        method: 'GET',
        baseURL: 'https://api.waifu.pics',
        url: '/endpoints',
      })

      // Prevent duplicates
      this.filters.sfw = [...new Set(res.data.sfw)]
    },
  },

  created() {
    this.getImages()
    this.getFilters()
  },
  mounted() {
    this.getNextImages()
  },
  watch: {
    filtered() {
      this.getPictures(this.filtered)
    },
  },
}
</script>
