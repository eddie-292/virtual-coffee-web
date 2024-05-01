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

    <h2>Feeds</h2>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>创建时间</th>
        <th>内容</th>
        <th>获得星星</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(feed, index) in contentList" :key="index">
        <td>{{ feed.createTime }}</td>
        <td>
          <a href="javascript:;" class="link-success link-underline link-underline-opacity-0" @click="view(feed)">预览</a>
        </td>
        <td>{{ feed.batteryLevel }}</td>
        <td>
          <a href="javascript:;" v-if="feed.batteryLevel <= 0" @click="remove(feed)" class="link-danger link-underline link-underline-opacity-0">删除</a>
        </td>
      </tr>
      <tr>
        <td colspan="4" class="">
          <nav aria-label="Page navigation w-100 pagination-sm" v-if="pages > 0">
            <ul class="pagination m-0">
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
        </td>
      </tr>
      </tbody>
    </table>

    <!--    查看-->
    <div class="modal fade" id="ntfContentModal" tabindex="-1" aria-labelledby="ntfContentModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Feed预览</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-html="viewContent" v-highlight style="overflow: auto;max-height: calc(100vh - 200px)">

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
export default {
  data() {
    return {
      currentPage: 1, // 当前页码,
      total: 0, // 数据总量
      pages: 0, //总页数,
      contentList: [],
      viewContent:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
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
    view(feed) {
      this.viewContent = feed.content
      this.$Modal.getOrCreateInstance('#ntfContentModal').show()
    },
    getData() {
      const submitData = {
        pageNum: this.currentPage
      };
      this.$http.post('/my-data/feeds', submitData).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.contentList = res.data.records
        this.pages = res.data.pages
      }).catch(() => {

      })
    },
    // 切换到上一页
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getData();
      }
    },
    // 切换到下一页
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getData();
      }
    },
    // 切换到指定页码
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.getData();
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

<style scoped>

</style>
