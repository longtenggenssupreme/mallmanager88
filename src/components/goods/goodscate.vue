<template>
  <el-card class="box-card">
     <my-bread class="mybread" level1="商品管理" level2="商品分类"></my-bread>
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" @clear="searchclear" clearable v-model="query" class="inputSearch">
                <el-button @click="searchUserlist()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="showAddUser()">添加分类</el-button>
        </el-col>
    </el-row>
    <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
         <el-table-column prop="username" label="级别" width="80">
        </el-table-column>
        <el-table-column prop="email" label="是否有效">
        </el-table-column>
        <el-table-column prop="name" label="操作">
           <template  slot-scope="scope">
             <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showEditUser(scope.row)" circle></el-button>
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
    <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd">
    <el-form :model="form">
      <el-form-item label="商品名称" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品类别" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
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
<el-dialog title="编辑商品分类" :visible.sync="dialogFormVisibleRole">
  <el-form :model="form">
    <el-form-item label="分类名称" label-width="100px">
      {{form.username}}
    </el-form-item>
    {{form.rid}}
    <el-form-item  label="角色" label-width="100px">
      <el-select v-model="form.rid" placeholder="请选择活动区域">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option v-for="(item,i) in roles" :key="i" :label="item.rolename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="changeUserRole">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        rid: -1,
        mg_state: '',
        create_time: ''
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
