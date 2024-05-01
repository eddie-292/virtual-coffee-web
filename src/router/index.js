/*
 * Copyright Statement and License Information for Virtual Coffee Kafeih.com Community
 *
 * Copyright Owner：Kafeih.com Community and its contributors, since the inception of the project.
 *
 * License Type：All code, documentation, and design works related to the Kafeih.com Community are licensed under the GNU Affero General Public License (AGPL) v3 or any later version.
 *
 * Use and Distribution：You are free to use, copy, modify, and distribute the code, documentation, and design works of the Kafeih.com Community, subject to the following conditions:
 *
 * 1. You must include the original copyright and license notices in all copies distributed or made publicly available.
 * 2. If you modify the code or design, or derive new works from those provided by the community, you must release these modifications or derivative works under the terms of the AGPLv3 license.
 * 3. Important Note: If you use the code or design of this community to provide network services, you must ensure that all users accessing the service through the network can access the corresponding source code.
 *
 * No Warranty：The Kafeih.com Community and its code, documentation, and design works are provided "as is" without any warranty, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
 *
 * License Acquisition：The complete text of the GNU Affero General Public License (AGPL) v3 can be found on the GNU official website.
 *
 * Please note that the above statement only applies to the Kafeih.com Community and the code, documentation, and design works provided by it. Third-party links or resources may be subject to different licenses from their respective owners or publishers. When using these resources, please be sure to comply with the terms of their respective licenses.
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

// 页面路由(独立页面)
export const pageRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login'),
        name: 'login',
        meta: {description: '登录' + window.common.webSiteName, title: window.common.webSiteName + ' - 登录', requiredLogin: false}
    },
    {
        path: '/login/:reload',
        component: () => import('@/views/login'),
        name: 'login',
        meta: {description: '登录' + window.common.webSiteName, title: window.common.webSiteName + ' - 登录', requiredLogin: false}
    },
    {
        path: '/signup',
        component: () => import('@/views/signup'),
        name: 'signup',
        meta: {description: '注册' + window.common.webSiteName, title: window.common.webSiteName + ' - 注册', requiredLogin: false}
    },
    {
        path: '/sign-up-complete',
        component: () => import('@/views/sign-up-complete'),
        name: 'sign-up-complete',
        meta: {description: '完成注册' + window.common.webSiteName, title: '完成注册 - ' + window.common.webSiteName, requiredLogin: false}
    },
    {
        path: '/privacy-and-terms',
        component: () => import('@/views/privacy-and-terms'),
        name: 'privacy-and-terms',
        meta: {description: window.common.webSiteName + '用户服务协议与隐私条款', title: '用户服务协议与隐私条款 - ' + window.common.webSiteName, requiredLogin: false}
    },
    {
        path: '/virtual-currency',
        component: () => import('@/views/virtualCurrency'),
        name: 'virtualCurrency',
        meta: {description: window.common.webSiteName + '虚拟货币说明', title: '虚拟货币 - ' + window.common.webSiteName, requiredLogin: false}
    },
]

// 模块路由(基于主入口布局页面)
export const moduleRoutes = {
    path: '/',
    component: () => import('@/views/AppMain.vue'),
    name: 'main',
    redirect: {name: 'home'},
    meta: {title: window.common.webSiteName},
    children: [
        {
            path: '',
            component: () => import('@/views/home/index'),
            name: 'home',
            meta: {description: window.common.webSiteDesc, title: window.common.webSiteName, isTab: true, requiredLogin: false}
        },
        {
            path: '404',
            component: () => import('@/views/404'),
            name: '404',
            meta: {title: '404 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 'invite/:member',
            component: () => import('@/views/invite'),
            name: '推荐',
            meta: {title: '推荐 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 't/:id',
            component: () => import('@/views/article/articleContent.vue'),
            name: 't',
            meta: {title: '主题内容 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 'profile',
            component: () => import('@/views/user/profile'),
            name: 'profile',
            meta: {title: 'User Profile - ' + window.common.webSiteName, requiredLogin: true}
        },
        {
            path: 'member/:id',
            component: () => import('@/views/user/userHomepage'),
            name: 'member',
            meta: {title: '用户主页 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 'topics',
            component: () => import('@/views/article/articles'),
            name: 'topics',
            meta: {title: '主题列表 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 'write',
            component: () => import('@/views/article/newArticles'),
            name: 'write',
            meta: {title: '创建主题 - ' + window.common.webSiteName, requiredLogin: true}
        },
        {
            path: 't/append/:id',
            component: () => import('@/views/article/appendArticles'),
            name: 't-append',
            meta: {title: '增加附言 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 't/update/:id',
            component: () => import('@/views/article/updateArticles'),
            name: 't-update',
            meta: {title: '编辑主题 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 'settings',
            component: () => import('@/views/settings/settings'),
            name: 'settings',
            meta: {title: '设置 - ' + window.common.webSiteName, requiredLogin: true}
        },
        {
            path: 'settings/:tab',
            component: () => import('@/views/settings/settings'),
            name: 'settings',
            meta: {title: '设置 - ' + window.common.webSiteName, requiredLogin: true}
        },
        {
            path: 'team',
            component: () => import('@/views/team/team'),
            name: 'team',
            meta: {title: '組 - ' + window.common.webSiteName, requiredLogin: false}
        },
        {
            path: 'team-details/:id',
            component: () => import('@/views/team/team-details'),
            name: 'team-details',
            meta: {title: '組详情 - ' + window.common.webSiteName, requiredLogin: true}
        },
        {
            path: 'notifications',
            component: () => import('@/views/user/notifications'),
            name: 'notifications',
            meta: {title: '消息通知 - ' + window.common.webSiteName, requiredLogin: true}
        },
        {
            path: 'new-notifications',
            component: () => import('@/views/user/newNotifications'),
            name: 'newNotifications',
            meta: {title: '新消息 - ' + window.common.webSiteName, requiredLogin: true}
        },
        {
            path: '/tools/jf',
            component: () => import('@/views/tools/JsonFormatViewer'),
            name: 'json-format',
            meta: {title: 'JSON格式化 - ' + window.common.webSiteName, requiredLogin: false}
        },
    ]
}

var concatRoutes = pageRoutes.concat(moduleRoutes);

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: concatRoutes
})

router.beforeEach((to, from, next) => {
    // 检查路由的 meta 属性中是否存在 title 值
    if (to.meta.title) {
        // 如果存在，则修改浏览器标题
        document.title = to.meta.title
    }

    if (to.meta.requiredLogin) {
        //console.log("校验登录")
        if (localStorage.LOGIN_FLG === undefined || localStorage.LOGIN_FLG === 'false' || !JSON.parse(localStorage.LOGIN_FLG)) {
            return next({name: 'login'})
        }
    }

    // 匹配不到路由就跳转到404页面
    if (to.matched.length === 0) {
        return next({name: '404'})
    }

    /*if (to.name !== 'login' && to.name !== 'signup' && to.name !== 'sign-up-complete' && to.name !== 'privacy-and-terms') {
      if (localStorage.LOGIN_FLG === undefined || localStorage.LOGIN_FLG === 'false' || !JSON.parse(localStorage.LOGIN_FLG)) {
        return next({ name: 'login' })
      }
    }*/

    return next()
})

export default router
