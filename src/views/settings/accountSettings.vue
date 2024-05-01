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
  <div>
      <div class="card mb-4">

          <!-- Title START -->
          <div class="card-header border-0 pb-0">
              <h1 class="h5 card-title">编辑您的个人资料</h1>
              <div class="alert alert-success" role="alert" v-if="saveSuccess">设置已成功保存</div>
          </div>
          <!-- Card header START -->
          <!-- Card body START -->
          <div class="card-body">
              <!-- Form settings START -->
              <form class="row g-3" @submit.prevent="dataFormSubmitHandle">
                  <div class="col-sm-12 ">
                      <label class="form-label">个人头像</label>
                      <div>
                        <img :src="loginUser.avatar" :alt="loginUser.nickname" class="rounded" style="width: 164px;height: 164px;" />
                      </div>
                  </div>
                  <div class="col-sm-12 ">
                      <label class="form-label">用户名</label>
                      <input type="text" class="form-control w-50" maxlength="10" placeholder="" v-model="loginUser.nickname">
                      <small class="text-secondary">用户名只能修改一次，请谨慎操作</small>
                  </div>
                  <div class="col-sm-12">
                      <label class="form-label">所在城市 </label>
                      <input type="text" class="form-control w-50" maxlength="10" v-model="loginUser.city" >
                  </div>
                  <div class="col-sm-12">
                      <label class="form-label">职业</label>
                      <input type="text" class="form-control w-50" maxlength="40"  placeholder="" v-model="loginUser.occupation">
                  </div>
                  <div class="col-sm-12">
                      <label class="form-label">手机号</label>
                      <input type="text" class="form-control w-50" maxlength="11" placeholder="" v-model="loginUser.phoneNumber">
                  </div>
                  <div class="col-sm-12">
                      <label class="form-label">Email</label>
                      <input type="text" class="form-control w-50" maxlength="60" placeholder="" v-model="loginUser.email" disabled>
                  </div>
                  <div class="col-sm-12">
                      <label class="form-label">个人简介</label>
                      <textarea class="form-control" rows="4" v-model="loginUser.introduction" placeholder="Description"></textarea>
                      <small v-if="loginUser.introduction">
                        字符限制：<span :style="loginUser.introduction.length > charLimit ? 'color:red' :''">{{loginUser.introduction.length}} / {{ charLimit }}</span>
                      </small>
                  </div>
                  <!-- Button  -->
                  <div class="col-12 text-end">
                      <button type="submit" class="btn btn-sm btn-primary-soft mb-0">保存修改</button>
                  </div>
              </form>
              <!-- Settings END -->
          </div>
          <!-- Card body END -->
      </div>

      <div class="card">
          <!-- Title START -->
          <div class="card-header border-0 pb-0">
              <h5 class="card-title">更新密码</h5>
            <div class="alert alert-success" role="alert" v-if="pwdSuccess">密码已成功修改</div>
          </div>
          <!-- Title START -->
          <div class="card-body">
              <!-- Settings START -->
              <form class="row g-3" @submit.prevent="changePwdSubmitHandle">
                  <!-- Current password -->
                  <div class="col-12">
                      <label class="form-label">当前密码</label>
                      <input type="password" class="form-control w-50" v-model="pwd.currentPwd" placeholder="" autocomplete="false">
                  </div>
                  <!-- New password -->
                  <div class="col-12">
                      <label class="form-label">新的密码</label>
                      <input class="form-control w-50" type="password" v-model="pwd.newPwd" id="psw-input" autocomplete="false" placeholder="">
                  </div>
                  <!-- Confirm password -->
                  <div class="col-12">
                      <label class="form-label">确认新的密码</label>
                      <input type="password" class="form-control w-50" v-model="pwd.confirmPwd" placeholder="">
                  </div>
                  <!-- Button  -->
                  <div class="col-12 text-end">
                      <button type="submit" class="btn btn-primary-soft mb-0" :disabled="pwd.newPwd && pwd.confirmPwd && pwd.newPwd !== pwd.confirmPwd">更新密码</button>
                  </div>
              </form>
              <!-- Settings END -->
          </div>
      </div>

  </div>
</template>

<script>
export default {
    name: "accountSettings",
    data() {
        return {
            //login: this.$store.state.loginFlg,
          loginUser: this.$store.state.authInfo,
          charLimit: 300,
          saveSuccess: false,
          pwdSuccess: false,
          pwd: {
              currentPwd:'',
              newPwd:'',
              confirmPwd:''
          }
        }
    },
    methods: {
        dataFormSubmitHandle() {
          if (this.loginUser.introduction && this.loginUser.introduction.length > this.charLimit) {
              alert('简介字符数超过限制')
            return
          }

            this.$http.post('/user/info/update', this.loginUser).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

              this.$store.commit("SET_AUTH_INFO", res.data)
              this.saveSuccess = true
              setTimeout(() => {
                this.saveSuccess = false
              }, 5000)

              //刷新当前
              //window.location.reload()
            }).catch(() => {})
        },
      changePwdSubmitHandle() {
        this.$http.post('/user/pwd/update', this.pwd).then(({ data: res }) => {
          if (res.code !== 200) {
            alert(res.msg)
            return
          }

          this.pwd = {
            currentPwd:'',
            newPwd:'',
            confirmPwd:''
          }

          this.pwdSuccess = true
          setTimeout(() => {
            this.pwdSuccess = false
          }, 5000)
        }).catch(() => {})
      }
    }
}
</script>

<style scoped>
.form-check-input:checked {
    background-color: #198754;
    border-color: #198754;
}
</style>