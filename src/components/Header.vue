<template>
  <div class="headers">
    <div class="box">
      <div class="logo pr30">
        <img class="mr10" :src="logoUrl" alt />
        <div class="bold">{{tenantName}}产业金融服务平台</div>
      </div>
      <div class="nav">
        <div class="item pl30 pr30" v-for="(i,key) in list" :key="key">
          <!-- <span class="pointer" @click="tzNews(i)">{{i.name}}</span> -->
          <span class="pointer" @click="tzNews(i,key);" :style="key == dqIndex?'font-weight: bold;':''">{{i.name}}</span>
        </div>
        <div>
          <el-button class="login-btn ml10" @click="tzUrl ">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from "@/api/common";
export default {
  name: "headers",
  data() {
    return {
      tenantName: "",
      logoUrl: "",
      url: "",
      localUrl: "",
      tenantId: "",
      dqIndex: 0,
      list: [
        {
          name: "首页",
          url: "/home/index"
        },
        {
          name: "公告与动态",
          url: "/home/about"
        },
        {
          name: "金融产品",
          url: "/home/product"
        },
        {
          name: "帮助中心",
          url: "/home/help"
        },
        {
          name: "联系我们",
          url: "/home/aboutus"
        },
        {
          name: "注册",
          url: "/home/registers"
        }
      ]
    };
  },
  watch: {},
  created() {
    if (!this.tenantId) {
      this.getInfoList();
    }
    this.getInfo();
  },
  methods: {
    tzUrl() {
      let domain = sessionStorage.getItem("domain");
      if (domain) location.href = this.url;
    },
    tzNews(i,key) {
      if(this.dqIndex == key) return
      this.$router.push(i.url);
      this.localUrl = i.url;
      this.dqIndex = key
    },
    getInfoList() {
      let params = {
        domain: window.location.host
      };
      getInfo(params)
        .then(res => {
          if (res.code == 200) {
            if (res.data.tenantId) {
              let data = res.data;
              sessionStorage.setItem("tenantId", data.tenantId);
              sessionStorage.setItem("logoUrl", data.logoUrl);
              sessionStorage.setItem("tenantName", data.tenantName);
              sessionStorage.setItem("domain", data.domain);

              this.tenantName = data.tenantName || "";
              this.logoUrl = data.logoUrl || "";
              this.url = data.domain || "";
            }
          }
        })
        .catch(res => {});
    },
    getInfo() {
      console.log(window.location.hash);
      this.list.forEach((item,key)=>{
        if(window.location.hash.search(item.url) != -1){
          this.dqIndex = key
        }
      })

    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.headers {
  position: fixed;
  z-index: 22;
  top: 0;
  background: #03052e;
  width: 100%;
  margin: 0 auto;
  div,
  span {
    color: #fff;
  }
  .box {
    width: 100%;
    margin: 0 auto;
    min-width: 1200px;
    max-width: 1400px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav {
    display: flex;
  }
  .logo {
    display: flex;
    align-items: center;
    img {
      width: 140px;
      height: 60px;
    }
  }
}
</style>
<style lang="scss">
.header {
}
.login-btn {
  height: 24px !important;
  padding: 0 20px !important;
}
</style>