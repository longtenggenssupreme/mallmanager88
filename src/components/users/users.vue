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
            <el-button type="success" @click="showAddUser()">成功按钮</el-button>
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
            <el-switch @change="changeMsState(scope.row)"  v-model="scope.row.mg_state"  active-color="#13ce66"  inactive-color="#ff4949">
            </el-switch>
        </template>
        </el-table-column>
        <el-table-column prop="name" label="操作">
           <template  slot-scope="scope">
             <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showEditUser(scope.row)" circle></el-button>
             <el-button type="success" size="mini" plain icon="el-icon-check" @click="showRoleUser(scope.row)" circle></el-button>
             <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="deleteUser(scope.row.id)" circle></el-button>
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
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <el-form :model="form">
    <el-form-item label="用户名称" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="用户密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
  <el-form :model="form">
    <el-form-item label="用户名称" label-width="100px">
      <el-input disabled v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
     <!-- <el-form-item label="用户密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item> -->
     <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="编辑用户角色" :visible.sync="dialogFormVisibleEditRole">
  <el-form :model="form">
    <el-form-item label="用户名称" label-width="100px">
      <el-input disabled v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="用户角色" label-width="100px">
      <el-input v-model="form.role_name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEditRole = false">取 消</el-button>
    <el-button type="primary" @click="editUserRole">确 定</el-button>
  </div>
</el-dialog>
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
      userlist: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        role_name: '',
        mg_state: '',
        create_time: ''
      }
    }
  },
  methods: {
    async showRoleUser (user) {
      const res = await this.$http.put(`users/${user.id}`, user)
      if (res.status === 200) {
        this.$message.success('编辑状态成功')
        // this.getAllUserList()
      } else {
        this.$message.warning('编辑状态失败')
      }
    },
    async changeMsState (user) {
      const res = await this.$http.put(`users/${user.id}`, user)
      if (res.status === 200) {
        this.$message.success('编辑状态成功')
        // this.getAllUserList()
      } else {
        this.$message.warning('编辑状态失败')
      }
    },
    async showEditUser (user) {
      this.dialogFormVisibleEdit = true
      this.form = user
    },
    async editUser () {
      this.dialogFormVisibleEdit = false
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      if (res.status === 200) {
        this.form = {}
        this.$message.success('编辑数据成功')
        this.getAllUserList()
      } else {
        this.$message.warning('编辑数据失败')
      }
    },
    deleteUser (userid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${userid}`)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'})
          this.getAllUserList()
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败!'})
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showAddUser () {
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    async addUser () {
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users', this.form)
      console.log(res)
      if (res.status === 201) {
        this.form = {}
        this.$message.success('添加数据成功')
        this.getAllUserList()
      } else {
        this.$message.warning('添加数据失败')
      }
    },
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
    async getAllUserList () {
      const {data, status} = await this.$http.get(`users`)
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
