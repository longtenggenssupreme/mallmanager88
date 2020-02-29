<template>
  <el-card>
    <my-bread class="mybread" level1="权限管理" level2="角色列表"></my-bread>
    <el-row>
      <el-col>
        <el-button class="login-btn" type="primary">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand" width="150px">
        <template slot-scope="scope">
          <!--显示一级菜单  -->
          <el-row v-for="(item,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag closable>{{item.authname}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!--显示二级菜单  -->
              <el-row v-for="(item1,j) in item.children" :key="j">
                <el-col :span="4">
                    <el-tag type="success" closable>{{item1.authname}}</el-tag>
                     <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                    <el-tag type="danger" v-for="(item3,k) in item1.children" :key="k" closable>{{item3.authname}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="150"></el-table-column>
      <el-table-column prop="rolename" label="角色姓名" width="200"></el-table-column>
      <el-table-column prop="roleDes" label="角色描述" width="200"></el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            @click="showEditUser(scope.row)"
            circle
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            icon="el-icon-delete"
            @click="deleteUser(scope.row.id)"
            circle
          ></el-button>
          <el-button
            type="success"
            size="mini"
            plain
            icon="el-icon-check"
            @click="showUserRole(scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      roleList: []
    }
  },
  created () {
    this.getAllroles()
  },
  methods: {
    async getAllroles () {
      const res = await this.$http.get(`roles`)
      this.roleList = res.data
    }
  }
}
</script>

<style>
.mybread {
  margin-bottom: 10px;
}
</style>
