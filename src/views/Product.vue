<template>
  <div class="nav-box">
    <ul class="nav-box-ul">
      <li v-for="(i,key) in list" :key="key" class="p20 m10">
        <div class="nav-box-ul-left">
          <img :src="i.bankLogoUrl" alt />
        </div>
        <div class="nav-box-ul-right">
          <div class="nav-box-tit">
            <b>{{i.bankOrgName}}</b>
          </div>
          <div class="nav-box-center">
            <div class="nav-box-center-left">
              <div>
                <span>
                  <b class="orange">{{i.yearRate}}</b>%
                </span>
                <span>参考利率（年化）</span>
              </div>
              <div>
                <span>
                  <b>{{i.quotaLowest}}</b>-
                  <b>{{i.quotaLimit}}</b> 万
                </span>
                <span>贷款额度</span>
              </div>
              <div>
                <span>
                  <b>{{i.loanMonth}}</b> 个月
                </span>
                <span>贷款期限</span>
              </div>
              <div>
                <span class="font-size">
                  <b>{{i.dbMethod}}</b>
                </span>
                <span>担保方式</span>
              </div>
            </div>

            <div class="nav-box-content pt20">
              <b>产品介绍：</b>
              {{i.productIntroduction}}
            </div>
          </div>
        </div>
      </li>
      <li
        v-if="!list.length"
        style="margin: 0 auto;border: none"
        :style="{lineHeight: scrollerHeight}"
      ><span>暂无数据</span></li>
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
import { getLoanProductList } from "@/api/common";
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
    this.getList();
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
      getLoanProductList(params)
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
      // this.$router.push(`/home/listDetail?id=${id}`)
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
      return window.innerHeight - 540 - 10 - 32 - 20 + "px";
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
      display: flex;
      align-items: center;
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
      .nav-box-ul-left {
        width: 200px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .nav-box-ul-right {
        padding-left: 30px;
        flex: 1;
        .nav-box-center-left {
          display: flex;
          & > div {
            display: flex;
            flex-direction: column;
            padding-right: 30px;
            line-height: 30px;
            span {
              b {
                font-size: 20px;
              }
              .orange {
                color: orange;
              }
              .font-size {
                font-size: 18px;
              }
            }
          }
        }
        .nav-box-tit {
          font-size: 18px;
          padding-bottom: 20px;
        }
        .nav-box-center {
        }
      }
    }
  }
}
</style>
