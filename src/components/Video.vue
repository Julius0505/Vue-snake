<template>
  <div class="video-page-wrapper">
    <div class="item">
      <div class="video-page-title">
        Watch me <br>
      </div>
      <div class="player">
        <!-- <iframe
          class="video"
          src="https://www.youtube.com/embed/DU2-LcdlqNM?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
        <iframe  class="video" src="https://www.youtube-nocookie.com/embed/SVeEzhb_rQc?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
.video-page-wrapper {
  height:  calc(100vh - 290px);
}
.item {
  margin: 10px auto 0px;
  max-width: calc((100vh - 340px)*1.777);
  /* height: 100%; */
 max-height:  calc(100vh - 340px);
}
.video-page-title br{
  display: none;
}
.player {
  position: relative;
  /* width: 1100px; */
  padding-bottom: 50.25%;
  /* max-height: 60%; */
  margin:auto;
  /* padding-bottom: 10px; */
  /* margin-bottom: 100px; */
}
.video {
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
@media screen and (max-width: 1200px) {
 
  .item {
    padding-top: 0px;
  }
  .player {
    border: none;
  }
}
@media screen and (max-width: 1100px){
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
  .video{
    height: 100%;
  }
}
@media screen and (max-width: 768px){
  .player{
   margin-bottom: 30px;
  }
}

@media screen and (max-width: 680px){
  .video-page-title br{
    display: block;
  }
  .video-page-title {
    margin: 0px auto 5px;
  }
  .player{
    width: 90%;
    margin-top: 20px;
  }
}

@media screen and (max-width: 500px){
  .item{
    margin-top: 0px;
  }
}
</style>
