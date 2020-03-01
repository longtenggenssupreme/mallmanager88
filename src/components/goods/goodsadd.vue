<template>
<el-card>
    <my-bread class="mybread" level1="用户管理" level2="用户列表"></my-bread>
    <el-alert class="alert" title="添加商品信息" type="success" center show-icon></el-alert>
    <el-steps class="elsteps" :active="1*active" simple>
        <el-step title="商品信息" icon="el-icon-edit"></el-step>
        <el-step title="商品参数" icon="el-icon-upload"></el-step>
        <el-step title="商品属性" icon="el-icon-picture"></el-step>
        <el-step title="商品图片" icon="el-icon-upload"></el-step>
        <el-step title="商品内容" icon="el-icon-picture"></el-step>
    </el-steps>
    <el-form class="form" label-position="top" label-width="80px" :model="form">
        <el-tabs v-model="active" tab-position="left" @tab-click="tabclick">
            <el-tab-pane name="1" label="商品信息">
                <el-form-item label="商品名称">
                    <el-input v-model="form.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.goods_price"></el-input>
                </el-form-item>
                 <el-form-item label="商品数量">
                    <el-input v-model="form.goods_number"></el-input>
                </el-form-item>
                  <el-form-item label="商品重量">
                    <el-input v-model="form.goods_weight"></el-input>
                </el-form-item>
                  <el-form-item label="商品分类">
                      {{optionsselectarry}}
                    <el-cascader clearable
                         v-model="optionsselectarry"
                         :options="options"
                         :props="defaultporps"
                         @change="handleChange">
                         </el-cascader>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="2" label="商品参数">
                 <el-form-item :label="item.att_name" v-for="(item,index) in arrDynamicParams" :key="index">
                    <el-checkbox-group  v-model="item.att_vals">
                        <el-checkbox boder :label="item1" v-for="(item1,i) in item.att_vals" :key="i"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="3" label="商品属性">
                <el-form-item :label="it.att_name" v-for="(it,index) in arrStaticParams" :key="index">
                    <el-input v-model="it.att_vals"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="4" label="商品图片">
                 <el-form-item >
                 <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handleSucessUpload"
                :on-remove="handleRemoveUpload"
                list-type="picture"
                :headers="headers">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="5" label="商品内容">
                <el-form-item >
                   <el-button type="primary" @click="addGoods">点击添加商品</el-button>
                   <quill-editor class="quilleditor" v-model="form.goods_introduce"></quill-editor>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      active: '1',
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
      // 上传是需要的token验证
      headers: {
        Autuorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getcategories()
  },
  methods: {
    //  上传商品
    async addGoods () {
      this.form.att_vals = this.optionsselectarry.join(',')
      //  this.form.goods_pics 在临时上传和删除时做了处理
      let arr1 = this.arrDynamicParams.map((item) => {
        return {att_id: item.att_id, att_value: item.att_vals}
      })
      let arr2 = this.arrStaticParams.map((item) => {
        return {att_id: item.att_id, att_value: item.att_vals}
      })

      let arr = [...arr1, ...arr2]
      this.form.goods_attrs = arr
      const res = await this.$http.post(`goods`, this.form)
      console.log(res)
    },
    // 上传成功，返回文件的临时路径file.data.tmp_file
    handleSucessUpload (file) {
      this.form.goods_pics.push({pic: file.data.tmp_file})
    },
    // 删除 返回文件的临时路径file.response.data.tmp_file
    handleRemoveUpload (file) {
      let position = this.form.goods_pics.findeIndex((item) => {
        return item.pic === file.response.data.tmp_file
      })
      this.form.goods_pics.splice(position, 1)
    },
    async tabclick () {
    //  选择tab页的参数页时，根据选择的三级目录分类id去获取对应的商品参数
      if (this.active === '2') {
        // 判断是否选择了级联的第三级，只有选择了第三级才可以去获取数据
        if (this.optionsselectarry.length === 3) {
          // 三级目录分类id去获取对应的商品参数 动态参数const res = await this.$http.get(`attributes/${this.optionsselectarry[2]}/sel=many`)
          const res = await this.$http.get(`attributesDynamicParams`)
          console.log(res)
          this.arrDynamicParams = res.data
          this.arrDynamicParams.forEach(item => {
            item.att_vals = item.att_vals.length === 0 ? [] : item.att_vals.trim().split(',')
          })
        } else {
          this.$message.warning('请选择三级分类')
        }
      } else if (this.active === '3') {
        if (this.optionsselectarry.length === 3) {
          // 三级目录分类id去获取对应的商品参数 静态参数const res = await this.$http.get(`attributes/${this.optionsselectarry[2]}/sel=only`)
          const res = await this.$http.get(`attributesStaticParams`)
          console.log(res)
          this.arrStaticParams = res.data
        } else {
          this.$message.warning('请选择三级分类')
        }
      }
    },
    async getattributesbyid () {
      const res = await this.$http.get(`attributes`)
      console.log(res)
      this.arrDynamicParams = res.data
    },
    // 级联数据选择之后的处理函数
    handleChange () {},
    async getcategories () {
      const res = await this.$http.get(`categories`)
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

.elsteps {
    margin-top: 10px;
    margin-bottom: 10px;
}
.form {
    height: 400px;
    overflow: auto;
}
.quilleditor {
     height: 400px;
    /* overflow: auto; */
    margin-top: 10px;
}
</style>
