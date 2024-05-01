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
    <!-- 加载状态展示 -->
    <div class="row g-4" v-show="!pageOk">
      <div class="col">
        <PageLoading></PageLoading>
      </div>
    </div>
    <!-- 消息通知内容展示 -->
    <div class="row g-4" v-show="pageOk">
      <div class="col-lg-3">
        <LeftTable></LeftTable>
      </div>
      <div class="col-md-8 col-lg-9 gap-4">
        <div class="col">
          <div class="d-flex gap-2">
            <h3 class="mb-4">Notifications</h3>
            <div class="ms-auto">
              <router-link class="btn btn-primary-soft ms-auto w-100" target="_blank" to="/new-notifications" v-if="$checkPermission('POST_NOTICE')">新增通知</router-link>
            </div>
          </div>

          <div v-if="messages.length == 0">
            <h5 class="text-secondary">
              <i class="bi bi-braces"></i>
              {{ global.NO_CONTENT }}
            </h5>
          </div>

          <!-- 消息列表 -->
          <ul class="list-group mb-4 mt-4" v-if="messages.length > 0">
              <li class="list-group-item  justify-content-between align-items-center" >
                  <!-- 分页控件 -->
                  <nav aria-label="Page navigation pagination-sm" v-if="pages > 0">
                      <ul class="pagination">
                          <li class="page-item" :class="{ disabled: currentPage === 1 }">
                              <a class="page-link text-success" href="#" @click.prevent="prevPage"><i class="bi bi-caret-left"></i></a>
                          </li>
                          <li class="page-item" v-for="pageNumber in displayedPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
                              <a class="page-link text-success" href="#" @click.prevent="changePage(pageNumber)"  style="outline: none;">{{ pageNumber }}</a>
                          </li>
                          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                              <a class="page-link text-success" href="#" @click.prevent="nextPage"><i class="bi bi-caret-right"></i></a>
                          </li>
                      </ul>
                  </nav>
              </li>

            <li v-for="(item) in messages" @click="viewNtf(item)" :key="item.notificationId" class="list-group-item list-group-item-action justify-content-between align-items-center" style="cursor: pointer;">
              <div class="mb-1">
                <span class="text-secondary pe-4">{{item.createdAt}}</span>
              </div>
              <div v-html="item.title || item.content"></div>
            </li>

              <li class="list-group-item  justify-content-between align-items-center" >
                  <!-- 分页控件 -->
                  <nav aria-label="Page navigation pagination-sm" v-if="pages > 0">
                      <ul class="pagination">
                          <li class="page-item" :class="{ disabled: currentPage === 1 }">
                              <a class="page-link text-success" href="#" @click.prevent="prevPage"><i class="bi bi-caret-left"></i></a>
                          </li>
                          <li class="page-item" v-for="pageNumber in displayedPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
                              <a class="page-link text-success" href="#" @click.prevent="changePage(pageNumber)"  style="outline: none;">{{ pageNumber }}</a>
                          </li>
                          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                              <a class="page-link text-success" href="#" @click.prevent="nextPage"><i class="bi bi-caret-right"></i></a>
                          </li>
                      </ul>
                  </nav>
              </li>
          </ul>


        </div>
      </div>

    </div>


    <!--    查看-->
    <div class="modal modal-xl fade" id="ntfContentModal" tabindex="-1" aria-labelledby="ntfContentModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" v-html="viewNtfObj.title"></h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-html="viewNtfObj.content" v-highlight style="overflow: auto;max-height: calc(100vh - 200px)">

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PageLoading from "@/views/pageLoading.vue";
import LeftTable from "@/views/user/leftTable.vue";

export default {
  components: {LeftTable, PageLoading},
  name: 'Notifications',
  data() {
    return {
      global:window.global,
      pageOk: false,
      viewNtfObj: {},
      messages: [], // 消息数据
      itemsPerPage: 20, // 每页显示的消息数量
      currentPage: 1, // 当前页码,
      total: 0, // 数据总量
      pages: 0, //总页数
    }
  },
  created() {
    this.getNotifications();
    this.clearUnread();
  },
  methods: {
    viewNtf(item) {
        if (item.title) {
          this.viewNtfObj = item
          this.$Modal.getOrCreateInstance('#ntfContentModal').show()
        }
    },
    //消除未读
    clearUnread() {
      localStorage.removeItem("unreadNoticeCount")
      this.$http.post('/user/unread-notice-count/clear').then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }
      }).catch(() => {

      })
    },
    getNotifications() {
      // 查询 /notifications 接口
      this.$http.get('/notifications?p=' + this.currentPage).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.messages = res.data.records
        this.total = res.data.total
        this.pages = res.data.pages
        this.pageOk = true;
      }).catch(() => {

      })
    },
    // 切换到上一页
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getNotifications();
      }
    },
    // 切换到下一页
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getNotifications();
      }
    },
    // 切换到指定页码
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.getNotifications();
    }
  },
  computed: {
    // 总页数
    totalPages() {
      return this.pages;
    },
    // 显示的页码列表
    displayedPages() {
      const totalPages = this.totalPages; // 总页数
      let currentPage = this.currentPage; // 当前页
      const displayedPages = []; // 存储要显示的页码数组

      let startPage, endPage; // 起始页和结束页

      // 确保当前页在合理范围内
      currentPage = Math.max(1, Math.min(currentPage, totalPages));

      if (totalPages <= 10) {
        // 如果总页数小于或等于10，显示所有页
        startPage = 1;
        endPage = totalPages;
      } else if (currentPage <= 6) {
        // 显示前9页和最后一页
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        // 显示最后9页和第一页
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        // 显示当前页周围的页码
        startPage = currentPage - 4;
        endPage = currentPage + 5;
      }

      // 添加第一页
      displayedPages.push(1);

      // 添加当前页及其周围的页码
      for (let i = startPage; i <= endPage; i++) {
        displayedPages.push(i);
      }

      // 添加最后一页
      displayedPages.push(totalPages);

      // 移除重复的页码并返回
      return [...new Set(displayedPages)];
    }
  }
}
</script>

<style >
p {
  margin-bottom: 0.1rem;
}
</style>
