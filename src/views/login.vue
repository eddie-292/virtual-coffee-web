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
            欢迎回来 👋
          </h1>
          <h1 class="h5 fw-normal">登录您的帐户</h1>
            <p class="mb-2">Don't have an account?<a href="javascript:;" @click="$goTo('signup')"> Click here to sign up</a></p>

            <!--      错误提示      -->
            <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="errShow">
                {{errMsg}}
            </div>

          <div class="form-floating">
            <input type="email" class="form-control" v-model="dataForm.email" id="email" placeholder="email@example.com">
            <label for="email">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" v-model="dataForm.password" id="pwd" placeholder="Password">
            <label for="pwd">Password</label>
          </div>

          <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" v-model="dataForm.agree" id="flexCheckDefault">
            <label class="form-check-label">
              我已阅读并同意 <router-link target="_blank" to="/privacy-and-terms">用户服务协议与隐私条款</router-link>
            </label>
          </div>
          <button class="btn btn-primary-soft w-100 py-2" type="submit" :disabled="!dataForm.agree || singIn" >
              <span class="spinner-grow spinner-grow-sm" aria-hidden="true" v-if="singIn"></span> Sign in
          </button>
          <div class="w-100 py-2" v-if="enableGithubLogin">
            <a class="btn btn-primary-soft w-100" target="_blank" href="/oauth/github-render"> Github Sign in </a>
          </div>
          <div class="w-100 py-2" v-if="enableGoogleLogin">
              <div class="g_id_signin" id="g_id_signin"></div>
          </div>
          <p class="mt-5 mb-3 text-body-secondary">{{common.webSiteName}} <span class="text-secondary">{{ common.version }}</span> &copy; {{common.year}}</p>
          <p class="mb-3 text-body-secondary">
            <a class="text-body-secondary link-underline link-underline-opacity-0" href="https://beian.miit.gov.cn/" target="_blank">{{common.recordNum}}</a>
          </p>
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
          enableGoogleLogin: false,
          enableGithubLogin: false,
          errShow:false,
          errMsg: '',
          singIn: false,
          dataForm: {
              email:'',
              password: '',
              agree: false
          },
          common: {
              version: window.common.version,
              year: window.common.year,
              recordNum: window.common.recordNum,
              webSiteName: window.common.webSiteName
          },
          /**
           * The Auth2 parameters, as seen on
           * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
           * As the very least, a valid client_id must present.
           * @type {Object}
           */
          googleSignInParams: {
            client_id: '798963036893-1rgckgltr7tqncagbev8gdu7qbjtrmd7.apps.googleusercontent.com',
            loginUri:'/user/google-login'
          }
        }
    },
    created() {
      if (this.$route.params.reload) {
        window.location.reload();
      }
    },
    methods: {
        async handleCredentialResponse(response) {
            if (response) {
                const responsePayload = this.decodeJwtResponse(response.credential);
                const googleUserInfo = {
                    id: responsePayload.sub,
                    name: responsePayload.name,
                    givenName: responsePayload.given_name,
                    familyName: responsePayload.family_name,
                    picture: responsePayload.picture,
                    email: responsePayload.email,
                    locale: responsePayload.locale,
                }
                this.$http.post('/user/google-login', googleUserInfo).then(({ data: res }) => {
                    if (res.code !== 200) {
                        console.log(res)
                        return this.tips(res.msg)
                    }

                    Cookies.set('token', res.data.token)
                    this.$store.commit("SET_AUTH_INFO", res.data)
                    this.$store.commit("SET_LOGIN_FLG", true)
                    this.$goTo('home')
                }).catch(() => {})
            }
            return true;
        },
        decodeJwtResponse(token) { //加密
            const strings = token.split(".");
            return JSON.parse(
                decodeURIComponent(
                    escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))
                )
            );
        },
    dataFormSubmitHandle() {
      this.singIn = true;
      this.$http.post('/user/sign-in', this.dataForm).then(({ data: res }) => {
        this.singIn = false;
          if (res.code !== 200) {
              console.log(res)
              return this.tips(res.msg)
          }

          Cookies.set('token', res.data.token)

          if (res.data.accountStatus === 0) {
              //   注册未完成，跳到注册完成页面
              this.$store.commit("setSignupComplete", res.data)

              this.$goTo('sign-up-complete')
              return
          }

          this.$store.commit("SET_AUTH_INFO", res.data)
          this.$store.commit("SET_LOGIN_FLG", true)
          this.$goTo('home')
      }).catch(() => {
        this.singIn = false;
      })

    },
      tips (msg) {
          this.errMsg = msg;
          this.errShow = true
      }
  }
}
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>

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
