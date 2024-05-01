<!--
  - Copyright Statement and License Information for Virtual Coffee Kafeih.com Community
  -
  - Copyright Owner：Kafeih.com Community and its contributors, since the inception of the project.
  -
  - License Type：All code, documentation, and design works related to the Kafeih.com Community are licensed under the GNU Affero General Public License (AGPL) v3 or any later version.
  -
  - Use and Distribution：You are free to use, copy, modify, and distribute the code, documentation, and design works of the Kafeih.com Community, subject to the following conditions:
  -
  - 1. You must include the original copyright and license notices in all copies distributed or made publicly available.
  - 2. If you modify the code or design, or derive new works from those provided by the community, you must release these modifications or derivative works under the terms of the AGPLv3 license.
  - 3. Important Note: If you use the code or design of this community to provide network services, you must ensure that all users accessing the service through the network can access the corresponding source code.
  -
  - No Warranty：The Kafeih.com Community and its code, documentation, and design works are provided "as is" without any warranty, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
  -
  - License Acquisition：The complete text of the GNU Affero General Public License (AGPL) v3 can be found on the GNU official website.
  -
  - Please note that the above statement only applies to the Kafeih.com Community and the code, documentation, and design works provided by it. Third-party links or resources may be subject to different licenses from their respective owners or publishers. When using these resources, please be sure to comply with the terms of their respective licenses.
  -->

<template>
    <div class="body">

      <main class="form-signin w-100 m-auto">
        <form @submit.prevent="dataFormSubmitHandle" >
          <a href="/"><img class="mb-4" src="../assets/logo.png" alt="" width="100" height="80"></a>
          <h1 class="h3 mb-3 fw-normal">
            注册 🎉
          </h1>
          <h1 class="h5 fw-normal">成为网站会员</h1>
          <p class="mb-2">have an account?<a href="javascript:;" @click="$goTo('login')"> Click here to sign in</a></p>

            <!--      错误提示      -->
            <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="errShow">
                {{errMsg}}
            </div>

          <div class="form-floating mb-3">
            <input type="email" class="form-control rounded-3" v-model="dataForm.email" id="email" placeholder="email@example.com">
            <label for="email">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control rounded-3" v-model="dataForm.password" id="pwd" maxlength="16" placeholder="Password">
            <label for="pwd">Password</label>
          </div>
          <div class="form-floating">
              <input type="password" class="form-control rounded-3" v-model="dataForm.confirmPassword" id="confirmPwd" maxlength="16" placeholder="Password">
              <label for="confirmPwd">Confirm password</label>
          </div>
          <div class="form-floating">
            <input type="text" class="form-control rounded-3" v-model="dataForm.invitationCode" id="invitationCode" maxlength="10" placeholder="Password">
            <label for="invitationCode">邀请码</label>
          </div>
          <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" v-model="dataForm.agree" id="flexCheckDefault">
            <label class="form-check-label">
              我已阅读并同意 <router-link target="_blank" to="/privacy-and-terms">用户服务协议与隐私条款</router-link>
            </label>
          </div>
          <button class="btn btn-primary-soft w-100 py-2" type="submit" :disabled="!dataForm.agree || signUp">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true" v-if="signUp"></span> Sign me up
          </button>
          <p class="mt-5 mb-3 text-body-secondary">{{common.webSiteName}} <span class="text-secondary">{{ common.version }}</span> &copy; {{common.year}}</p>
          <p class="mb-3 text-body-secondary">
            <a data-v-1c9e004c="" target="_blank" href="https://www.upyun.com/?utm_source=lianmeng&amp;utm_medium=referral">
              <img data-v-1c9e004c="" src="../assets/ypy.png" style="width: 100px;background-color: rgb(25, 135, 84);border-radius: 5px;padding: 0 10px;">
            </a>
          </p>
        </form>
      </main>

    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getUUID } from '@/utils'
export default {
    data() {
        return {
          errShow:false,
          errMsg: '',
          signUp: false,
          dataForm: {
              email:'',
              password: '',
              confirmPassword: '',
              invitationCode: localStorage.getItem('referral') || '',
              agree: false,
              referral: localStorage.getItem('referral') || ''
          },
          common: {
            version: window.common.version,
            year: window.common.year,
            recordNum: window.common.recordNum,
            webSiteName: window.common.webSiteName
          },
        }
    },
  created() {
    this.clearLoginCache()
  },
  methods: {
    clearLoginCache() {
      this.$store.commit('beforeSignup')
      this.$http.post('/user/sign-out', this.dataForm).then(({data: res}) => {
        if (res.code !== 200) {
          console.log(res.msg)
          return
        }
      }).catch(() => {
      })
    },
    dataFormSubmitHandle() {
      if (!this.dataForm.email || !this.dataForm.password || !this.dataForm.confirmPassword) {
        this.tips('请填写完整信息')
        return
      }

      if (this.dataForm.password !== this.dataForm.confirmPassword) {
          this.tips('两次密码不一致')
          return
      }

      if (!this.dataForm.agree) {
          this.tips('请先阅读并同意用户服务协议与隐私条款')
          return
      }

      if (!this.dataForm.invitationCode) {
          this.tips('请填写邀请码')
          return
      }

      this.signUp = true
      this.$http.post('/user/sign-up', this.dataForm).then(({ data: res }) => {
        this.signUp = false

          if (res.code !== 200) {
              console.log(res)
              return this.tips(res.msg)
          }

          Cookies.set('token', res.data.token)

          if (res.data.accountStatus === 0) {
              // 删除referral
              localStorage.removeItem('referral')

              //   注册未完成，跳到注册完成页面
              this.$store.commit("setSignupComplete", res.data)

              this.$goTo('sign-up-complete')
          } else {
              this.$goTo('home')
          }

      }).catch(() => {
        this.signUp = false
      })

    },
      tips (msg) {
          this.errMsg = msg;
          this.errShow = true
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.body {
  display: flex!important;
  height: 100vh;
}

.form-signin {
  max-width: 430px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
