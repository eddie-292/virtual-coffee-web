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
              <div class="row g-4">
                  <!-- Card News START -->
                  <div class="col-sm-6 col-lg-12" v-if="1 > 1">
                      <div class="card">
                          <!-- Card header START -->
                          <div class="card-header pb-0 border-0">
                              <h5 class="card-title mb-0">最近主题</h5>
                          </div>
                          <!-- Card header END -->
                          <!-- Card body START -->
                          <div class="card-body">

                          </div>
                          <!-- Card body END -->
                      </div>
                  </div>

                  <div class="col-sm-6 col-lg-12">
                      <div class="card">
                          <div class="card-header pb-0 border-0">
                              <div class="card-title mb-1">TAGS </div>
                              <input type="text" v-model="filterText" class="form-control form-control-sm" placeholder="输入过滤关键词">
                          </div>
                          <div class="card-body" >
                              <div style="height: calc(100vh - 300px);overflow: auto;">
                                  <ul class="list-inline mb-0 d-flex flex-wrap gap-2">
                                      <li class="list-inline-item m-0" v-for="(item) in filteredTagList" v-bind:key="item.tagId" @click="filterTag(item)">
                                          <a class="btn btn-primary-soft btn-sm" href="javascript:;">{{item.title}}</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
              <!-- Right sidebar END -->
          </div> <!-- Row END -->

          <!-- Main content START -->
          <div class="col-lg-9">
              <div v-if="$store.state.loginFlg" class="mb-4">
                  <div v-if="$checkPermission('PUBLISH_TOPIC')">
                      <router-link class="btn btn-primary-soft ms-auto " to="/write">
                          创建主题
                      </router-link>
                  </div>
              </div>
              <div class="bg-mode ">
                  <h1 class="h4 mb-4" v-if="!tag">最新</h1>
                  <h1 class="h4 mb-4" v-else>关于 {{ tag }}</h1>

                  <div v-for="(item) in contentList" v-bind:key="item.articleId">
                      <!-- Blog item START -->
                      <div class="card bg-transparent border-0" >
                          <div class="row g-3">
                              <div class="">
                                  <div class="mb-2 d-grid d-md-flex justify-content-md-start align-items-center">
                                    <img class="rounded me-2" :src="item.avatar" width="24" height="24" alt="">
                                    <strong class="me-3">{{item.nickname}}</strong>
                                    <small class="text-secondary">{{item.createTime}}</small>
                                  </div>
                                  <div>
                                    <router-link class="fs-5 link-success text-reset link-underline link-underline-opacity-0" :to="{ name: 't', params: { id: item.articleId } }" >{{item.title}}</router-link>
                                  </div>
                                  <p class="mb-2 text-secondary small">{{item.summary}}</p>
                                  <div class="d-grid d-md-flex justify-content-md-start align-items-center">
                                      <span class=" text-secondary me-3">
                                        <a href="javascript:;" class="badge bg-success bg-opacity-10 text-success link-underline link-underline-opacity-0" >
                                            <i class="bi bi-chat-dots me-1"></i>{{ item.category }}
                                        </a>
                                      </span>
                                      <span class="small text-secondary me-3">
                                        <i class="bi bi-eye pe-1"></i>{{item.view}}
                                      </span>
                                      <span class="small text-secondary me-3" v-if="item.batteryLevel && item.batteryLevel > 0">
                                        <span class="d-flex align-items-center p-1 pe-2 text-dark-emphasis ">
                                          <Star50 :w="22"></Star50>
                                          <span style="margin-left: 2px;" v-if="item.batteryLevel > 0">{{item.batteryLevel}}</span>
                                        </span>
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- Blog item END -->
                      <hr class="my-4">
                  </div>
                  <!-- Blog item END -->

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
                          <div class="text-center text-secondary" v-if="pageNum >= pages"> No more </div>
                      </div>
                  </div>
                  <!-- Pagination -->

              </div>
          </div>
          <!-- Main content END -->


      </div>
  </div>
</template>

<script>

import Star50 from "@/views/component/Star50.vue";

export default {
    name: "articles",
  components: {Star50},
    data() {
        return {
            pageNum: 1,
            contentList: [],
            tagList: [],
            pages: 0,
            loadingStatus: false,
            tag:'',
            reload: false,
            filterText: '',
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.refresh()
            this.tags()
        })
    },
    computed: {
        filteredTagList() {
            return this.tagList.filter(tag => {
                // 根据关键词过滤标签列表
                return tag.tagName.toLowerCase().includes(this.filterText.toLowerCase()) ||
                    tag.title.toLowerCase().includes(this.filterText.toLowerCase());
            });
        }
    },
    methods: {
        refresh() {
            this.loadingStatus = true;
            this.$http.post('/article/page', {pageNum: this.pageNum, tag: this.tag}).then(({ data: res }) => {
                this.loadingStatus = false;
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                if (!this.reload) {
                    this.contentList.push(...res.data.records)
                } else {
                    this.contentList = res.data.records
                }
                this.pages = res.data.pages
            }).catch(() => {
                this.loadingStatus = false;
            })
        },
        viewMore() {
            this.pageNum += 1
            this.refresh()
        },
        tags() {
            this.$http.get('/article/tags').then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                this.tagList = res.data
            }).catch(() => {

            })
        },
        filterTag(tag) {
            this.tag = tag.tagName
            this.reload = true
            this.refresh()
        }
    }
}
</script>

<style scoped>
.page-link.active, .active > .page-link {
    z-index: 3;
    color: var(--bs-pagination-active-color);
    background-color: #1c8754;
    border-color: #1c8754;
}
.page-link {
    color: #1c8754;;
}
</style>