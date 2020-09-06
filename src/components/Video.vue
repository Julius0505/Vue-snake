<template>
  <div>
    <div class="item">
      <div class="video-page-title">
        Watch Me
      </div>
      <div class="player">
        <iframe
          class="video"
          src="https://www.youtube.com/embed/XGGrF2EjYO0?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <!-- <video-player
          class="vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
        >
        </video-player> -->
      </div>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";

// import { videoPlayer } from "vue-video-player";
export default {
  // components: {
  //   videoPlayer
  // },
  data() {
    return {
      // videojs options
      playerOptions: {
        height: "360",
        autoplay: true,
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            // mp4
            src:
              "https://www.youtube.com/watch?v=XGGrF2EjYO0&autoplay=1&feature=youtu.be"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin: auto;
  max-width: 1200px;
  height: 100%;
  padding-top: 100px;
}
.player {
  border: 5px solid #4eaf33;
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.video-page-title {
  font-size: 36px !important;
  text-align: center;
}
@media screen and (max-width: 1200px) {
  .video-page-title {
    display: none;
  }
  .item {
    padding-top: 48px;
  }
  .player {
    border: none;
  }
}
</style>
