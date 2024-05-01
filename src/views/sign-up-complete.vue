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
            <form  @submit.prevent="dataFormSubmitHandle">
                <img class="mb-4" src="../assets/logo.png" alt="" width="100" height="80">
                <h1 class="h3 mb-3 fw-normal">继续完成注册</h1>

                <!--      错误提示      -->
                <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="errShow" style="padding-right: 15px;">
                    {{errMsg}}
                    <div v-for="(tip, index) in tipsArray" :key="index" class="">{{index +1}}.{{tip}}</div>
                </div>

                <div class="form-floating mb-3 ">
                    <!-- Avatar upload START -->
                    <div class="d-flex align-items-center ">
                        <div class="avatar-uploader me-3">
                            <!-- Avatar edit -->
                            <div class="avatar-edit">
                                <input type="file" id="avatarUpload" accept=".png, .jpg, .jpeg"  @change="onFileChange">
                                <label for="avatarUpload">
                                    <svg style="color: #000;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                    </svg>
                                </label>
                            </div>
                            <!-- Avatar preview -->
                            <div class="avatar avatar-xl position-relative">
                                <img id="avatar-preview" class="avatar-img rounded-circle border border-white border-3 shadow" src="https://i.devnts.com/mygroup/default/group.png" alt="">
                            </div>
                            <div>
                              <!-- 上传进度 -->
                              <div style="height: 10px;border-bottom: 3px solid #17d17b;" :style="{width: uploadProgress + '%'}"></div>
                            </div>
                            <div class="mt-2">
                              <a href="javascript:;" @click="useDefaultAvatar" class="link-underline link-underline-opacity-0 link-success">使用默认头像</a>
                            </div>
                        </div>
                    </div>
                    <!-- Avatar upload END -->
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control rounded-3" v-model="signupComplete.email" id="email" readonly>
                    <label for="email">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control rounded-3" v-model="dataForm.nickname" id="nickname" maxlength="30" placeholder="">
                    <label for="nickname">用户名</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control rounded-3" autocomplete="off" v-model="dataForm.emailCode" id="emailCode" placeholder="">
                    <label for="city">验证码</label>
                </div>
                <div class="form-floating mb-3 d-flex">
                  <a @click="sendVerificationCode" class="btn btn-sm btn-primary-soft ms-auto">
                      <div class="spinner-border spinner-border-sm text-success" v-if="sendCodeOk" role="status">
                          <span class="visually-hidden">Loading...</span>
                      </div>
                      {{sendCodeMsg}}
                  </a>
                </div>
                <button class="btn btn-primary-soft w-100 py-2" type="submit" :disabled="complete">
                  <span class="spinner-grow spinner-grow-sm" aria-hidden="true" v-if="complete"></span> 完 成
                </button>
            </form>
        </main>

    </div>
</template>

<script>
import {getUPYunConfig} from '@/utils/UPYun.js'

