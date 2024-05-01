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
          <h1 class="h5 card-title">更新隐私配置</h1>
          <div class="alert alert-success" role="alert" v-if="saveSuccess">设置已成功保存</div>
        </div>
        <!-- Card header START -->
        <!-- Card body START -->
        <div class="card-body">
        <form class="row g-3" @submit.prevent="dataFormSubmitHandle">
            <div class="col-sm-4 ">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" v-model="loginUser.publicFeeds">
                    <label class="form-check-label" for="inlineCheckbox1">在主页显示最近的Feed</label>
                </div>
            </div>
            <div class="col-sm-4 ">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" v-model="loginUser.publicTopics">
                <label class="form-check-label" for="inlineCheckbox2">在主页显示最近的Topic</label>
              </div>
            </div>

            <!-- Button  -->
            <div class="col-12 text-end">
                <button type="submit" class="btn btn-sm btn-primary-soft mb-0">保存修改</button>
            </div>
        </form>

        </div>
      </div>


<!--        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="emailPublic" >
            <label class="form-check-label" for="emailPublic">公开电子邮箱</label>
        </div>-->

    </div>
</template>

<script>
export default {
    name: "PrivacySecurity",
    data() {
        return {
          loginUser: this.$store.state.authInfo,
          saveSuccess: false,
        }
    },
    created() {

    },
    mounted() {
        this.$nextTick(() => {

        })
    },
    methods: {
        dataFormSubmitHandle () {
          const submitData = {
            publicFeeds: this.loginUser.publicFeeds ? 1 : 0,
            publicTopics: this.loginUser.publicTopics ? 1 : 0,
          };
          this.$http.post('/user/private/update', submitData).then(({ data: res }) => {
            if (res.code !== 200) {
              alert(res.msg)
              return
            }

            this.$store.commit("SET_AUTH_INFO", res.data)
            this.saveSuccess = true
            setTimeout(() => {
              this.saveSuccess = false
            }, 5000)
          }).catch(() => {})
        }
    }
}
</script>

<style>

</style>