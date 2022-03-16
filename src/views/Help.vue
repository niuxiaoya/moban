<template>
  <div class="nav-box">
    <div class="help mt10 mb50 pb30">
      <div class="help-left" :style="{minHeight: scrollerHeight}">
        <div>问题分类</div>
        <div
          v-for="(i,key) in helpList"
          :key="key"
          @click="helpThreeNewsCnange(key)"
        >{{i.twoTitleName}}</div>
      </div>
      <div class="help-right help-right-box1">
        <div v-for="(i,key) in list" :key="key" class="p20 help-box-content-item pb40">
          <span>Q: {{i.newIntroduction}}</span>
          <div>
            A:
            <span v-html="decodeURIComponent(i.newsContent)"></span>
          </div>
        </div>
        <div
          v-if="!list.length"
          style="text-align: center"
          :style="{lineHeight: scrollerHeight,height:scrollerHeight}"
        >暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHelpList } from "@/api/common";
export default {
  name: "Help",
  data() {
    return {
      helpList: [],
      list: []
    };
  },
  watch: {},
  created() {
    this.getHelpList();
  },
  methods: {
    getHelpList() {
      const loading = this.$loading({
        look: true,
        text: "Loading",
        spinner: "el-icon-loading",
        target: document.querySelector(".content-box")
      });
      getHelpList()
        .then(res => {
          this.helpList = res.data;
          // this.helpList = [];
          this.list = this.helpList[0]["helpThreeNews"];
          loading.close();
        })
        .catch(res => {
          loading.close();
        });
    },
    helpThreeNewsCnange(key) {
      this.list = this.helpList[key]["helpThreeNews"];
    }
  },
  computed: {
    scrollerHeight() {
      return window.innerHeight - 540 - 82 -  20 + "px";
    }
  },
  components: {}
};
</script> 
<style lang="scss" scoped>
.help {
  display: flex;
  width: 100%;
  .help-left {
    background: #fff;
    width: 200px;
    border: 1px solid #f5f5f5;
    line-height: 24px;
    // min-height: 300px;
    border-radius: 4px;
    transition: border-color 0.5s;
    -moz-transition: border-color 0.5s; /* Firefox 4 */
    -webkit-transition: border-color 0.5s; /* Safari and Chrome */
    -o-transition: border-color 0.5s; /* Opera */
    &:hover {
      border-color: #b1c4fd;
    }
    & > div {
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      background: #fefefe;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        line-height: 50px;
        background: #f9f9f9;
        color: #999;
      }
    }
  }
  .help-right {
    max-height: 900px;
    flex: 1;
    overflow-y: auto;
    margin: 0 auto;
  }
}
</style>
<style lang="scss">
.help-right {
  .help-box-content-item {
    img {
      // width: 60% !important;
      object-fit: cover;
      text-align: center;
      padding: 0 150px;

      box-sizing: border-box;
    }
  }
}
</style>
