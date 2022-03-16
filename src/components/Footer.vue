<template>
  <div class="footer">
    <ul class="list">
      <li v-for="(i,key) in list" :key="key">{{i.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "footers",
  data() {
    return {
      list: [
        {
          name: "copayright@2019"
        },
        {
          name: "北京共信互联科技有限公司"
        },
        {
          name: "京ICP备17054558号"
        }
      ]
    };
  },
  watch: {},
  created() {},
  methods: {},
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.footer {
  .list {
    background: #080f7c;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
    color: #fff;
    li{
      margin-right: 10px;
    }
  }
}
</style>