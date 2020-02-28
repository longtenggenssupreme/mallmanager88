<template>
<el-card class="box-card">
    <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">成功按钮</el-button>
        </el-col>
    </el-row>
    <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
         <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
        </el-table-column>
         <el-table-column prop="mg_state" label="用户状态">
        </el-table-column>
        <el-table-column prop="name" label="操作">
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 7,
      total: 1,
      userlist: [],
      tempdata: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'}]}
  },
  methods: {
    async getUserList () {
      // 更具api接口获取数据要求根据登陆的token令牌
      // const token = localStorage.getItem('token')
      // this.$http.default.header.common['Autuorization'] = token
      const {data, status} = await this.$http.get('users?_page=$"{this.pagesize}"&_limit="{this.pagenum}"')
      // console.log(data.length)
      if (status === 200) {
        this.$message.success('获取数据成功')
        this.userlist = data
        this.total = data.length
      } else {
        this.$message.warning('获取数据失败')
      }
    }
  }
}
</script>

<style>
.searchRow {
    height: 100%;
    margin-top: 10px;
    /* padding: 10px; */
}

.inputSearch {
    width: 300px;
}
</style>
