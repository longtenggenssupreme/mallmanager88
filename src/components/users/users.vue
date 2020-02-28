<template>
<el-card class="box-card">
    <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" @clear="searchclear" clearable v-model="query" class="inputSearch">
                <el-button @click="searchUserlist()" slot="append" icon="el-icon-search"></el-button>
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
        <!-- <el-table-column prop="create_time" label="创建时间">
        </el-table-column> -->
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.ctreate_time | fmttime}}
          </template>
        </el-table-column>
         <el-table-column prop="mg_state" label="用户状态">
            <template slot-scope="scope">
            <el-switch  v-model="scope.row.mg_state"  active-color="#13ce66"  inactive-color="#ff4949">
            </el-switch>
        </template>
        </el-table-column>
        <el-table-column prop="name" label="操作">
           <template>
             <el-button type="primary" size="mini" plain icon="el-icon-edit" circle></el-button>
             <el-button type="success" size="mini" plain icon="el-icon-check" circle></el-button>
             <el-button type="danger" size="mini" plain icon="el-icon-delete" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
      pagesize: 2,
      total: -1,
      userlist: []
    }
  },
  methods: {
    searchclear () {
      this.getUserList()
    },
    searchUserlist () {
      console.log('111111')
      this.getLikeUserList()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    async getLikeUserList () {
      const {data, status} = await this.$http.get(`users?username_like=${this.query}`)
      if (status === 200) {
        this.$message.success('获取数据成功')
        this.userlist = data
        this.total = data.length
      } else {
        this.$message.warning('获取数据失败')
      }
    },
    async getUserList () {
      // 更具api接口获取数据要求根据登陆的token令牌
      // const token = localStorage.getItem('token')
      // this.$http.default.header.common['Autuorization'] = token
      // const {data, status} = await this.$http.get(`users?query=${this.query}&_page=${this.pagenum}&_limit=${this.pagesize}`)
      const {data, status} = await this.$http.get(`users?_page=${this.pagenum}&_limit=${this.pagesize}`)
      console.log(data)
      if (status === 200) {
        this.$message.success('获取数据成功')
        this.userlist = data
        this.total = 9
        console.log(data.length)
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
