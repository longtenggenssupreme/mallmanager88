import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/right/right.vue'
import Role from '@/components/right/role.vue'
import Goodslist from '@/components/goods/goodslist.vue'
import Goodsadd from '@/components/goods/goodsadd.vue'
import Goodsparams from '@/components/goods/goodparams.vue'
import Goodscate from '@/components/goods/goodscate.vue'

import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        name: 'users',
        path: '/users',
        component: Users
      },
      {
        name: 'right',
        path: '/rights',
        component: Right
      },
      {
        name: 'role',
        path: '/roles',
        component: Role
      },
      {
        name: 'goods',
        path: '/goods',
        component: Goodslist
      },
      {
        name: 'goodsadd',
        path: '/goodsadd',
        component: Goodsadd
      },
      {
        name: 'goodparams',
        path: '/goodparams',
        component: Goodsparams
      },
      {
        name: 'goodcategroies',
        path: '/goodcategroies',
        component: Goodscate
      }]
    }
  ]
})

// 路由守卫主要是解决和ome主页相同的验证信息，
// 如果有两个和home相同的组件都需要验证token的话，
// 那么使用路由守卫，就可以在一个地方写，其他地方都可以使用了

// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
router.beforeEach((to, from, next) => {
  // 1.如果是去登陆页面的话，可以直接放行
  // 2.不是去登陆的话，看看有没有token，有的话放行，没有要回到登录页面
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    // console.log(token)
    if (!token) {
      Message.warning('请先登录')
      router.push({ name: 'login' })
      return
    }
    next()
  }
})

export default router
