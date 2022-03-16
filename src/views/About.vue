<template>
  <div class="nav-box">
    <ul class="nav-box-ul">
      <li v-for="(i,key) in list" :key="key" class="p20 m10">
        <div class="nav-box-tit" @click="tzUrl(i.id)">
          <span>{{i.newsTitle}}</span>
          <span>{{i.createTime}}</span>
        </div>
        <div class="nav-box-content">{{i.newIntroduction}}</div>
      </li>
      <li class="zwsj" v-if="!list.length" style="margin: 0 auto;line-height: 400px;border: none" :style="{lineHeight: scrollerHeight}">暂无数据</li>
    </ul>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="pageArr"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next"
      :total="total"
      style="text-align: right;"
      class="mb20"
    ></el-pagination>
  </div>
</template>
<script>
import { getNewsList } from "@/api/common";
export default {
  name: "About",
  data() {
    return {
      list: [],
      page: {
        size: 20,
        current: 1
      },
      total: 0,
      pageArr: [20, 50, 100]
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const loading = this.$loading({
        look: true,
        text: "Loading",
        spinner: "el-icon-loading",
        target: document.querySelector(".nav-box")
      });
      let params = this.page;
      getNewsList(params)
        .then(res => {
          this.list = res.data.records;
          this.total = res.data.total;
          loading.close();
        })
        .catch(res => {
          loading.close();
        });
    },
    tzUrl(id) {
      this.$router.push(`/home/listDetail?id=${id}`)
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    }
  },
  computed: {
    scrollerHeight() {
      return (window.innerHeight - 540 - 10 -32 - 20) + 'px'
    }
  },
  components: {}
};
</script> 
<style lang="scss" scoped>
.nav-box {
  position: relative;
  display: flex;
  flex-direction: column;
  .nav-box-ul {
    display: flex;
    flex-direction: column;
    li {
      cursor: pointer;
      margin-left: 0px;
      margin-right: 0px;
      border: 1px solid #f5f5f5;
      border-radius: 4px;
      line-height: 30px;
      transition: border-color 0.5s;
      -moz-transition: border-color 0.5s; /* Firefox 4 */
      -webkit-transition: border-color 0.5s; /* Safari and Chrome */
      -o-transition: border-color 0.5s; /* Opera */
      &:hover {
        border-color: #b1c4fd;
      }
      .nav-box-tit {
        span {
          &:first-child {
            font-size: 16px;
          }
          &:last-child {
            color: #cccccc;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
