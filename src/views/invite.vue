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
    <div class="row g-4">
      <div class="col-lg-3">
        <LeftTable></LeftTable>
      </div>
      <div class="col-lg-6 gap-4">

        <div class="card">
          <div class="card-header">
            <h3 class="m-0">Referral</h3>
          </div>
          <div class="card-body text-center">
            <div class="text-center mb-4" v-if="loading">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <p>
              正在转到 <strong>{{ member }}</strong> 的推荐链接
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftTable from "@/views/user/leftTable.vue";

export default {
  components: {LeftTable},
  data() {
    return {
      member: '',
      loading: true
    }
  },
  methods: {},
  props: {
    msg: String
  },
  created() {
    if (this.$route.params.member) {
      this.member = this.$route.params.member

      // Simulate loading
      setTimeout(() => {
        //将Referral用户保存到本地存储
        localStorage.setItem('referral', this.member)
        //将用户转到注册页面
        this.$router.push({ name:  'signup' })
      }, 1000)
    } else {
      // to 404
      this.$router.push({ name:  '404' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
