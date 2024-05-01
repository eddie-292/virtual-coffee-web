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

      <!--    用户发布内容    -->
      <div class="card mb-3" v-for="(item) in contentList" v-bind:key="item.id">
        <div class="card-header border-unset">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <!-- Info -->
              <div class="nav nav-divider">
                <span class="nav-item small">{{ item.createTime }} 发布</span>
              </div>
            </div>
            <!-- Card feed action dropdown START -->
            <div class="dropdown">
              <a href="javascript:;" class="text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                </svg>
              </a>
              <!-- Card feed action dropdown menu -->
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                <li>
                  <a class="dropdown-item" href="javascript:;" @click="favorite(item)">
                    <span> {{item.favorite ? '取消收藏' : '收藏'}}</span>
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="javascript:;" v-if="item.userId === loginUser.userId && item.batteryLevel <= 0" @click="remove(item)"> 删除</a></li>
                <li><a class="dropdown-item" href="javascript:;" @click="report(item.id)"> 报告此内容</a></li>
              </ul>
            </div>
            <!-- Card feed action dropdown END -->
          </div>
        </div>
        <div class="card-body">
          <div class="code_snippet" v-highlight v-html="item.content">
            {{item.content}}
          </div>
          <div v-if="item.articles" class="border-top mt-3 pt-3">
              <div v-for="(item) in JSON.parse(item.articles)" :key="item.id">
                  <i class="bi bi-link me-3"></i>
                  <router-link target="_blank" class="link-success link-underline-opacity-0" :to="{ name: 't', params: { id: item.id } }" >{{item.title}}</router-link>
              </div>
          </div>
        </div>
        <div style="border-top: 0px;" class="card-footer text-body-secondary">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <span class="d-flex align-items-center p-1 text-dark-emphasis " v-if="item.position === 'team'" title="在Groups中发布">
                <svg class="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M7.80914 18.7462V24.1907H13.2536V18.7462H7.80914Z" fill="#FF3270"></path><path d="M18.7458 18.7462V24.1907H24.1903V18.7462H18.7458Z" fill="#861FFF"></path><path d="M7.80914 7.80982V13.2543H13.2536V7.80982H7.80914Z" fill="#097EFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.41775C4 5.08246 5.08246 4 6.41775 4H14.6457C15.7626 4 16.7026 4.75724 16.9802 5.78629C18.1505 4.67902 19.7302 4 21.4685 4C25.0758 4 28.0003 6.92436 28.0003 10.5317C28.0003 12.27 27.3212 13.8497 26.2139 15.02C27.243 15.2977 28.0003 16.2376 28.0003 17.3545V25.5824C28.0003 26.9177 26.9177 28.0003 25.5824 28.0003H17.0635H14.9367H6.41775C5.08246 28.0003 4 26.9177 4 25.5824V15.1587V14.9367V6.41775ZM7.80952 7.80952V13.254H13.254V7.80952H7.80952ZM7.80952 24.1907V18.7462H13.254V24.1907H7.80952ZM18.7462 24.1907V18.7462H24.1907V24.1907H18.7462ZM18.7462 10.5317C18.7462 9.0283 19.9651 7.80952 21.4685 7.80952C22.9719 7.80952 24.1907 9.0283 24.1907 10.5317C24.1907 12.0352 22.9719 13.254 21.4685 13.254C19.9651 13.254 18.7462 12.0352 18.7462 10.5317Z" fill="black"></path><path d="M21.4681 7.80982C19.9647 7.80982 18.7458 9.02861 18.7458 10.5321C18.7458 12.0355 19.9647 13.2543 21.4681 13.2543C22.9715 13.2543 24.1903 12.0355 24.1903 10.5321C24.1903 9.02861 22.9715 7.80982 21.4681 7.80982Z" fill="#FFD702"></path></svg>
            </span>
            <span class="d-flex align-items-center p-1 text-dark-emphasis ">
              <Star50 :w="22"></Star50>
              <span style="margin-left: 2px;" v-if="item.batteryLevel > 0">{{item.batteryLevel}}</span>
            </span>
          </div>
        </div>
      </div>
      <!--    用户发布内容    -->

      <div class="text-center" v-if="contentList.length == 0 && !loadingStatus">
        <h5 class="text-secondary">
          <i class="bi bi-braces"></i>
          {{ global.NO_CONTENT }}
        </h5>
      </div>
      <div class="text-center" v-if="loadingStatus">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-4" v-if="contentList.length > 0">
        <div class="d-grid mt-3">
          <a class="btn btn-sm link-success" href="javascript:;" @click="viewMore" v-if="pages > 1 && pageNum < pages">
            View more
          </a>
          <div class="text-center text-secondary" v-if="pageNum >= pages"> No more </div>
        </div>
      </div>

    </div>
</template>

<script>
import Star50 from "@/views/component/Star50.vue";

export default {
    name: "post",
  components: {Star50},
    data() {
        return {
            global:window.global,
            contentList: [],
            pageNum: 1,
            pages: '',
            loadingStatus: false,
          login: this.$store.state.loginFlg,
          loginUser: this.$store.state.authInfo,
        }
    },
  mounted() {
    this.$nextTick(() => {
      this.refresh()
    })
  },
  methods: {
    refresh() {
      this.loadingStatus = true;
      this.$http.post('/feed/my/page', {pageNum: this.pageNum}).then(({ data: res }) => {
        this.loadingStatus = false;
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.contentList.push(...res.data.records)
        this.pages = res.data.pages
      }).catch(() => {
        this.loadingStatus = false;
      })
    },
    favorite(item) {
      this.$http.post('/feed/favorite', {id: item.id}).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }
        item.favorite = !item.favorite
      }).catch(() => {
      })
    },
    report(id) {
      this.$http.post('/feed/report', {id: id}).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }
      }).catch(() => {
      })
    },
    remove(item) {
      this.$http.post('/my-data/feed/remove', {id: item.id}).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.contentList.splice(this.contentList.indexOf(item), 1)
      }).catch(() => {
      })
    },
    viewMore() {
      this.pageNum += 1
      this.refresh()
    }
  }
}
</script>

<style>
p {
  margin-bottom: 0.1rem;
}
pre {
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 0rem;
}
.code_snippet img {
  width: 100%;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
<style scoped>

</style>