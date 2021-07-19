<template>
  <div class="video-page-wrapper">
    <div class="item">
      <div class="video-page-title">Watch me <br /></div>
      <div class="player">
        <!-- <iframe
          class="video"
          src="https://www.youtube.com/embed/DU2-LcdlqNM?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
        <iframe
          class="video-player"
          :src="currentVideoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="video-list-wrapper">
        <div class="video-list">
          <div v-for="(video, index) in videos" :key="index">
            <div class="flex flex-row gap-4 mt-4" @click="videoPlay(index)">
              <div class="flex-1 video-clip">
                <div class="wrapper">
                  <video
                    controls="false"
                    class="video-thumbnail"
                    autoplay="autoplay"
                  >
                    <!-- <source :src="video.url" type="video/mp4"> -->
                    <source :src="video.url" type="video/mp4" />
                  </video>
                  <div class="playpause"></div>
                </div>
              </div>
              <div class="flex-1 video-content">
                <div class="video-title">
                  {{ video.title }}
                </div>
                <div class="video-description">
                  {{ video.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import axios from "axios";

// import { videoPlayer } from "vue-video-player";
export default {
  // components: {
  //   videoPlayer
  // },
  data() {
    return {
      urlVar: "exchange.snakeomatic.com",
      videos: [],
      currentVideoUrl: "",
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
  },
  created() {
    let hostname = window.location.hostname;
    if (hostname != "localhost") {
      this.urlVar = `exchange.${hostname}`;
    }
    this.getVideos();
  },
  methods: {
    getVideos: async function() {
      try {
        const vs = await axios.get(`https://${this.urlVar}/web/videos`);
        this.videos = vs.data;
        if (vs.data.length) {
          this.currentVideoUrl = vs.data[0].url;
        }
      } catch (err) {
        console.log(err);
        this.$router.push("/not-there");
      }
    },
    videoPlay: function(index) {
      console.log(this.videos[index].url);
      this.currentVideoUrl = this.videos[index].url;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: "McLaren", "sans-serif" !important;
}
.routerView {
  top: 50px !important;
}
.video-page-wrapper {
  // margin-top: -40px;
  // height: calc(100vh - 290px);
}
.item {
  margin: 10px auto 0px;
  max-width: calc((100vh - 340px) * 1.777);
  /* height: 100%; */
  // max-height: calc(100vh - 340px);
}
.video-page-title br {
  display: none;
}
.player {
  position: relative;
  /* width: 1100px; */
  padding-bottom: 50.25%;
  /* max-height: 60%; */
  margin: auto;
  /* padding-bottom: 10px; */
  /* margin-bottom: 100px; */
}
.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border: 5px solid #4eaf33;
}
.video-page-title {
  font-size: 34px !important;
  text-align: center;
  margin-bottom: 27px;
}
/* Begin Video List Style */
.video-list-wrapper {
  padding: 10px 0px 10px 10px;
  margin: 10px 0px;
  background-color: rgba(0, 0, 0, 0.8);
  border: solid 1px;
  border-color: #1e1e1e;
}
.video-title {
  font-size: 18px;
  color: #4eaf33;
  text-align: center;
  padding: 3px;
}
.video-description {
  font-size: 16px;
}
.video-list {
  height: 180px;
  overflow-y: auto;
}
.video-thumbnail::-webkit-media-controls {
  position: absolute;
  display: none;
  border-radius: 10px;
  display: block;
}
.video-clip {
  width: 40%;
}
.video-content {
  margin-right: 10px;
  width: 60%;
  word-wrap: break-word;
}
.wrapper {
  display: table;
  width: auto;
  position: relative;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.playpause {
  background: url("../assets/video_btn.svg") no-repeat;
  width: 50%;
  height: 50%;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  margin: auto;
  background-size: contain;
  background-position: center;
  opacity: 80%;
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.8);
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #555;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #222;
}
/* End Video List Style*/
@media screen and (max-width: 1200px) {
  .item {
    padding-top: 0px;
  }
  .player {
    border: none;
  }
}
@media screen and (max-width: 1100px) {
  .video-page-title {
    font-size: 32px;
    max-width: 400px;
    margin: 60px auto 25px;
    line-height: 37px;
  }
  .player {
    margin-top: 60px;
    width: 100%;
  }
  .video-player {
    height: 100%;
  }
}
@media screen and (max-width: 768px) {
  .player {
    margin-bottom: 30px;
  }
  .wrapper {
    width: 80%;
  }
}

@media screen and (max-width: 680px) {
  .video-page-title br {
    display: block;
  }
  .video-page-title {
    margin: 0px auto 5px;
  }
  .player {
    width: 90%;
    margin-top: 20px;
  }
  .wrapper {
    width: 90%;
  }
  .video-title {
    font-size: 14px;
  }
  .video-description {
    font-size: 12px;
  }
}

@media screen and (max-width: 500px) {
  .item {
    margin-top: 0px;
  }
}

// @media screen and (max-height: )
</style>
