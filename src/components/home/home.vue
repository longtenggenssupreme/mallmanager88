<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="../../assets/logo.png" alt="无法显示图片" />
                </div>
            </el-col>
            <el-col :span="18" class="middle">
                <h2>电商系统后台管理平台</h2>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a href="#" @click.prevent="loginout" class="loginout">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo">
                 <el-submenu :index="''+item.order" v-for="(item,index) in menus" :key="index">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authname}}</span>
                    </template>
                    <el-menu-item :index="item1.path" v-for="(item1,index) in item.children" :key="index">
                        <i class="el-icon-menu"></i>
                        <span>{{item1.authname}}</span>
                    </el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="users">
                        <i class="el-icon-menu"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="role">
                        <i class="el-icon-success"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="right">
                        <i class="el-icon-menu"></i>
                        <span>权限列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1">
                        <i class="el-icon-menu"></i>
                        <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <i class="el-icon-menu"></i>
                        <span>分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                        <i class="el-icon-menu"></i>
                        <span>商品分类</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1">
                        <i class="el-icon-menu"></i>
                        <span>订单列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>报表管理</span>
                    </template>
                    <el-menu-item index="5-1">
                        <i class="el-icon-menu"></i>
                        <span>数据统计</span>
                    </el-menu-item>
                </el-submenu> -->
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  // 验证token标记
  beforeCreate () {
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   this.$router.push({ name: 'login' })
    // }
  },
  created () {
    this.getMenus()
  },
  methods: {
    async getMenus () {
      const res = await this.$http.get('menus')
      this.menus = res.data
    },
    loginout () {
      localStorage.clear()
      this.$message.success('推出成功')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
    height: 100%;
}

.middle {
    text-align: center;
}

.loginout {
    line-height: 60px;
    text-decoration: none;
}
</style>
