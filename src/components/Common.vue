<template>
  <div class="home">
    <Header />
    <div class="center-box">
      <Banner />
      <div class="content-box">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Common",
  components: {
    Header,
    Banner,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: #fdfdfd;
  .content-box {
    margin: 10px auto 0;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>