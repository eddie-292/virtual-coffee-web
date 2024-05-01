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
      <div class="col-lg-8 vstack gap-4">
        <!-- My profile START -->
        <div class="card">
          <!-- Cover image -->
          <div class="h-200px rounded-top" :style="style"></div>
          <!-- Card body START -->
          <div class="card-body py-0">
            <div class="d-sm-flex align-items-start text-center text-sm-start">
              <div>
                <!-- Avatar -->
                <div class="avatar avatar-xxl mt-n5 mb-3">
                  <img class="avatar-img rounded border border-white border-3" :src="loginUser.avatar" alt="">
                </div>
              </div>
              <div class="ms-sm-4 mt-sm-3">
                <!-- Info -->
                <h1 class="mb-0 h5"><strong>{{loginUser.nickname}}</strong></h1>
                <p>{{loginUser.occupation}}</p>
              </div>
              <!-- Button -->
              <div class="d-flex mt-3 justify-content-center ms-sm-auto" v-if="$store.state.authInfo.userId !== loginUser.userId">
                <button type="button" class="btn btn-orange-soft me-2" @click="follow()" v-if="!loginUser.followed">加入关注</button>
                <button type="button" class="btn btn-secondary-soft me-2" @click="follow()" v-if="loginUser.followed">取消关注</button>
              </div>
            </div>
            <!-- List profile -->
            <ul class="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0 w-100">
              <li class="list-inline-item me-4" v-if="loginUser.occupation"><i class="bi bi-briefcase"></i> {{loginUser.occupation}} </li>
              <li class="list-inline-item me-4" v-if="loginUser.city"><i class="bi bi-geo-alt"></i> {{loginUser.city}} </li>
              <li class="list-inline-item me-4">
                <i class="bi bi-calendar2-plus"></i> {{loginUser.registerTime}} <span v-if="loginUser.memberNumber">{{webSiteName}} 第 <strong>{{loginUser.memberNumber}}</strong> 号会员</span>
              </li>
            </ul>
          </div>
          <!-- Card body END -->
          <div class="card-footer mt-3 pt-2 pb-0">
            <!-- Nav profile pages -->
            <ul class="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
