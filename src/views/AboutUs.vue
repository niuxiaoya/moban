<template>
  <div class="nav-box">
    <div class="about-us mb50 p30 pb50" :style="{minHeight: scrollerHeight}">
      <div class="about-us-tit pb50">联系我们</div>
      <div class="about-us-content">
        <div class="about-us-box mb20">
          <div>公司名称</div>
          <div>北京共信互联科技有限公司</div>
        </div>
        <div class="about-us-box mb20">
          <div>联系电话</div>
          <div>010 - 7878787878</div>
        </div>
        <div class="about-us-box mb20">
          <div>联系邮箱</div>
          <div>bd@gongxinhulian.com</div>
        </div>
        <div class="about-us-box mb20">
          <div>联系地址</div>
          <div>北京市朝阳区望京SOHO T3</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AboutUs",
  data() {
    return {};
  },
  watch: {},
  created() {},
  methods: {},
  computed: {
    scrollerHeight() {
      return window.innerHeight - 540 - 60  + "px";
    }
  },
  components: {}
};
</script> 
<style lang="scss" scoped>
.about-us {
  box-sizing: border-box;
  border: 1px solid #f5f5f5;
  line-height: 24px;
  width: 100%;
  border-radius: 4px;
  transition: border-color 0.5s;
  -moz-transition: border-color 0.5s; /* Firefox 4 */
  -webkit-transition: border-color 0.5s; /* Safari and Chrome */
  -o-transition: border-color 0.5s; /* Opera */
  &:hover {
    border-color: #b1c4fd;
  }
  .about-us-tit {
    text-align: center;
    font-size: 22px;
  }
}
</style>
