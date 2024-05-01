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
    <table class="table table-bordered" v-if="startsRecords.length > 0">
      <thead>
      <tr>
        <th scope="col">时间</th>
        <th scope="col">类型</th>
        <th scope="col">数量</th>
        <th scope="col">描述</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in  startsRecords" :key="item.id" >
        <td><small class="text-secondary">{{ item.time }}</small></td>
        <td>{{ item.msgType }}</td>
        <td>
          <strong :style="{color: item.type == 'add' ? 'green' : 'red'}">{{item.amount}}</strong>
        </td>
        <td v-html="item.description"></td>
      </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="text-center" v-if="loadingStatus">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="mt-4" v-if="startsRecords.length > 0">
      <div class="d-grid mt-3">
        <a class="btn btn-sm link-success" href="javascript:;" @click="viewMore" v-if="pages > 1 && pageNum < pages">
          View more
        </a>
        <div class="text-center text-secondary" v-if="pageNum >= pages"> No more </div>
      </div>
    </div>
    <!-- Pagination -->

  </div>
</template>

<script>
export default {
    name: "stars",
    data() {
        return {
            login: this.$store.state.loginFlg,
            loginUser: this.$store.state.authInfo,
            startsRecords: [],
            pageNum: 1,
            pages: 1,
            loadingStatus: true
        }
    },
    created() {

    },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    viewMore() {
      this.pageNum += 1
      this.getList()
    },
    getList() {
        this.$http.get('/user/stars-record?p=' + this.pageNum).then(({ data: res }) => {
          if (res.code !== 200) {
            alert(res.msg)
            return
          }

          this.loadingStatus = false

          this.startsRecords.push(...res.data.records)
          //this.startsRecords = res.data.records
          this.pages = res.data.pages
        }).catch(() => {})
      }
    }
}
</script>

<style>

</style>