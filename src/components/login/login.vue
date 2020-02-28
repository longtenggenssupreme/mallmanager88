<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
       <el-button class="login-btn" type="primary" @click.prevent="handlelogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handlelogin () {
      localStorage.setItem('token', 'token')
      this.$router.push({name: 'Home'})
      const res = await this.$http.get('users/5')
      if (res.status === 200) {
        this.$message.success('登陆成功')
        // 添加登陆以后存储token，防止其他直接到主页
        localStorage.setItem('token', 'token')
        this.$router.push({name: 'home'})
      } else {
        this.$message.warning('用户名或者密码错误')
      }
      // 第一种方式
      // const res = await this.$http.post('users', this.formdata)
      // // eslint-disable-next-line no-unused-vars
      // const { data, meta: { msg, status } } = res.data
      // if (res.status === 200) {
      //   this.$message.success('登陆成功')
      //   // 添加登陆以后存储token，防止其他直接到主页
      //   localStorage.setItem('', data.token)
      //   this.$router.push({name: 'Home'})
      // } else {
      //   this.$message.error(msg)
      // }
      // 第二种方式
      //   // 返回登录信息，登陆成功，跳转到主页，否则提示错误信息
      // this.$http.post('users', this.formdata).then((res) => {
      //   // 返回登录信息，登陆成功，跳转到主页，否则提示错误信息
      //   // eslint-disable-next-line no-unused-vars
      //   // const { data, meta: { msg, status } } = res.data
      //   // eslint-disable-next-line no-unused-vars
      //   const { data: { msg, status } } = res.data
      //   if (res.status === 200) {
      //     this.$message.success('登陆成功')
      //     this.$router.push({name: 'Home'})
      //   } else {
      //     this.$message.error(msg)
      //   }
      // })
    }
  }
}
</script>

<style>
.login-wrap{
  height: 100%;
  background-color: #342152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form{
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding:10px 30px 30px 30px;
}
.login-wrap .login-btn{
  width: 100%;
}
</style>
