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
        <div class="row g-4" v-show="!pageOk">
            <div>
                <PageLoading></PageLoading>
            </div>
        </div>
        <div class="row g-4" v-show="pageOk">
                <div class="col-lg-3">
                  <div class="mb-4">
                    <LeftTable></LeftTable>
                  </div>
                </div>
                <div class="col-md-8 col-lg-6 gap-4">

                    <!--    编辑器    -->
                    <CodeEditor ref="codeEditor" position="home" @refresh-list="refresh" @reload="reload" v-if="$store.state.loginFlg"></CodeEditor>

                    <!--    新团队列表    -->
                    <div class="card mb-4 border-0 card-bg-index" v-if="teamNewList.length > 0" >
                        <div class="card-body">
                            <h5 class="card-title">最近创建的組</h5>
                            <div style="overflow: auto;display: -webkit-box;padding-bottom: 20px;">
                                <div v-for="(item) in teamNewList" v-bind:key="item.id" >
                                    <router-link target="_blank" :to="{ name: 'team-details', params: { id: item.teamId } }" class="link-underline link-underline-opacity-0 link-success" :title="item.teamName">
                                        <img style="width: 100px;height: 100px;" class="square img-thumbnail" :src="item.teamImageUrl" alt="">
                                        <div class="teamText">
                                            <span>{{ item.teamName }}</span>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--    用户发布内容    -->
                    <div class="card mb-3" v-for="(item) in contentList" v-bind:key="item.id">
                        <div class="card-header border-unset">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <!-- Avatar -->
                                    <div class="avatar avatar-story me-2" v-if="!item.anonymize">
                                        <router-link target="_blank" :to="{ name: 'member', params: { id: item.userId } }">
                                            <img class="avatar-img rounded" :src="item.authorImg" alt="">
                                        </router-link>
                                    </div>
                                    <!-- Info -->
                                    <div>
                                        <div class="nav nav-divider">
                                            <h6 class="nav-item card-title mb-0 " v-if="!item.anonymize">
                                                <router-link target="_blank" :to="{ name: 'member', params: { id: item.userId } }" class="link-success link-underline link-underline-opacity-0">
                                                    <strong>{{ item.author }}</strong>
                                                </router-link>
                                            </h6>
                                          <h6 class="nav-item card-title mb-0 " v-if="item.anonymize">
                                            <strong class="link-success link-underline link-underline-opacity-0">{{ item.author }}</strong>
                                          </h6>
                                            <span class="nav-item small text-secondary">&nbsp;&nbsp;{{ item.createTime }}</span>
                                        </div>
                                        <p class="mb-0 small text-secondary">{{ item.authorDesc }}</p>
                                    </div>
                                </div>
                                <!-- Card feed action dropdown START -->
                                <div class="dropdown">
                                    <a href="javascript:;" class="text-secondary btn btn-secondary-soft-hover py-1 px-2" v-if="$store.state.loginFlg" @click="reply(item)">
                                        <i class="bi bi-reply"></i>
                                    </a>
                                    <a href="javascript:;" class="text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                        </svg>
                                    </a>
                                    <!-- Card feed action dropdown menu -->
                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                        <li>
                                            <a class="dropdown-item" href="javascript:;" @click="favorite(item)" :class="$store.state.loginFlg ? '' : 'disabled'" >
                                                <span> {{item.favorite ? '取消收藏' : '收藏'}}</span>
                                            </a>
                                        </li>
                                        <li><a class="dropdown-item" href="javascript:;" @click="reply(item)" :class="$store.state.loginFlg ? '' : 'disabled'"> 回复</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="javascript:;" v-if="$checkPermission('DELETE_FEED') && $store.state.loginFlg && item.userId === loginUser.userId && item.batteryLevel === 0" @click="remove(item)" :class="$store.state.loginFlg ? '' : 'disabled'"> 删除</a></li>
                                        <li><a class="dropdown-item" href="javascript:;" @click="report(item.id)" :class="$store.state.loginFlg ? '' : 'disabled'"> 报告此内容</a></li>
                                        <li><a class="dropdown-item" href="javascript:;" v-if="$checkPermission('MOVE_FEED')" @click="moveFeedOpen(item)" :class="$store.state.loginFlg ? '' : 'disabled'"> 移动</a></li>
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
                        <div style="border-top: 0px;" class="card-footer text-body-secondary" v-if="!item.anonymize">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end align-items-center" >
                                <div v-if="item.spam === 1" title="疑似SPAM" class="me-2">
                                    <span class="btn btn-sm disabled border-0" >疑似SPAM</span>
                                </div>
                                <div v-if="$store.state.loginFlg && item.userId != loginUser.userId">
                                    <span class="btn btn-sm disabled border-0" v-if="rechargeError === item.id" v-text="rechargeErrorMsg"></span>
                                    <a type="button" class="btn btn-sm" @click="recharge(item)">
                                      <span class="d-flex align-items-center p-1 pe-2 text-dark-emphasis ">
                                        <Star50 :w="24"></Star50>
                                        <span style="margin-left: 2px;" v-if="item.batteryLevel > 0">{{item.batteryLevel}}</span>
                                      </span>
                                    </a>
                                </div>
                                <div v-else>
                                  <span class="d-flex align-items-center p-1 pe-2 text-dark-emphasis ">
                                    <Star50 :w="24"></Star50>
                                    <span style="margin-left: 2px;" v-if="item.batteryLevel > 0">{{item.batteryLevel}}</span>
                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--    用户发布内容    -->


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

          <div class="col-lg-3 mb-3">
              <div class="card mb-3">
                  <!-- Card header START -->
                  <div class="card-header pb-0 border-0 d-flex">
                      <div class="card-title mb-0">WHO TO FOLLOW</div>
                      <a class="ms-auto link-success link-underline link-underline-opacity-0" href="javascript:;" @click="whoFollows">Refresh</a>
                  </div>
                  <!-- Card header END -->

                  <!-- Card body START -->
                  <div class="card-body">
                      <!-- Connection item START -->
                      <div class="text-center" style="font-size: 4rem;" v-if="whoToFollowList.length === 0">
                          <i class="bi bi-calendar2-heart"></i>
                      </div>
                      <div class="hstack gap-2 mb-3" v-for="(item) in whoToFollowList" v-bind:key="item.id">
                          <!-- Avatar -->
                          <div class="">
                              <router-link target="_blank" :to="{ name: 'member', params: { id: item.userId } }" class="link-success link-underline link-underline-opacity-0">
                                  <img class="rounded" style="height: 32px;width: 32px;" :src="item.avatar" alt="">
                              </router-link>
                          </div>
                          <!-- Title -->
                          <div class="overflow-hidden">
                              <router-link target="_blank" :to="{ name: 'member', params: { id: item.userId } }" class="link-success link-underline link-underline-opacity-0 h6 mb-0 link-underline link-underline-opacity-0">
                                  <strong>{{ item.nickname }}</strong>
                              </router-link>
                              <p class="mb-0 small text-truncate">{{ item.introduction }}</p>
                          </div>
                          <!-- Button -->
                          <a class="icon-link icon-link-hover link-success link-underline-success link-underline-opacity-25 ms-auto" href="javascript:;" v-if="!item.followed && $store.state.loginFlg" @click="follow(item)">
                              <i class="bi bi-person-check-fill" ></i>
                          </a>
                          <a class="icon-link icon-link-hover link-danger link-underline-danger link-underline-opacity-25 ms-auto" href="javascript:;" v-if="item.followed && $store.state.loginFlg" @click="follow(item)">
                              <i class="bi bi-person-dash-fill" ></i>
                          </a>
                      </div>
                      <!-- Connection item END -->
                  </div>
                  <!-- Card body END -->
              </div>

              <div class="card" v-if="recentArticles && recentArticles.length > 0">
                <!-- Card header START -->
                <div class="card-header pb-0 border-0 d-flex">
                  <div class="card-title mb-0">RECENT TOPICS</div>
                  <a class="ms-auto link-success link-underline link-underline-opacity-0" @click="clearRecentArticles" href="javascript:;">Clear</a>
                </div>
                <!-- Card header END -->

                <!-- Card body START -->
                <div class="card-body">
                  <!-- Connection item START -->
                  <div v-for="(item) in recentArticles" v-bind:key="item.articleId">
                    <!-- Blog item START -->
                    <div class="card bg-transparent border-0" >
                      <div class="row g-3">
                        <div class="">
                          <!-- Blog caption -->
                            <div>
                              <small>
                                  <router-link target="_blank" class="btn-link stretched-link text-reset link-underline link-underline-opacity-0" :to="{ name: 't', params: { id: item.articleId } }" >{{item.title}}</router-link>
                              </small>
                            </div>
                          <div class="d-none d-sm-inline-block">
                            <p class="mb-2">{{item.summary}}</p>
                            <!-- BLog date -->
                            <span class=" text-secondary me-3">
                              <a href="javascript:;" class="badge bg-success bg-opacity-10 text-success fw-bold link-underline link-underline-opacity-0" >
                                  <i class="bi bi-chat-dots me-1"></i>{{ item.category }}
                              </a>
                            </span>
                            <span class="small text-secondary me-3" v-if="item.view && item.view > 0">
                              <i class="bi bi-eye pe-1"></i>{{item.view}}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Blog item END -->
                    <hr>
                  </div>
                  <!-- Connection item END -->
                </div>
                <!-- Card body END -->
              </div>

          </div>


          </div>

