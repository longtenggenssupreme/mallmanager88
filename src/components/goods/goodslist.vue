<template>
  <el-card class="box-card">
     <my-bread class="mybread" level1="商品管理" level2="商品列表"></my-bread>
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" @clear="searchclear" clearable v-model="query" class="inputSearch">
                <el-button @click="searchUserlist()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="$router.push({name:'goodsadd'})">添加商品</el-button>
        </el-col>
    </el-row>
    <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
         <el-table-column prop="username" label="商品名称" width="80">
        </el-table-column>
        <el-table-column prop="email" label="编号">
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
         <el-table-column prop="mg_state" label="商品状态">
            <template slot-scope="scope">
            <el-switch @change="changeMsState(scope.row)"  v-model="scope.row.mg_state"  active-color="#13ce66"  inactive-color="#ff4949">
            </el-switch>
        </template>
        </el-table-column>
        <el-table-column prop="name" label="操作">
           <template  slot-scope="scope">
             <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showEditUser(scope.row)" circle></el-button>
             <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="deleteUser(scope.row.id)" circle></el-button>
             <el-button type="success" size="mini" plain icon="el-icon-check" @click="showUserRole(scope.row)" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
     <el-pagination
      :current-page="1"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
</template>

<script>
export default {

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