<!--              <li class="nav-item me-3">
                  <img class="rounded-circle" width="32" height="32" :src="loginUser.avatar" alt="">
              </li>-->
                <li class="nav-item">
                    <a class="nav-link link-success" :class="{active: tabIndex === 'Feed'}" data-bs-toggle="tab" href="#tab-2" aria-selected="false" tabindex="-1" role="tab" @click="clickTab('Feed')"> Feed </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link-success" :class="{active: tabIndex === 'Topic'}" data-bs-toggle="tab" href="#tab-2" aria-selected="false" tabindex="-1" role="tab" @click="clickTab('Topic')"> 主题 </a>
                </li>
            </ul>
          </div>
        </div>

        <!--     切换     -->
        <div v-if="tabIndex === 'Feed'">
          <div class="mb-2 text-secondary" v-if="contentList.length > 0">最近 {{contentList.length}} 条</div>

          <div v-if="loginUser.publicFeeds == 1">
            <div class="text-center" v-if="contentList.length == 0 && !loadingStatus">
              <h5 class="text-secondary">
                <i class="bi bi-braces"></i>
                {{ global.NO_CONTENT }}
              </h5>
            </div>
          </div>

          <div class="text-center" v-if="loginUser.publicFeeds == 0">
            <h5 class="text-secondary">
              {{ loginUser.nickname }} 的Feeds是私密的
            </h5>
          </div>

          <div class="card mb-3" v-for="(item) in contentList" v-bind:key="item.id">
            <div class="card-header border-unset">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <!-- Info -->
                  <div class="nav nav-divider">
                    <span class="nav-item small text-secondary">{{ item.createTime }} 发布</span>
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
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction" v-if="$store.state.loginFlg">
                    <li>
                      <a class="dropdown-item" href="javascript:;" @click="favorite(item)">
                        <span> {{item.favorite ? '取消收藏' : '收藏'}}</span>
                      </a>
                    </li>
                    <li><hr class="dropdown-divider"></li>
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
                <span class="d-flex align-items-center p-1 text-dark-emphasis " v-if="item.batteryLevel > 0">
                  <Star50 :w="22"></Star50>
                  <span style="margin-left: 2px;">{{item.batteryLevel}}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="text-center" v-if="loadingStatus">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        <!--     主题     -->
        <div v-if="tabIndex === 'Topic'">
          <div class="mb-2 text-secondary" v-if="topicContentList.length > 0">最近 {{topicContentList.length}} 条</div>

          <div v-if="loginUser.publicTopics == 1">
            <div class="text-center" v-if="topicContentList.length == 0 && !loadingStatus">
              <h5 class="text-secondary">
                <i class="bi bi-braces"></i>
                {{ global.NO_CONTENT }}
              </h5>
            </div>
          </div>

          <div class="text-center" v-if="loginUser.publicTopics == 0">
            <h5 class="text-secondary">
              {{ loginUser.nickname }} 的主题列表是私密的
            </h5>
          </div>

          <div v-for="(item) in topicContentList" v-bind:key="item.articleId">
            <div class="card mb-3" >
              <div class="card-body">
                <div class="">
                  <div class="mb-2">
                    <small class="text-secondary">{{item.createTime}}</small>
                  </div>
                  <div>
                    <router-link target="_blank" class="link-success text-reset link-underline link-underline-opacity-0" :to="{ name: 't', params: { id: item.articleId } }" >{{item.title}}</router-link>
                  </div>
                  <p class="mb-2 text-secondary small">{{item.summary}}</p>
                  <div class="d-grid d-md-flex justify-content-md-start align-items-center">
                    <span class="text-secondary me-3">
                      <a href="javascript:;" class="badge bg-success bg-opacity-10 text-success fw-bold link-underline link-underline-opacity-0" >
                          <i class="bi bi-chat-dots me-1"></i>{{ item.category }}
                      </a>
                    </span>
                    <span class="small text-secondary me-3">
                      <i class="bi bi-eye pe-1"></i>{{item.view}}
                    </span>
                    <span class="d-flex align-items-center p-1 text-dark-emphasis ">
                      <Star50 :w="22"></Star50>
                      <span style="margin-left: 2px;" v-if="item.batteryLevel > 0">{{item.batteryLevel}}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center" v-if="loadingStatus">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>


      </div>
      <div class="col-lg-4">
        <div class="row g-4">

          <!-- Card START -->
          <div class="col-md-6 col-lg-12">
            <div class="card">
              <div class="card-header border-0 pb-0">
                <h5 class="card-title">徽章</h5>
                <!-- Button modal -->
              </div>
              <!-- Card body START -->
              <div class="card-body position-relative pt-0">
                  <UserBadge :member-id="memberId" :member-name="loginUser.nickname"/>
              </div>
              <!-- Card body END -->
            </div>
          </div>
          <!-- Card END -->

          <!-- Card START -->
          <div class="col-md-6 col-lg-12">
            <div class="card">
              <div class="card-header border-0 pb-0">
                <h5 class="card-title">About</h5>
                <!-- Button modal -->
              </div>
              <!-- Card body START -->
              <div class="card-body position-relative pt-0">
                  <p class="p-0" style="font-size: 15px;" v-if="loginUser.introduction">{{loginUser.introduction}}</p>
              </div>
              <!-- Card body END -->
            </div>
          </div>
          <!-- Card END -->

          <!-- Card START -->
          <div class="col-md-6 col-lg-12">
            <div class="card">
              <!-- Card header START -->
              <div class="card-header d-flex justify-content-between border-0">
                <h5 class="card-title">经历</h5>
              </div>
              <!-- Card header END -->
              <!-- Card body START -->
              <div class="card-body position-relative pt-0">
                <!-- Experience item START -->
                <div class="d-flex" v-for="(item) in experienceList" :key="item.experienceId">
                  <div>
                    <h6 class="card-title mb-0"><a class="link-success link-underline-opacity-0" href="javascript:;"> {{item.companyName}} </a></h6>
                    <p class="small">{{item.startWorkTime}} 至 {{item.endWorkTime}} </p>
                  </div>
                </div>
                <!-- Experience item END -->

              </div>
              <!-- Card body END -->
            </div>
          </div>
          <!-- Card END -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageLoading from "@/views/pageLoading.vue";