<!--        移动-->
        <div class="modal fade " id="moveFeedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">移动Feed</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-0">
                        <ul class="list-group">
                            <li class="list-group-item border-0">
                                <input type="text" v-model="moveTeamFilterText" class="form-control form-control-sm" placeholder="输入过滤关键词">
                            </li>
                            <div style="height: 500px;overflow:auto;">
                                <li class="list-group-item border-0" v-for="(item) in filteredTeamList">
                                    <input class="form-check-input me-1" type="radio" name="listGroupRadio" :value="item.teamId" :id="item.teamId" v-model="moveGroupId">
                                    <label class="form-check-label" :for="item.teamId">{{ item.teamName }} {{item.isPublic ? 'Public' : 'Private'}}</label>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-secondary-soft" @click="getMoveTeamList">Refresh</button>
                        <button type="button" class="btn btn-sm btn-success-soft" @click="moveFeedConfirm">Move</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import LeftTable from "@/views/user/leftTable.vue";
import CodeEditor from "@/views/code/code-editor.vue";
import PageLoading from "@/views/pageLoading.vue";
import Star50 from "@/views/component/Star50.vue";

export default {
    name: "index",
  components: {PageLoading, LeftTable, CodeEditor, Star50},
  data() {
    return {
      content: 'Share your coding...',
      pageNum: 1,
      pages: '',
      loadingStatus: false,
      login: this.$store.state.loginFlg,
      loginUser: this.$store.state.authInfo,
      editorOption: {
        theme: 'bubble',
        placeholder: ' '
      },
      whoToFollowList: [],
      contentList: [],
      teamNewList: [],
      recentArticles: [],
      rechargeError: '',
      rechargeErrorMsg:'',
      pageOk: false,
      moveTeamList:[],
      moveFeed: '',
      moveGroupId: '',
      moveTeamFilterText:''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh()
      this.whoFollows()
      this.getTeamNewList()
      this.getRecentArticles()
    })
  },
  computed: {
      filteredTeamList() {
          return this.moveTeamList.filter(t => {
              // 根据关键词过滤标签列表
              return t.teamName.toLowerCase().includes(this.moveTeamFilterText.toLowerCase());
          });
      }
  },
  methods: {
    clearRecentArticles() {
      localStorage.removeItem('recentArticle')
      this.recentArticles = []
    },
    getRecentArticles() {
      let recentArticle = localStorage.getItem('recentArticle')
      if (recentArticle === null) {
        recentArticle = []
      } else {
        recentArticle = JSON.parse(recentArticle)
      }
      this.recentArticles = recentArticle
    },
    reload () {
      this.pageNum = 1;
      this.contentList = []
    },
    refresh() {
        this.loadingStatus = true;
        this.$http.post('/feed/home/page', {pageNum: this.pageNum, position: 'home'}).then(({ data: res }) => {
            this.loadingStatus = false;
            if (res.code !== 200) {
                alert(res.msg)
                return
            }

            this.pageOk = true

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

    moveFeedConfirm() {
        this.$http.post('/feed/move', {feedId: this.moveFeed.id, groupId: this.moveGroupId}).then(({ data: res }) => {
            if (res.code !== 200) {
                alert(res.msg)
                return
            }
            this.contentList.splice(this.contentList.indexOf(this.moveFeed), 1)
            this.$Modal.getOrCreateInstance('#moveFeedModal').hide()
            this.moveFeed = ''
            this.moveGroupId = ''
        }).catch(() => {
        })
    },
    moveFeedOpen(feed) {
        this.moveFeed = feed
        this.$Modal.getOrCreateInstance('#moveFeedModal').show()
        if (!this.moveTeamList || this.moveTeamList.length === 0) {
            this.getMoveTeamList()
        }
    },
    getMoveTeamList() {
        this.$http.post('/team/move/list').then(({ data: res }) => {
            if (res.code !== 200) {
                alert(res.msg)
                return
            }

            this.moveTeamList = res.data
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
    reply(item) {
      this.$refs.codeEditor.reply(item.author)
    },
    recharge(item) {
      if (this.loginUser.economy <= 0) {
        this.rechargeError = item.id
        this.rechargeErrorMsg = '星星不足'
        return
      }
      this.$http.post('/feed/recharge', {id: item.id}).then(({ data: res }) => {
        if (res.code !== 200) {
          this.rechargeError = item.id
          this.rechargeErrorMsg = (res.msg)
          return
        }

        item.batteryLevel += 1
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
    },
    whoFollows() {
      this.$http.get('/user/who-follows').then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.whoToFollowList = res.data
      }).catch(() => {
      })
    },
    follow(item) {
      this.$http.post('/user/follow/' + item.userId).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        item.followed = !item.followed
      }).catch(() => {
      })
    },
    getTeamNewList() {
      this.$http.get('/team/new/list').then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.teamNewList = res.data
      })
    }
  },
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
.avatar {
  height: 3rem;
  width: 3rem;
  position: relative;
  display: inline-block;
  -ms-flex-negative: 0 !important;
  flex-shrink: 0 !important;
}
.avatar-story {
  position: relative;
  padding: 4px;
  z-index: 1;
}
.me-2 {
  margin-right: 0.5rem !important;
}
.avatar-img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.rounded-circle {
  border-radius: 50% !important;
}
img {
  max-width: 100%;
  height: auto;
}
img, svg {
  vertical-align: middle;
}
.small {
  font-size: 0.875em;
}
.nav.nav-divider .nav-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.custom-tooltip {
  --bs-tooltip-bg: var(--bd-violet-bg);
  --bs-tooltip-color: var(--bs-white);
}

</style>
<style scoped>
.square {
  width: 100px;
  height: 100px;
  margin: 5px;
}
.teamText {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 100px;
}
</style>