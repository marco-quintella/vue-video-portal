<template>
  <div id="trending">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(video, i) in loading ? 12 : videos"
          :key="i"
          class="mx-xs-auto"
        >
          <v-skeleton-loader
            type="card-avatar"
            class="mx-auto"
            :loading="loading"
            tile
            large
          >
            <video-card
              :video="video"
              :card="{ maxWidth: 350 }"
              :channel="video.userId"
              :key="i"
            />
          </v-skeleton-loader>
        </v-col>
        <v-col class="text-center" v-if="videos.length === 0 && !loading">
          <p>No trending videos yet</p>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="12">
          <infinite-loading @infinite="getVideos">
            <div slot="spinner">
              <v-progress-circular
                indeterminate
                color="red"
              ></v-progress-circular>
            </div>
            <div slot="no-results"></div>
            <span slot="no-more"></span>
            <div slot="error" slot-scope="{ trigger }">
              <v-alert prominent type="error">
                <v-row align="center">
                  <v-col class="grow">
                    <div class="title">Error!</div>
                    <div>
                      Something went wrong, but don’t fret — let’s give it
                      another shot.
                    </div>
                  </v-col>
                  <v-col class="shrink">
                    <v-btn @click="trigger">Take action</v-btn>
                  </v-col>
                </v-row>
              </v-alert>
            </div>
          </infinite-loading>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VideoService from '@/services/VideoService'
import InfiniteLoading from 'vue-infinite-loading'
import { mapGetters } from 'vuex'
import VideoCard from '@/components/VideoCard.vue'

export default {
  name: 'TrendingPage',
  data: () => ({
    loading: false,
    loaded: false,
    errored: false,
    videos: [],
    page: 1
  }),
  computed: {
    ...mapGetters(['currentUser', 'getUrl', 'isAuthenticated'])
  },
  methods: {
    async getVideos ($state) {
      if (!this.loaded) {
        this.loading = true
      }

      const videos = await VideoService.getAll('public', {
        page: this.page,
        sort: '-views'
      })
        .catch((err) => {
          console.log(err)
          this.errored = true
        })
        .finally(() => {
          this.loading = false
        })

      if (typeof videos === 'undefined') return

      if (videos.data.data.length) {
        this.page += 1
        this.videos.push(...videos.data.data)
        $state.loaded()
        this.loaded = true
      } else {
        $state.complete()
      }
    }
  },
  components: {
    InfiniteLoading,
    VideoCard
  }
}
</script>

<style lang="scss">
.v-skeleton-loader__list-item-avatar-three-line {
  height: 250px;
  .v-skeleton-loader__paragraph.v-skeleton-loader__bone {
    margin-top: -125px;
    @media (max-width: 700px) {
      display: none;
      margin-top: inherit;
    }
  }
  .v-skeleton-loader__avatar {
    height: 200px !important;
    width: 300px !important;
  }
  .v-skeleton-loader__text {
    height: 20px;
  }
}
</style>
