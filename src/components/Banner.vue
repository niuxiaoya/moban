<template>
  <div class="banners">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(i,key) in imgData" :key="key">
        <img :src="i.pic_url" alt="">
        {{i.pic_url}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
  </div>
</template>

<script>
//页面引入swiper
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "banners",
  data() {
    return {
      imgData: [
        {
          pic_url: require("@/assets/img/banner/1.jpg")
        },
        {
          pic_url: require("@/assets/img/banner/2.jpg")
        },
      ],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
    };
  },
  watch: {},
  created() {},
  methods: {},
  computed: {},
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss" scoped>
.banners {
  margin: 80px auto 0;
  width: 100%;
  min-width: 1200px;
  max-width: 1400px;
  .swiper {
    height: 400px;
    width: 100%;
  }
}
</style>