import login from "../login.vue";
import UserBadge from "@/views/UserBadge.vue";
import Star50 from "@/views/component/Star50.vue";

export default {
  name: "index",
  computed: {
    login() {
      return login
    }
  },
  components: {
    Star50,
    UserBadge,
    PageLoading
  },
  data() {
    return {
      global:window.global,
      tabIndex: 'Feed',
      memberId:'',
      loginUser: {},
      webSiteName: window.common.webSiteName,
      style: {
        backgroundImage: 'url()',
        backgroundColor: 'rgb(32 48 45)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      },
      pageOk: false,
      contentList: [],
      topicContentList: [],
      pageNum: 1,
      pages: '',
      loadingStatus: false,
      experienceList:[],
      badges:[]
    }
  },
    created() {
        this.memberId = this.$route.params.id;
        this.$nextTick(() => {
            this.getMember()
        })
    },
  methods: {
    follow() {
      this.$http.post('/user/follow/' + this.loginUser.userId).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.loginUser.followed = !this.loginUser.followed
      }).catch(() => {
      })
    },
      getExperience() {
          this.$http.post('/experience/list', {"uid": this.memberId}).then(({ data: res }) => {
              if (res.code !== 200) {
                  alert(res.msg)
                  return
              }

              this.experienceList = res.data
          }).catch(() => {
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
    getMember() {
      this.$http.get('/user/info/' + this.memberId).then(({ data: res }) => {
        if (res.code !== 200) {
            this.$goTo('404')
          return
        }

        this.loginUser = res.data
        this.style.backgroundImage = 'url(' +this.loginUser.homeBackgroundImage+ ')'
        if (!this.loginUser.homeBackgroundImage)  {
          this.style.backgroundImage = 'linear-gradient(to right,#2e7d32,#c8e6c9)'
        }

        //改变页面标题
        document.title = this.loginUser.nickname + '的主页 - ' + window.common.webSiteName

        this.refreshFeed()
        this.getExperience()
        this.pageOk = true
      }).catch(() => {})
    },
    clickTab(idx) {
      this.tabIndex = idx;
      if (idx === 'Feed') {
        if (this.contentList.length === 0) {
          this.refreshFeed()
        }
      } else {
        if (this.topicContentList.length === 0) {
          this.refreshTopic()
        }
      }
    },
    refreshTopic() {
      //如果是公开Feed
      if (this.loginUser.publicTopics == 0) {
        return;
      }

      this.loadingStatus = true;
      this.$http.post('/article/member', {pageNum: this.pageNum, userId: this.memberId}).then(({ data: res }) => {
        this.loadingStatus = false;
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.topicContentList = (res.data.records)
        this.pages = res.data.pages
      }).catch(() => {
        this.loadingStatus = false;
      })
    },
    refreshFeed() {
      //如果是公开Feed
      if (this.loginUser.publicFeeds == 0) {
        return;
      }

      this.loadingStatus = true;
      this.$http.post('/feed/member', {pageNum: this.pageNum, userId: this.memberId}).then(({ data: res }) => {
        this.loadingStatus = false;
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.contentList = (res.data.records)
        this.pages = res.data.pages
      }).catch(() => {
        this.loadingStatus = false;
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
.h-200px {
  height: 200px !important;
}
.avatar-img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.avatar-xxl {
  width: 8rem;
  height: 8rem;
}
.avatar {
  position: relative;
  display: inline-block;
  -ms-flex-negative: 0 !important;
  flex-shrink: 0 !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mt-n5 {
  margin-top: -3rem !important;
}

.btn-xs {
  padding: 0.4rem 0.6rem;
  font-size: 0.6rem;
  line-height: 1.2;
  border-radius: 0.2rem;
}

.btn-primary-soft {
  color: #198754;
  background-color: #1987541c;
}

.nav.nav-bottom-line .nav-link.active {
  background: transparent;
  color: #198754;
  border-bottom: 3px solid #198754;
}
</style>