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
    <!--    编辑器    -->
      <div class="">
          <CommentEditor ref="commentEditorRef" @refresh-list="refresh" @reload="reload" @clear-data="clearData" v-if="$store.state.loginFlg" :title="title" :bizId="bizId" :reply-id="replyId" :reply-name="replyName"></CommentEditor>
      </div>

    <div class="list-group mb-3">


      <a class="list-group-item align-items-center border-0 border-bottom pt-4" v-for="(item) in contentList" :key="item.commentId">
        <div class="d-flex text-muted pt-3">
          <img :src="item.avatar" :alt="item.nickname" width="38" height="38" class="bd-placeholder-img flex-shrink-0 me-2 rounded" loading="lazy">
          <p class="pb-3 mb-0 small lh-sm">
            <router-link target="_blank" :to="{ name: 'member', params: { id: item.userId } }" class="link-success link-underline-opacity-0">
                <strong class="d-block text-gray-dark fs-6">{{item.nickname}}</strong>
            </router-link>
            <span class="text-secondary">{{item.publishTime}}</span>
          </p>
        </div>
        <div class="mt-2">
          <div style="padding-left: 42px;">
            <div class="comment-content" v-highlight v-html="item.content"></div>
          </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end align-items-center mt-1" >
          <a class="text-secondary pe-2 fs-5" title="OP" href="javascript:;" v-if="item.userId === articleCreatorUserId"><span class="badge bg-success-subtle text-success-emphasis">OP</span></a>
          <a class="text-secondary pe-2 link-underline link-underline-opacity-0" title="感谢" href="javascript:;" @click="thank(item)">
            <span class="d-flex align-items-center p-1 pe-2 text-dark-emphasis ">
              <Star50 :w="24"></Star50>
              <span style="margin-left: 2px;" v-if="item.likeCount > 0">{{item.likeCount}}</span>
            </span>
          </a>
          <a class="text-secondary pe-2 fs-5" title="回复" href="javascript:;" v-if="$store.state.loginFlg && item.userId !== $store.state.authInfo.userId" @click="reply(item.username, item.userId)">
            <i class="bi bi-reply"></i>
          </a>
        </div>
      </a>


    </div>

    <!-- Pagination -->
    <div class="text-center" v-if="loadingStatus">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="mt-4" v-if="contentList.length > 0">
      <div class="d-grid mt-3">
        <a class="btn btn-sm link-success" href="javascript:;" @click="viewMore" v-if="pages > 1 && pageNum < pages">
          View more
        </a>
        <div class="text-center text-secondary" v-if="pageNum >= pages"> No more</div>
      </div>
    </div>
    <!-- Pagination -->

  </div>
</template>

<script>
import CommentEditor from "@/views/comment-editor.vue";
import Star50 from "@/views/component/Star50.vue";
export default {
  components: {Star50, CommentEditor},
  name: "CommentFloor",
  props: {
    bizId: String,
    title: String,
    articleCreatorUserId: String
  },
  data() {
    return {
      loadingStatus: true,
      pageNum: 1,
      pages: '',
      contentList: [],
      reloadData: false,
      replyName: '',
      replyId: ''
    }
  },
  created() {
    if (this.bizId) {
      this.refresh()
    } else {
      // 延时加载
      setTimeout(() => {
        this.refresh()
      }, 1500)
    }
  },
  methods: {
    reply(nickname, userId) {
      this.replyName = nickname;
      this.replyId = userId
      this.$refs.commentEditorRef.atUser(nickname)
    },
    viewMore() {
      this.pageNum += 1
      this.refresh()
    },
    refresh() {
      const submitData = {
        pageNum: this.pageNum,
        bizId: this.bizId
      };
      this.$http.post('/article/comment/page', submitData).then(({ data: res }) => {
        this.loadingStatus = false;
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        if (this.reloadData) {
          this.contentList = res.data.records
          this.reloadData = false
        } else {
          this.contentList.push(...res.data.records)
        }

        this.pages = res.data.pages
      }).catch(() => {
        this.loadingStatus = false;
      })
    },
    reload() {
      this.reloadData = true
      this.refresh()
    },
    clearData() {
      this.replyName = ''
      this.replyId = ''
    },
    thank(item) {
      if (!this.$store.state.loginFlg) {
        return
      }
      if (item.userId === this.$store.state.authInfo.userId) {
        return
      }

      this.$http.post('/article/comment/thank', {id: item.commentId}).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        item.likeCount += 1
      }).catch(() => {
      })
    }
  }
}
</script>

<style>
.comment-content img {
  max-width: 50%;
  height: auto;
}
</style>