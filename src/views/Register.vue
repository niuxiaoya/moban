<template>
  <div class="nav-box pb50">
    <div class="register mt10 mb50 p30 pb50" :style="{minHeight: scrollerHeight}">
      <div class="register-title">新用户注册</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="ruleForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="企业法人姓名" prop="frName">
          <el-input v-model="ruleForm.frName"></el-input>
        </el-form-item>
        <el-form-item label="您的手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码" prop="validCode">
          <el-input v-model="ruleForm.validCode" autocomplete="off" style="width: 70%"></el-input>
          <el-button class="btn"  :loading="countDown>0" type="primary" @click="countdown" style="width: 30%">
            {{ countDown === 0 ? '获取验证码':countDown
            +
            '秒后' }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" :loading="loading" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getCode, getRegister } from "@/api/common";
export default {
  name: "Registers",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号格式"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      downJob: null,
      countDown: 0,
      loading: false,
      loading1: false,
      ruleForm: {
        companyName: "",
        frName: "",
        phone: "",
        password: "",
        checkPass: "",
        validCode: ""
      },
      rules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        frName: [
          { required: true, message: "请输入企业法人姓名", trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        validCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    submitForm(formName) {
      // this.loading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let params = this.ruleForm;
          getRegister(params)
            .then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.$refs[formName].resetFields();
              } else {
                this.$message({
                  message: res.data.msg || res.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 倒计时
    countdown() {
      if (this.countDown) {
        return false;
      }
      const self = this;
      let params = {
        phone: this.ruleForm.phone
      };
      getCode(params)
        .then(res => {
          this.countDown = 60;
          this.downJob = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown -= 1;
            } else {
              clearInterval(this.downjob);
            }
          }, 1000);
        })
        .catch(res => {});
      // const result =await self.$req.get({url,data});
      // if(result.code){
      //   self.countDown = 60;
      // self.downJob = setInterval(() => {
      //   if (self.countDown > 0) {
      //     self.countDown -= 1;
      //   } else {
      //     clearInterval(self.downjob);
      //   }
      // }, 1000)
      // }
    }
  },
  computed: {
    scrollerHeight() {
      return window.innerHeight - 540 - 60  + "px";
    }
  },
  components: {}
};
</script> 
<style lang="scss" scoped>
.register {
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
  margin: 0 auto;
  .register-title {
    font-size: 22px;
    text-align: center;
    line-height: 50px;
    padding-bottom: 20px;
  }
  .demo-ruleForm {
    margin: 0 auto;
    width: 50%;
  }
}
</style>
