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
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import http from '@/utils/request'

import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

//图片懒加载
Vue.directive('lazyload', {
  inserted: function (el, binding) {
    const options = {
      rootMargin: '50px', // 可视窗口边缘的距离
      threshold: 0.01 // 图片可见度达到多少时开始加载
    }

    const lazyLoadObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = binding.value
          lazyLoadObserver.unobserve(img)
        }
      })
    }, options)

    lazyLoadObserver.observe(el)
  }
})

// 需要先导入 jQuery，然后再导入 Bootstrap

import {Modal} from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import './color-modes.js' //color-modes
import './custom-bootstrap.css';

import {goTo,goToP} from '@/router/goTo'

import Push from 'push.js'
// 如果全局使用在main.js引入后，进行挂载：
Vue.prototype.Push = Push

// 引入 highlight.js 代码高亮工具
import hljs from "highlight.js";
// 使用样式，有多种样式可选
import "highlight.js/styles/atom-one-dark.css";

// 增加自定义命令v-highlight
Vue.directive("highlight", function(el) {
  let blocks = el.querySelectorAll("pre");
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});

// 增加组定义属性，用于在代码中预处理代码格式
Vue.prototype.$hljs = hljs;
Vue.prototype.$http = http
Vue.prototype.$goTo = goTo;
Vue.prototype.$goToP = goToP;
Vue.prototype.$Modal = Modal;

// ================================= Permissions ================================
// 在Vue实例中设置全局数据
const globalData = {
  userPermissions: getPermissions()
};

// 获取localStorage中的数据
function getPermissions() {
  const userPermissions = localStorage.getItem('permissions');
    if (userPermissions) {
      return JSON.parse(userPermissions).map(i => i.permission_code)
    }
    return []
}

// 在Vue实例中定义checkPermission方法
Vue.prototype.$checkPermission = function(permission) {
  return this.$root.$data.userPermissions.includes(permission) || this.$root.$data.userPermissions.includes('ALL_PERMISSIONS')
};
// ================================= Permissions ================================

Vue.config.productionTip = false
new Vue({
  data: globalData,
  router,  store,
  render: h => h(App),
})
    .$mount('#app')
