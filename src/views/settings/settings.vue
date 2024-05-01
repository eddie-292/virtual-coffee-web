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
  <div class="row">
      <div class="col-lg-3">
          <div class="card w-100">
              <!-- Card body START -->
              <div class="card-body">
                  <!-- Side Nav START -->
                  <ul class="nav nav-tabs nav-pills nav-pills-soft flex-column fw-bold gap-2 border-0" role="tablist">
                      <li class="nav-item" >
                        <a class="nav-link d-flex mb-0" @click="clickTab('edit-account')" :class="tabIndex === 'edit-account' ? 'active' : ''" href="javascript:;" ><span>编辑账户</span></a>
                      </li>
                      <li class="nav-item" >
                          <a class="nav-link d-flex mb-0" @click="clickTab('stars')" :class="tabIndex === 'stars' ? 'active' : ''" href="javascript:;" ><span>星星</span></a>
                      </li>
                      <li class="nav-item" >
                          <a class="nav-link d-flex mb-0" @click="clickTab('privacy-security')" :class="tabIndex === 'privacy-security' ? 'active' : ''" href="javascript:;" ><span>隐私</span></a>
                      </li>
                      <li class="nav-item" >
                        <a class="nav-link d-flex mb-0" @click="clickTab('my-data')" :class="tabIndex === 'my-data' ? 'active' : ''" href="javascript:;" ><span>我的数据</span></a>
                      </li>
                  </ul>
                  <!-- Side Nav END -->
              </div>
              <!-- Card body END -->
          </div>
      </div>
      <div class="col-lg-6 vstack gap-4">
        <keep-alive>
          <AccountSettings v-if="tabIndex === 'edit-account' "/>
          <Stars v-if="tabIndex === 'stars' "/>
          <PrivacySecurity v-if="tabIndex === 'privacy-security' "/>
          <MyData v-if="tabIndex === 'my-data' " />
        </keep-alive>
      </div>
  </div>
</template>

<script>
import AccountSettings from "@/views/settings/accountSettings"
import Stars from "@/views/settings/Stars.vue"
import PrivacySecurity from "@/views/settings/PrivacySecurity.vue"
import MyData from "@/views/settings/MyData.vue";

export default {
    name: "settings",
    components: {
      MyData,
        AccountSettings, Stars, PrivacySecurity
    },
    data() {
        return {
            tabIndex: 'edit-account',
        }
    },
  created() {
      if (this.$route.params.tab) {
        this.tabIndex = this.$route.params.tab;
      }
  },
  methods: {
        clickTab(idx) {
            //this.tabIndex = idx;
            //在url中添加参数
            this.$router.push({ path: '/settings/' + idx });
        }
    }
}
</script>

<style scoped>
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    background-color: #19875430;
  color: #198754;
}
.nav-tabs .nav-link {
    border: unset;
}
.nav-link {
    color: #198754;
}
</style>