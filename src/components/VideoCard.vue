<template>
  <v-card
    class="content-bg card mx-auto"
    :max-width="card.maxWidth"
    flat
    tile
    router
    :to="
      video.status != 'processing' || video.status != 'uploading'
        ? `/watch/${video._id}`
        : ''
    "
  >
    <v-img
      :src="
        video.status != 'processing' || video.status != 'uploading'
          ? urlExist(video.thumbnailUrl)
            ? video.thumbnailUrl
            : `${url}/uploads/thumbnails/no-image.jpg`
          : `${url}/uploads/thumbnails/loading.webp`
      "
    >
      <v-row
        v-if="video.status === 'processing' || video.status === 'uploading'"
        class="fill-height ma-0"
        align="center"
        justify="center"
        style="background-color: rgba(0, 0, 0, 0.5)"
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </v-img>
    <v-row no-gutters>
      <v-col cols="auto" v-if="card.type != 'noAvatar'">
        <div class="pl-0 pt-3 pr-3" router :to="`/channels/${channel._id}`">
          <v-avatar v-if="channel.photoUrl !== 'no-photo.jpg'" size="36">
            <v-img
              width="36px"
              height="36px"
              class="elevation-6"
              :src="channel.photoUrl"
            ></v-img>
          </v-avatar>
          <v-avatar v-else color="red" size="36">
            <span class="white--text headline">{{
              channel.channelName.split("")[0].toUpperCase()
            }}</span>
          </v-avatar>
        </div>
      </v-col>
      <v-col>
        <v-card-title
          class="h3 pa-0 mt-3 text-primary subtitle-1 font-weight-bold"
          style="line-height: 1.2rem; margin-bottom: 6px"
        >
          <router-link
            class="text-primary"
            :to="
              video.status != 'processing' || video.status != 'uploading'
                ? `/watch/${video._id}`
                : ''
            "
          >
            <div class="video-title">{{ video.title }}</div>
          </router-link>
        </v-card-title>
        <div>
          <div id="metadata" class="d-flex flex-column flex-wrap">
            <div
              id="byline-container"
              class="d-flex flex-wrap align-center"
              style="
                font-size: 12px;
                line-height: 18px;
                font-weight: 400;
                max-width: 100%;
              "
            >
              <router-link
                class="d-flex flex-row align-center"
                style="max-width: 100%"
                :to="`/channels/${channel._id}`"
              >
                <div class="endpoint">{{ channel.channelName }}</div>
              </router-link>
            </div>
            <div
              id="metadata-line"
              class="d-flex overflow-hidden"
              style="
                font-size: 12px;
                line-height: 18px;
                font-weight: 400;
                max-width: 100%;
                max-height: 36px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                white-space: normal;
              "
            >
              <span class="d-inline-block meta-block"
                >{{ video.views }} views</span
              >
              <span class="d-inline-block">{{
                dateFormatter(video.createdAt)
              }}</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from 'moment'
import { default as _urlExist } from 'url-exist'

export default {
  name: 'VideoCard',
  props: {
    video: {
      type: Object,
      required: true
    },
    channel: {
      type: Object,
      required: true
    },
    card: Object
  },
  data () {
    return {
      url: process.env.VUE_APP_URL
    }
  },
  methods: {
    dateFormatter (date) {
      return moment(date).fromNow()
    },
    urlExist (url) {
      return _urlExist(url)
    }
  }
}
</script>

<style lang="scss">
.video-title {
  font-family: "Roboto", "Arial", sans-serif;
  font-weight: 500;
  max-height: 4rem;
  overflow: hidden;
  display: block;
  -webkit-line-clamp: 2;
  display: box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
}

.endpoint {
  color: #606060;
  &:hover {
    color: #030303;
  }
  &:visited {
    color: #606060;
  }
}

.meta-block {
  &::after {
    content: "•";
    margin: 0 4px;
  }
}
</style>
