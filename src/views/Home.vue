<template>
  <div class="nav-box">
    <div class="left mr10">
      <div class="bg_white box-card info-box mb20">
        <div class="info-blue info-blue-botom">
          <span>融资动态</span>
        </div>
        <div class="detail-box-info mt10">
          <div class="list pl30">
            <div class="list-list-parent pr30">
              <div class="info-list mt20 mr10" v-for="(i,key) in loanRecordList" :key="key">
                <div class="info-list-item">
                  <icon class="iconfont icon-xunzhang orange_color font_22 mr10"></icon>
                  <span>{{i.companyName}}申请</span>
                  <span class="red_color" v-if="i.loanStatus == '正常'">授信成功</span>
                </div>
                <div style="color: #6e6d6d">{{i.createTime}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg_white box-card detail-img-box p10 mb10">
        <div class="info-blue">
          <span>我要融资</span>
          <b class="pl30">简单几步，快速申请，助您快速融资成功</b>
        </div>
        <div style="margin: 54px;text-align:cennter;padding-bottom:2px">
          <img src="@/assets/img/hzsj/financing_img.png" alt style="height: 200px;width: 874px" />
        </div>
      </div> 
      <div class="bg_white box-card detail-mechanism-box p10 mb10">
        <div class="info-blue">
          <span>合作融资机构</span>
        </div>
        <div class="img-jg">
          <div class="pt20 pb20" v-for="(i,key) in imgData" :key="key">
            <img :src="i.pic_url" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="bg_white box-card login-box p10 mb10 mt50">
        <div class="login-menu">
          <div class="help-box-title">
            <div class="help-box-title-tit">公告与动态</div>
            <span style="cursor: pointer" @click="$router.push('/home/about')">更多>></span>
          </div>

          <div class="help-box-content login-box-content">
            <div class="help-box-scroll" style>
              <div class="help-box-detail">
                <div v-for="(i,key) in newsList" :key="key" class="p20 help-box-content-item">
                  <div style="display: flex; justify-content: space-between;padding-bottom: 10px">
                    <span style="font-size: 16px">{{i.newsTitle}}</span>
                    <span style="color: #6e6d6d">{{getData(i.createTime)}}</span>
                  </div>
                  <div>{{i.newIntroduction}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg_white box-card help-box p10 mb10 mt10" style="padding-bottom: 0">
        <div class="help-box-title">
          <div class="help-box-title-tit">帮助中心</div>
          <span style="cursor: pointer" @click="$router.push('/home/help')">更多>></span>
        </div>
        <div class="help-box-content">
          <div class="help-box-scroll" style>
            <div class="help-box-detail">
              <div v-for="(i,key) in helpList" :key="key" class="p20 help-box-content-item">
                <span>Q: {{i.newIntroduction}}</span>
                <div>
                  A:
                  <span v-html="decodeURIComponent(i.newsContent)"></span>
                </div>
              </div>
            </div>
            <img
              src="@/assets/img/hzsj/kf.jpg"
              style="height: 100px;object-fit: cover;"
              class="mt10"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLoanRecordList,
  getToken,
  getHelpThreeList,
  getNewsTenList
} from "@/api/common";
export default {
  name: "Home",
  data() {
    return {
      loanRecordList: [],
      helpList: [],
      newsList: [],
      loading: false,
      activeName: "first",
      imgData: [
        {
          pic_url: require("@/assets/img/hzsj/1.jpg")
        },
        {
          pic_url: require("@/assets/img/hzsj/2.jpg")
        },
        {
          pic_url: require("@/assets/img/hzsj/3.jpg")
        },
        {
          pic_url: require("@/assets/img/hzsj/4.jpg")
        },
        {
          pic_url: require("@/assets/img/hzsj/5.jpg")
        },
        {
          pic_url: require("@/assets/img/hzsj/6.jpg")
        },
        {
          pic_url: require("@/assets/img/hzsj/7.jpg")
        },
        {
          pic_url: require("@/assets/img/hzsj/8.jpg")
        }
      ]
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.getRzList();
      this.getHelpList();
      this.getNewsList();
    },
    getRzList() {
      const loading = this.$loading({
        look: true,
        text: "Loading",
        spinner: "el-icon-loading",
        target: document.querySelector(".list-list-parent ")
      });
      getLoanRecordList()
        .then(res => {
          this.loanRecordList = res.data;
          loading.close();
        })
        .catch(res => {
          loading.close();
        });
    },
    getHelpList() {
      const loading = this.$loading({
        look: true,
        text: "Loading",
        spinner: "el-icon-loading",
        target: document.querySelector(".help-box-content")
      });
      getHelpThreeList()
        .then(res => {
          this.helpList = res.data;
          loading.close();
        })
        .catch(res => {
          loading.close();
        });
    },
    getNewsList() {
      const loading = this.$loading({
        look: true,
        text: "Loading",
        spinner: "el-icon-loading",
        target: document.querySelector(".login-box-content")
      });
      getNewsTenList()
        .then(res => {
          this.newsList = res.data;
          loading.close();
        })
        .catch(res => {
          loading.close();
        });
    },
    getData(str) {
      if (!str) {
        return "";
      } else {
        var dateString = new Date(str);
        return this.getNowDate(dateString);
      }
    },
    getNowDate(dateString) {
      /*
       * 当前日期 格式YYYY-MM-DD
       * @param {*} dateString 日期 new Date()
       */
      var date = dateString;
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.nav-box {
  font-size: 14px;
  margin: 0 auto;
  width: 100%;
  min-width: 1200px;
  max-width: 1400px;
  display: flex;
  .box-card {
    border-radius: 6px;
  }
  .left {
    .detail-box-info {
      // width: 100%;
      height: 369px;
      box-sizing: border-box;
    }
    flex: 1;
    .detail-box-info,
    .login-menu {
      width: 100%;
      border-radius: 4px;
      border: 1px solid #f5f5f5;
      transition: border-color 0.5s;
      -moz-transition: border-color 0.5s; /* Firefox 4 */
      -webkit-transition: border-color 0.5s; /* Safari and Chrome */
      -o-transition: border-color 0.5s; /* Opera */
      // box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      &:hover {
        border-color: #b1c4fd;
      }
      .list {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .list-list-parent {
        width: calc(100% - 15px);
        overflow-y: auto;
      }
      .info-list {
        line-height: 19px;
        display: flex;
        justify-content: space-between;
        .info-list-item {
        }
      }
    }
    .detail-img-box,
    .detail-mechanism-box {
      border: 1px solid #f5f5f5;
    }
    .img-jg {
      display: flex;
      flex-wrap: wrap;
      & > div {
        margin: 15px;
        width: calc(25% - 32px);
        border: 1px solid #f5f5f5;
        transition: border-color 0.5s;
        -moz-transition: border-color 0.5s; /* Firefox 4 */
        -webkit-transition: border-color 0.5s; /* Safari and Chrome */
        -o-transition: border-color 0.5s; /* Opera */
        // box-shadow: 0 0 5px rgba(#959494, 0.2);
        border-radius: 4px;
        &:hover {
          border-color: #b1c4fd;
        }
        img {
          height: 60px;
          object-fit: cover;
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    width: 386px;
    .login-box,
    .help-box {
      border: 1px solid #f5f5f5;
      transition: border-color 0.5s;
      -moz-transition: border-color 0.5s; /* Firefox 4 */
      -webkit-transition: border-color 0.5s; /* Safari and Chrome */
      -o-transition: border-color 0.5s; /* Opera */
      &:hover {
        border-color: #b1c4fd;
      }
    }
    .help-box,
    .login-menu {
      .help-box-content {
        height: 652px;
        width: 100%;
        .help-box-scroll {
          display: flex;
          overflow: hidden;
          flex-direction: column;
          height: 100%;
          .help-box-detail {
            flex: 1;
            overflow-y: auto;
            width: calc(100% + 17px);
          }
        }
        .help-box-content-item {
          &:hover {
            background: #fff9f2;
          }
        }
      }
      .login-box-content {
        height: 296px;
      }
      .help-box-title {
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        span {
          color: #999;
        }
        .help-box-title-tit {
          position: relative;
          font-size: 16px;
          font-weight: bold;
          padding-right: 40px;
          &::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            border-bottom: 4px solid #108ee9;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.login-menu-child {
  .tablist {
    width: 100% !important;
  }
  .el-tabs__active-bar {
    width: 193px !important;
  }
  .el-tabs__item {
    width: 180px !important;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
}
.help-box-content-item {
  img {
    // width: 60% !important;
    object-fit: cover;
    text-align: center;
    padding: 0 20px;

    box-sizing: border-box;
  }
}
</style>