export default {
    name: "sign-up-complete",
    data() {
        return {
            errShow: false,
            errMsg: '',
            tipsArray: [],
            complete: false,
            signupComplete: this.$store.state.signupComplete,
            uploadProgress: 0,
            sendCodeOk: false,
            sendCodeMsg: '发送验证码',
            defaultAvatar: 'https://i.devnts.com/avatar/default_avatar.png',
            dataForm: {
                nickname:'',
                username: '',
                avatar: '',
                introduction: '',
                city: '',
                emailCode: ''
            }
        }
    },
    mounted() {
        if (localStorage.signupComplete === '{}') {
            this.$goTo('login')
        }

        var avatar = localStorage.getItem('sign-up-complete-avatar');
        if (null != avatar) {
            this.dataForm.avatar = avatar
            document.getElementById("avatar-preview").src = this.dataForm.avatar;
        }

        try {
          this.dataForm.nickname = this.signupComplete.email.split('@')[0]
        } catch (e) {
            console.log(e)
        }

    },
    created() {
    },
    methods: {
        useDefaultAvatar() {
          this.dataForm.avatar = this.defaultAvatar
          document.getElementById("avatar-preview").src = this.dataForm.avatar;
        },
        sendVerificationCode() {
          if (this.sendCodeOk) {
            return;
          }

          this.sendCodeOk = true
          this.sendCodeMsg = "发送中..."

          const submitBody = {
            email: this.signupComplete.email,
            type: 'register'
          };
          this.$http.post('/email/verification-code', submitBody).then(({ data: res }) => {
            if (res.code !== 200) {
              this.sendCodeOk = false
              this.sendCodeMsg = "发送验证码"
              this.tips(res.msg)
              return;
            }

            this.sendCodeOk = false
            this.sendCodeMsg = "验证码已发送"
          }).catch(() => {
          })
        },
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {

              getUPYunConfig((d) => {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('policy', d.policy)
                formData.append('authorization', d.signature)
                const xhr = new XMLHttpRequest()
                xhr.timeout = 60000; // 60 秒
                xhr.open('POST', d.url)
                xhr.upload.addEventListener('progress', event => {
                  if (event.lengthComputable) {
                    this.uploadProgress = Math.round(
                        (event.loaded / event.total) * 100
                    )
                    console.log(this.uploadProgress)
                  }
                })
                xhr.onreadystatechange = () => {
                  if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                      const uploadResult = JSON.parse(xhr.responseText)
                      const  imgUrl = d.baseUrl + uploadResult.url;

                      this.dataForm.avatar = imgUrl
                      localStorage.setItem('sign-up-complete-avatar', this.dataForm.avatar)
                      //改变ID为avatar-preview的src
                      document.getElementById("avatar-preview").src = this.dataForm.avatar;

                    } else {
                      //上传错误
                      this.tips("上传头像时发生了错误")
                    }
                  }
                }
                xhr.ontimeout = function () {
                  console.log("请求超时");
                  this.tips("上传头像时发生了错误")
                };
                xhr.send(formData)
              });
            }
        },
        dataFormSubmitHandle() {
            if (!this.dataForm.avatar || this.dataForm.avatar.length === 0) {
                this.tips('请上传头像')
                return
            }

            if (!this.dataForm.nickname || this.dataForm.nickname.length === 0) {
                this.tips('请填写昵称')
                return
            }

            if (!this.dataForm.emailCode || this.dataForm.emailCode.length === 0) {
                this.tips('请填写验证码')
                return
            }

            this.complete = true
            this.$http.post('/user/sign-up-complete', this.dataForm).then(({ data: res }) => {
                this.complete = false
                if (res.code !== 200) {
                    //根据@分组
                    const split = res.msg.split('@');
                    if (split.length === 1) {
                        this.tips(split[0])
                    } else {
                        this.errShow = true
                        this.errMsg = ''
                        this.tipsArray = split
                    }
                    return
                }

                this.$store.commit("SET_AUTH_INFO", res.data)
                this.$store.commit("SET_LOGIN_FLG", true)

                this.$store.commit('resetSignupComplete')
                this.$goTo('home')
            }).catch(() => {
              this.complete = false
            })
        },
        tips (msg) {
            this.errMsg = msg;
            this.errShow = true
        },
        hideTips() {
            this.errShow = false
        }
    }
}
</script>

<style scoped>

.body {
    display: flex!important;
    height: 100vh;
}

.form-signin {
    max-width: 380px;
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

.avatar {
    height: 3rem;
    width: 3rem;
    position: relative;
    display: inline-block;
    -ms-flex-negative: 0 !important;
    flex-shrink: 0 !important;
}

.avatar-img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}

.avatar-lg {
    height: 4rem;
    width: 4rem;
}

.avatar-uploader .avatar-edit input {
    display: none;
}

.avatar-uploader .avatar-edit input + label {
    display: inline-block;
    width: 34px;
    height: 34px;
    text-align: -webkit-center;
    padding-top: 9%;
    margin-bottom: 0;
    border-radius: 100%;
    background: #eff2f6;
    border: 1px solid transparent;
    cursor: pointer;
    font-weight: normal;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.avatar-uploader .avatar-edit {
    position: absolute;
    right: 0;
    z-index: 1;
    top: 0;
}

.avatar-uploader {
    position: relative;
}


.avatar-xl {
    height: 5.125rem;
    width: 5.125rem;
}
</style>