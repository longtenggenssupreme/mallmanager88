<template>
  <el-card>
    <my-bread class="mybread" level1="商品管理" level2="分类参数"></my-bread>
    <el-alert class="alert" title="只能给第三级分类设置参数" type="warning" center show-icon></el-alert>
    <el-form class="form" label-position="left" label-width="80px" :model="form">
      <el-form-item label="商品分类">
        {{optionsselectarry}}
        <el-cascader clearable :show-all-levels="false" v-model="optionsselectarry" :options="options"
          :props="defaultporps" @change="handleChange">
        </el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs v-model="active" tab-position="top" @tab-click="tabclick">
      <el-tab-pane name="1" label="动态参数">
        <el-button type="danger">动态参数</el-button>
        <el-table :data="arrDynamicParams" style="width: 100%">
          <el-table-column type="expand" label="#" width="60">
            <template slot-scope="scope">{{scope.row.att_name}}
              <el-tag :key="tag" v-for="tag in scope.row.att_vals" closable :disable-transitions="false"
                @close="handleClose(scope.row, tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="att_name" label="属性名称">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showEditUser(scope.row)" circle>
              </el-button>
              <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="deleteUser(scope.row.id)" circle>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2" label="静态参数">
        <el-button type="danger">静态参数</el-button>
        <el-table :data="arrStaticParams" style="width: 100%">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="att_name" label="属性名称">
          </el-table-column>
          <el-table-column prop="att_vals" label="属性值">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showEditUser(scope.row)" circle>
              </el-button>
              <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="deleteUser(scope.row.id)" circle>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        goods_pics: [],
        goods_attrs: []
      },
      // options
      options: [],
      optionsselectarry: [],
      //   级联选择器的配置，可以配置获取数据源的对象的id和name
      defaultporps: {
        expandTrigger: 'hover',
        label: 'name',
        value: 'id',
        children: 'children'
      },
      // 动态参数
      arrDynamicParams: [],
      // 静态参数
      arrStaticParams: [],
      //
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  created() {
    this.getcategories()
  },
  methods: {
    // 点击el- tag的删除标签
    async handleClose(att, tag) {
      att.att_vals.splice(att.att_vals.indexOf(tag), 1)
      // let putdata = {att_name: att.att_name, att_sel: 'many', att_vals: att.att_vals.join(',')}
      // const res1 = await this.$http.put(`catagories/${this.optionsselectarry[2]}/attributesDynamicParams/${att.att_id}`,putdata)
      // console.log(res1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 点击el-tag的添加标签
    handleInputConfirm(att) {
      let inputValue = this.inputValue
      if (inputValue) {
        att.att_vals.push(inputValue)
        // let putdata = {att_name: att.att_name, att_sel: 'many', att_vals: att.att_vals.join(',')}
        // const res1 = await this.$http.put(`catagories/${this.optionsselectarry[2]}/attributesDynamicParams/${att.att_id}`,putdata)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async tabclick() {
      //  选择tab页的参数页时，根据选择的三级目录分类id去获取对应的商品参数
      if (this.active === '2') {
        // 判断是否选择了级联的第三级，只有选择了第三级才可以去获取数据
        if (this.optionsselectarry.length === 3) {
          // 三级目录分类id去获取对应的商品参数 动态参数const res = await this.$http.get(`attributes/${this.optionsselectarry[2]}/sel=only`)
          const res = await this.$http.get('attributesStaticParams')
          this.arrStaticParams = res.data
        } else {
          this.$message.warning('请选择三级分类')
        }
      }
    },
    // 级联数据选择之后的处理函数
    async handleChange() {
      if (this.optionsselectarry.length === 3) {
        // // 三级目录分类id去获取对应的商品参数 静态参数const res = await this.$http.get(`attributes/${this.optionsselectarry[2]}/sel=only`)
        // const res = await this.$http.get(`attributesStaticParams`)
        // console.log(res)
        // this.arrStaticParams = res.data
        // 三级目录分类id去获取对应的商品参数 动态参数const res = await this.$http.get(`attributes/${this.optionsselectarry[2]}/sel=many`)
        const res1 = await this.$http.get('attributesDynamicParams')
        console.log(res1)
        this.arrDynamicParams = res1.data
        this.arrDynamicParams.forEach((item) => {
          item.att_vals =
            item.att_vals.length === 0 ? [] : item.att_vals.trim().split(',')
        })
      } else {
        this.$message.warning('请选择三级分类')
      }
    },
    async getcategories() {
      const res = await this.$http.get('categories')
      //   console.log(res)
      this.options = res.data
    }
  }
}
</script>

<style>
.alert {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

/* .form {
    height: 400px;
    overflow: auto;
} */
</style>
