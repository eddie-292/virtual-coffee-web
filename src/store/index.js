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
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  authInfo: JSON.parse(localStorage.getItem("AUTH_INFO")) || {},
  loginFlg: (localStorage.getItem("LOGIN_FLG") === 'true' ? true : false),
  signupComplete: JSON.parse(localStorage.getItem("signupComplete")) || {},   // 继续完成注册
}

const getters = {
  authInfo: state => state.authInfo,
  loginFlg: state => state.loginFlg,
  signupComplete: state => state.signupComplete,
}

const mutations = {
  // 设置登录用户
  SET_AUTH_INFO(state, data) {
    localStorage.setItem("AUTH_INFO", JSON.stringify(data))
    state.authInfo = data
  },

  //设置登录状态
  SET_LOGIN_FLG(state, data) {
    state.loginFlg = data
    localStorage.setItem("LOGIN_FLG", data)
  },

  // 设置继续完成注册
  setSignupComplete(state, data) {
    state.signupComplete = data
    localStorage.setItem("signupComplete", JSON.stringify(data))
  },

  // 重置继续完成注册
  resetSignupComplete(state, data) {
    state.signupComplete = {}
    localStorage.setItem("signupComplete", JSON.stringify({}))
  },

  // 继续完成注册之前
  beforeSignup(state, data) {
    state.loginFlg = false
    localStorage.setItem("LOGIN_FLG", false) // 清除登录标记缓存
    localStorage.removeItem("AUTH_INFO") // 清除登录缓存
    localStorage.setItem("permissions", JSON.stringify([]))// 清除权限缓存
  },

  // 标记领取每日奖励
  setSignReward(state, data) {
    state.authInfo.dailyRewards = true
    state.authInfo.economy += data
    localStorage.setItem("AUTH_INFO", JSON.stringify(state.authInfo))
  },

  resetStore (state) {
    state.loginFlg = false
    localStorage.setItem("LOGIN_FLG", false) // 清除登录标记缓存
    localStorage.removeItem("sign-up-complete-avatar") // 清除头像缓存
    localStorage.removeItem("signupComplete") // 清除注册缓存
    localStorage.removeItem("AUTH_INFO") // 清除登录缓存
    localStorage.removeItem("referral") // 清除推荐人
    localStorage.setItem("permissions", JSON.stringify([]))// 清除权限缓存
  },
}

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  mutations,
})

