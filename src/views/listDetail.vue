<template>
  <div class="nav-box">
    <div class="list-detail mt10 mb50 p30 pb50">
      <div v-if="list && list.newsTitle" class="list-detail-tit">{{list.newsTitle}}</div>
      <div v-if="list && list.createTime" class="list-detail-tit list-detail-create">{{list.createTime}}</div>
      <div v-if="list && list.newsContent" v-html = "list.newsContent"></div>
    </div>
  </div>
</template>
<script>
import { getNewsListDetail } from "@/api/common";
export default {
  name: "listDetail",
  data() {
    return {
      list: {

      }
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getList(this.$route.query.id);
  },
  methods: {
    getList(id) {
      const loading = this.$loading({
        look: true,
        text: "Loading",
        spinner: "el-icon-loading",
        target: document.querySelector(".list-detail")
      });
      let params = {
        id: id
      }
      getNewsListDetail(params)
        .then(res => {
          res.data.newsContent = decodeURIComponent(res.data.newsContent)
          this.list = res.data
          loading.close();
        })
        .catch(res => {
          loading.close();
        });
    }
  },
  computed: {},
  components: {}
};
</script> 
<style lang="scss" scoped>
.list-detail {
  min-height: 170px;
  width: 100%;
  .list-detail-tit {
    text-align: center;
    font-size: 22px;
    line-height: 50px;
  }
  .list-detail-create{
    font-size: 14px;
    color: #ccc
  }
}
</style>
