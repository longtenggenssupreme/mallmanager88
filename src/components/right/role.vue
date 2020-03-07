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
              <el-tag @close="handleClose(scope.row,item.id)" closable>{{item.authname}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!--显示二级菜单  -->
              <el-row v-for="(item1,j) in item.children" :key="j">
                <el-col :span="4">
                    <el-tag @close="handleClose(scope.row,item1.id)" type="success" closable>{{item1.authname}}</el-tag>
                     <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                    <el-tag @close="handleClose(scope.row,item3.id)" type="danger" v-for="(item3,k) in item1.children" :key="k" closable>{{item3.authname}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0">未分配权限</span>
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
            @click="showRoleRight(scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-dialog title="编辑角色权限" :visible.sync="dialogFormVisibleRoleRight">
  <!-- :default-expanded-keys="[2, 3]" -->
  <!-- :default-expanded-keys="expanded" -->
  <!-- :default-checked-keys="[5]" -->
  <!-- :default-checked-keys="checked" -->
  <el-tree
  ref="tree"
  :data="treeList"
  show-checkbox
  node-key="id"
  default-expand-all
  :props="defaultProps">
  </el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRoleRight = false">取消</el-button>
    <el-button type="primary" @click="setRoleRight">确定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'}, {
            id: 10,
            label: '三级 1-1-2'}]
        }]}, {
        id: 2,
        label: '一级 2',
        children: [{id: 5, label: '二级 2-1'
        }, {id: 6, label: '二级 2-2'
        }]}, {
        id: 3,
        label: '一级 3',
        children: [{id: 7, label: '二级 3-1'
        }, {id: 8, label: '二级 3-2'
        }]}],
      defaultProps: {
        children: 'children',
        label: 'authname'},
      treeList: [],
      roleList: [],
      expanded: [],
      checked: [],
      currentRoleid: -1,
      dialogFormVisibleRoleRight: false
    }
  },
  created () {
    this.getAllroles()
    this.getAllrolerights()
  },
  methods: {
    async  setRoleRight () {
      // 获取角色id和选择的权限的id（包括全选 getCheckedKeys和半选getHalfCheckedKeys
      let arr1 = this.$refs.tree.getCheckedKeys()
      console.log(arr1)
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      console.log(arr2)
      // es6 中合并数组，例如arr1=[1,2,3] arr2=[4,5,6]  [...arr1, ...arr2]=> [1,2,3,4,5,6]
      let arr = [...arr1, ...arr2]
      console.log(arr)
      // arr.join(',') 表示数组中的数据已逗号分隔
      //   const res = await this.$http.post(`roles${this.currentRoleid}/${arr.join(',')}`)
      //   if (res.status === 200) {
      //     this.$message.success('编辑权限成功')
      //     this.getAllrolerights()
      //   }
      //   this.$message.success('删除成功')
      this.dialogFormVisibleRoleRight = false
    },
    async showRoleRight (role) {
      this.currentRoleid = role.id
      this.$message.success('成功')
      this.dialogFormVisibleRoleRight = true
      //   var arrtemp = []
      //   // 获取要展开的列表 :default-checked-keys="[5]"
      //   role.cheildren.forEach(item => {
      //     // arrtemp.push(item.id)为了二级和三级的不全选
      //     item.children.forEach(item1 => {
      //     //   arrtemp.push(item1.id)为了二级和三级的不全选
      //       item1.children.forEach(item2 => {
      //         arrtemp.push(item2.id)
      //       })
      //     })
      //   })
      //   this.checked = arrtemp

      // 获取要展开的列表default-expanded-keys="[2, 3],可以使用 default-expand-all属性来替代
      //   this.treeList.forEach(item => {
      //     arrtemp.push(item.id)
      //     item.children.forEach(item1 => {
      //       arrtemp.push(item1.id)
      //       item1.children.forEach(item2 => {
      //         arrtemp.push(item2.id)
      //       })
      //     })
      //   })
      //   获取要展开的列表default-expanded-keys="[2, 3]
      //   this.expanded = arrtemp
      //  console.log(arrtemp)
      //  this.dialogFormVisibleRoleRight = true
    },
    async  handleClose (role, rightid) {
      this.$message.success('删除成功')
    //   const res = await this.$http.delete(`roles${role.id}/${rightid}`)
    //   //this.roleList = res.data
    //   if (res.status === 200) {
    //     this.$message.success('删除成功')
    //     //role.children = res.data//是更新当前角色的权限，不需要要更新整个数据
    //     //this.getAllroles()//更新整个数据
    //   } else {
    //     this.$message.warning('删除失败')
    //   }
    },
    async getAllrolerights () {
      const res = await this.$http.get('rolerights')
      this.treeList = res.data
    },
    async getAllroles () {
      const res = await this.$http.get('roles')
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
