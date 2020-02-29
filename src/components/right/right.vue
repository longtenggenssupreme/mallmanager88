<template>
<div>
    <my-bread class="mybread" level1="权限管理" level2="权限列表"></my-bread>
    <el-table calss="eltable" height=400px :data="authList" border style="width: 100%">
        <el-table-column type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="authname" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column label="层级">
           <template  slot-scope="scope">
             <span v-if="scope.row.level==='0'">一级</span>
             <span v-if="scope.row.level==='1'">二级</span>
             <span v-if="scope.row.level==='2'">三级</span>
           </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      authList: []
    }
  },
  created () {
    this.getAllAuths()
  },
  methods: {
    async getAllAuths () {
      const res = await this.$http.get(`rights`)
      this.authList = res.data
    }
  }
}
</script>

<style>
.mybread{
  margin-bottom: 10px;
  }

.eltable{
   height: 100%;
   margin-top: 80px;
}
</style>
