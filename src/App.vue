<template>
  <v-app>
    <div class="video-container">
      <video-background
        v-if="$router.currentRoute.name != 'Video'"
        :ended="videoEnded"
        src="SnakeVideo.mp4"
        class="snakeVideo"
        :loop="false"
      >
        <v-fade-transition>
          <v-app-bar
            v-if="videoPlayed"
            transition="fade-transition"
            class="appBar"
            dense
            dark
            :fixed="true"
            ><router-link
              class="noDec"
              to="/"
              v-if="$router.currentRoute.name !== 'Home'"
              >Home
            </router-link>
          </v-app-bar>
        </v-fade-transition>
      </video-background>

      <div class="contantWrapper routerView">
        <router-view></router-view>
      </div>
      <v-fade-transition
        v-if="$router.currentRoute.name == 'Home' && videoPlayed"
      >
        <div class="contantWrapp homeButtonsWrapper">
          <router-link class="routerLink" to="/video">
            <v-btn color="info" class="homeButtons linkBtn">
              Watch Me
            </v-btn>
          </router-link>
          <router-link class="routerLink" to="/info">
          <v-btn color="pink" class="homeButtons linkBtn">
            Read More
          </v-btn>
          </router-link>
          <v-btn color="primary" class="homeButtons">
            <router-link
              class="routerLink"
              to="/
        "
              >Take a closer look</router-link
            >
          </v-btn>
          <router-link class="routerLink" to="/shop">
            <v-btn color="pink" class="homeButtons linkBtn">
              Buy Now
            </v-btn>
          </router-link>
        </div>
      </v-fade-transition>
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import VideoBackground from "vue-responsive-video-background-player";
Vue.component("video-background", VideoBackground);
import VueRouter from "vue-router";
Vue.use(VueRouter);
// import PaymentPage from "./components/PaymentPage";

export default {
  name: "App",
  data() {
    return {
      videoPlayed: false
    };
  },
  components: {
    VideoBackground
  },

  methods: {
    videoEnded() {
      console.log("ended");
    }
  },
  computed: {
    currentRouter() {
      return this.$router.currentRoute.name;
    },
    isVideoPlay() {
      if (this.$router.currentRoute.name != "Video") {
        return true;
      } else return false;
    }
  },
  mounted() {
    setTimeout(() => (this.videoPlayed = true), 0);
  }
};
</script>
<style lang="scss">
body {
  background-color: #121212;
}
.underBar {
  padding-top: 37px;
}
.contantWrapper {
  padding: 50px;
  max-width: 1100px;
  margin: auto;
  height: 100%;
}
.video-container {
  width: 100vw;
  height: 100vh;
}
.snakeVideo {
  width: 100vw;
  height: calc(100vw / 1.78);
  max-height: 100vh;
}
.appBar {
  transition: 2s ease-in-out;
}
.linkBtn {
  width: 100%;
}
.routerLink {
  text-decoration: none;
  color: white !important;
}
.homeButtons {
  height: 60px !important;
}

.homeButtonsWrapper {
  margin: auto;
  padding: 20px;
  max-width: 1100px;
  margin-top: -200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}
@media screen and (max-width: 1100px) {
  .snakeVideo {
    padding-top: 45px;
  }
  .homeButtonsWrapper {
    padding: 30px;
    grid-template-columns: 1fr 1fr;
    margin-top: 50px;
    grid-gap: 40px;
  }
}

@media screen and (max-width: 500px) {
  .underBar {
  }
  .contantWrapper {
    padding-top: 67px;
    padding-left: 0;
    padding-right: 0;
  }

  .homeButtonsWrapper {
    grid-template-columns: 1fr 1fr;
    margin-top: 50px;
    grid-gap: 20px;
    padding: 10px;
  }
  .homeButtons {
    font-size: 11px !important;
  }
}
.routerView {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.noDec {
  text-decoration: none;
}
</style>
