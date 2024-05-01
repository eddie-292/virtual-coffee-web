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

              <div class="col-md-6 col-lg-12">
                <div class="card">
                  <div class="card-header d-flex justify-content-between border-0">
                    <h5 class="card-title">收藏</h5>
                  </div>
                  <div class="card-body position-relative p-0">
                    <div class="list-group mb-3" >
                      <router-link target="_blank" :to="{ name: 'team-details', params: { id: item.teamId } }" class="list-group-item d-flex align-items-center border-0 " v-for="(item) in myFavoriteGroups">
                        <img :src="item.avatar" alt="" width="24" height="24" class="rounded me-2" loading="lazy">
                        <span class="favoriteGroups" :title="item.teamName">
                          {{ item.teamName }}
                        </span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-md-8 col-lg-6 vstack gap-4">
                <div class="card">
                    <!-- Card header START -->
                    <div class="card-header border-0 pb-0">
                        <div class="row g-2">
                            <div class="col-lg-2">
                                <!-- Card title -->
                                <h1 class="h4 card-title mb-lg-0">
                                  <svg class="w-12 mx-auto me-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1.6em" height="1.6em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M7.80914 18.7462V24.1907H13.2536V18.7462H7.80914Z" fill="#FF3270"></path><path d="M18.7458 18.7462V24.1907H24.1903V18.7462H18.7458Z" fill="#861FFF"></path><path d="M7.80914 7.80982V13.2543H13.2536V7.80982H7.80914Z" fill="#097EFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.41775C4 5.08246 5.08246 4 6.41775 4H14.6457C15.7626 4 16.7026 4.75724 16.9802 5.78629C18.1505 4.67902 19.7302 4 21.4685 4C25.0758 4 28.0003 6.92436 28.0003 10.5317C28.0003 12.27 27.3212 13.8497 26.2139 15.02C27.243 15.2977 28.0003 16.2376 28.0003 17.3545V25.5824C28.0003 26.9177 26.9177 28.0003 25.5824 28.0003H17.0635H14.9367H6.41775C5.08246 28.0003 4 26.9177 4 25.5824V15.1587V14.9367V6.41775ZM7.80952 7.80952V13.254H13.254V7.80952H7.80952ZM7.80952 24.1907V18.7462H13.254V24.1907H7.80952ZM18.7462 24.1907V18.7462H24.1907V24.1907H18.7462ZM18.7462 10.5317C18.7462 9.0283 19.9651 7.80952 21.4685 7.80952C22.9719 7.80952 24.1907 9.0283 24.1907 10.5317C24.1907 12.0352 22.9719 13.254 21.4685 13.254C19.9651 13.254 18.7462 12.0352 18.7462 10.5317Z" fill="black"></path><path d="M21.4681 7.80982C19.9647 7.80982 18.7458 9.02861 18.7458 10.5321C18.7458 12.0355 19.9647 13.2543 21.4681 13.2543C22.9715 13.2543 24.1903 12.0355 24.1903 10.5321C24.1903 9.02861 22.9715 7.80982 21.4681 7.80982Z" fill="#FFD702"></path></svg>
                                  <font style="vertical-align: inherit;">Groups</font>
                                </h1>
                            </div>
                            <div class="col-sm-6 col-lg-3 ms-lg-auto">
                                <!-- Select Groups -->
                                <select class="form-select" aria-label="Default select example" @change="changeGroup">
                                    <option value="daily_post_count">最活跃</option>
                                    <option value="create_time">最新</option>
                                    <option value="team_name">按名称排序</option>
                                </select>
                            </div>
                            <div class="col-sm-6 col-lg-3" v-if="$checkPermission('CREATE_GROUP')">
                                <!-- Button modal -->
                                <button class="btn btn-primary-soft ms-auto w-100" :disabled="!$store.state.loginFlg" href="javascript:;" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">创建组</button>
                            </div>
                            <div class="col-sm-6 col-lg-3" v-if="$store.state.loginFlg">
                                <!-- Button modal -->
                                <a class="btn btn-primary-soft ms-auto w-100" @click="getJoinApplyList()" href="javascript:;" data-bs-toggle="modal" data-bs-target="#modalApplyGroup">处理申请</a>
                            </div>
                        </div>
                    </div>
                    <!-- Card header START -->
                    <!-- Card body START -->
                    <div class="card-body">
                        <div class="tab-content mb-0 pb-0">

                            <!-- Friends groups tab START -->
                            <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
                                <div class="row g-4">

                                    <div class="my-sm-5 py-sm-5 text-center" v-if="contentList.length === 0">
                                        <i class="display-1 text-body-secondary bi bi-people"> </i>
                                        <h4 class="mt-2 mb-3 text-body">没有成立任何团体</h4>
                                        <button class="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">点击此处添加</button>
                                    </div>

                                    <div class="col-sm-4 col-lg-4" v-for="(item,index) in contentList" v-bind:key="index">
                                        <!-- Card START -->
                                        <div class="card">
                                            <div class="h-80px rounded-top" :style="{backgroundImage:'url('+item.homeBackgroundImage+')'}" style="background-position: center; background-size: cover; background-repeat: no-repeat;"></div>
                                            <!-- Card body START -->
                                            <div class="card-body text-center pt-0">
                                                <!-- Avatar -->
                                                <div class="avatar avatar-lg mt-n5 mb-3">
                                                    <a href="javascript:;">
                                                        <img class="avatar-img rounded-circle border border-white border-3 bg-white" v-lazyload="item.teamImageUrl" alt="">
                                                    </a>
                                                </div>
                                                <!-- Info -->
                                                <div class="mb-0">
                                                    <router-link target="_blank" :to="{ name: 'team-details', params: { id: item.teamId } }" class="link-underline link-underline-opacity-0 link-success">{{ item.teamName }}</router-link>
                                                </div>
                                                <small>
                                                  <i class="bi bi-globe pe-1"></i>{{ item.isPublic? '公开' : '私有' }}
                                                  <small style="margin-left: 5px;" v-if="item.creatorUserId === loginUser.userId">由我创建</small>
                                                </small>
                                                <!-- Group stat START -->
                                                <div class="hstack gap-2 gap-xl-3 justify-content-center mt-3">
                                                    <!-- Group stat item -->
                                                    <div>
                                                        <h6 class="mb-0">{{ item.teamMemberCount }}</h6>
                                                        <small>会员</small>
                                                    </div>
                                                    <div class="vr"></div>
                                                    <div>
                                                        <h6 class="mb-0">{{ item.dailyPostCount }}</h6>
                                                        <small>发帖数</small>
                                                    </div>
                                                    <div v-if="item.lastPost" class="vr"></div>
                                                    <div class="lastPostUser" v-if="item.lastPost">
                                                        <h6 class="mb-0">
                                                            <router-link target="_blank" :to="{ name: 'member', params: { id: item.lastPost.userId } }" class="link-success link-underline link-underline-opacity-0" :title="item.lastPost.username">
                                                                <span>{{ item.lastPost.username }}</span>
                                                            </router-link>
                                                        </h6>
                                                        <small :title="item.lastPost.timeDesc">{{ item.lastPost.timeDesc }}</small>
                                                    </div>
                                                </div>
                                                <!-- Group stat END -->
                                            </div>
                                            <!-- Card body END -->
                                            <!-- Card Footer START -->
                                            <div class="card-footer text-center">

                                                <div v-if="!item.isPublic">
                                                    <a class="btn btn-private-soft btn-sm" href="javascript:;" >
                                                        <i class="bi bi-building-lock"></i> 私有组
                                                    </a>
                                                    <a class="btn btn-danger-soft btn-sm" style="margin-left: 5px;" href="javascript:;" v-if="item.join && item.creatorUserId !== loginUser.userId" @click="joinTeam(item, 'sub')"> 离开组 </a>
                                                </div>
                                                <div v-if="item.isPublic">
                                                    <a class="btn btn-success-soft btn-sm" href="javascript:;" v-if="!item.join" @click="joinTeam(item, 'add')"> 加入组 </a>
                                                    <a class="btn btn-danger-soft btn-sm" href="javascript:;" v-if="item.join" @click="joinTeam(item, 'sub')"> 离开组 </a>
                                                </div>
                                            </div>
                                            <!-- Card Footer END -->
                                        </div>
                                        <!-- Card END -->
                                    </div>

                                </div>
                            </div>
                            <!-- Friends' groups tab END -->

                            <!-- Popular near you START -->
                            <div class="tab-pane fade" id="tab-2" role="tabpanel">
                                <!-- Add group -->
                                <div class="my-sm-5 py-sm-5 text-center">
                                    <i class="display-1 text-body-secondary bi bi-people"> </i>
                                    <h4 class="mt-2 mb-3 text-body">没有成立任何团体</h4>
                                    <button class="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">点击此处添加</button>
                                </div>
                            </div>
                            <!-- Popular near you END -->

                            <!-- Popular near you START -->
                            <div class="tab-pane fade" id="tab-3" role="tabpanel">
                                <!-- Add group -->
                                <div class="my-sm-5 py-sm-5 text-center">
                                    <i class="display-1 text-body-secondary bi bi-people"> </i>
                                    <h4 class="mt-2 mb-3 text-body">没有成立任何团体</h4>
                                    <button class="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">点击此处添加</button>
                                </div>
                            </div>
                            <!-- Popular near you END -->

                            <!-- Pagination -->
                            <div class="mt-3">
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
                            </div>
                            <!-- Pagination -->

                        </div>
                    </div>
                    <!-- Card body END -->
                </div>
            </div>



            <div class="modal fade" id="modalApplyGroup" tabindex="-1"  aria-labelledby="modalApplyGroup" aria-hidden="true" >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- Title -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabelCreateGroup">申请列表</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!--  START -->
                            <div class="list-group" v-if="joinApplyList.length > 0">
                                <div class="list-group-item d-flex gap-3 py-3 border-0" v-for="(ja) in joinApplyList" v-bind:key="ja.id" aria-current="true">
                                    <img :src="ja.avatar" alt="twbs" width="42" height="42" class="rounded-circle flex-shrink-0">
                                    <div class="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 class="mb-0">
                                                <router-link target="_blank" :to="{ name: 'member', params: { id: ja.applyUserId } }">{{ja.nickname}}</router-link>
                                                申请加入 <span class="text-success">{{ ja.teamName }}</span>
                                            </h6>
                                            <p class="mb-0 opacity-75">{{ ja.applyTime }}</p>
                                        </div>
                                        <div class="opacity-50 text-nowrap">
                                            <a class="btn btn-primary-soft m-1 btn-sm" href="javascript:;" @click="joinApplyOper(ja.id, 1)">同 意</a>
                                            <a class="btn btn-danger-soft m-1 btn-sm " href="javascript:;" @click="joinApplyOper(ja.id, 2)">拒 绝</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  class="text-center" v-else>
                                <h6>无内容</h6>
                            </div>
                            <!--  END -->
                        </div>
                    </div>
                </div>
            </div>

            <TeamPublic operator="add" title="创建新的组" @refresh="refresh" ></TeamPublic>

        </div>
    </div>
</template>

<script>
import LeftTable from "@/views/user/leftTable.vue";
import PageLoading from "@/views/pageLoading.vue";
import TeamPublic from "@/views/team/TeamPublic.vue";

export default {
    name: "team",
    components: {TeamPublic, PageLoading, LeftTable},
    data() {
        return {
            login: this.$store.state.loginFlg,
            loginUser: this.$store.state.authInfo,
            form: {
                teamName: null,
                teamImageUrl: "https://i.devnts.com/mygroup/default/group.png",
                homeBackgroundImage: null,
                isPublic: false,
                teamDescription:null
            },
            pageNum: 1,
            pages: '',
            loadingStatus: false,
            contentList: [],
            joinApplyList: [],
            pageOk: false,
            myFavoriteGroups: []
        }
    },
    created() {
        console.log('created')
    },
    mounted() {
        console.log('mounted')
        this.$nextTick(() => {
          this.refresh()
          this.getMyFavoriteGroups()
        })
    },
    methods: {
      changeGroup(event) {
        const selectedValue = event.target.value
        this.refresh(false, selectedValue)
      },
      getMyFavoriteGroups() {
        this.$http.get('/team/favorite/list').then(({ data: res }) => {
            if (res.code !== 200) {
                alert(res.msg)
                return
            }

            this.myFavoriteGroups = res.data
        }).catch(() => {
        })
      },
        refresh(append = false, orderBy = '') {
            this.loadingStatus = true;
            this.$http.post('/team/info/page', {pageNum: this.pageNum, orderBy: orderBy}).then(({ data: res }) => {
                this.loadingStatus = false;
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                this.pageOk = true

                if (append) {
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
            this.refresh(true)
        },
        joinTeam(item, type) {
          if (type === 'add') {
            item.teamMemberCount += 1
          } else {
            item.teamMemberCount -= 1
          }

          this.$http.post('/team/join', {"teamId": item.teamId}).then(({ data: res }) => {
              if (res.code !== 200) {
                  alert(res.msg)
                  return
              }

              item.join = !item.join
          }).catch(() => {
          })
        },
        getJoinApplyList() {
          this.$http.get('/team/join-apply-list').then(({ data: res }) => {
              if (res.code !== 200) {
                  alert(res.msg)
                  return
              }

              this.joinApplyList = res.data
          }).catch(() => {
          })
        },
        joinApplyOper(id, code) {
            this.$http.post('/team/join-apply-review', {"id": id, "processResult": code}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                // 刪除this.joinApplyList中id = id的元素
                this.joinApplyList = this.joinApplyList.filter(item => item.id !== id);

                //this.getJoinApplyList()
            }).catch(() => {
            })
        }
    }
}


</script>

<style scoped>

.avatar {
    height: 3rem;
    width: 3rem;
    position: relative;
    display: inline-block;
    -ms-flex-negative: 0 !important;
    flex-shrink: 0 !important;
}

.avatar-img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}

.avatar-lg {
    height: 4rem;
    width: 4rem;
}

.avatar-uploader .avatar-edit input {
    display: none;
}

.avatar-uploader .avatar-edit input + label {
    display: inline-block;
    width: 34px;
    height: 34px;
    text-align: -webkit-center;
    padding-top: 9%;
    margin-bottom: 0;
    border-radius: 100%;
    background: #eff2f6;
    border: 1px solid transparent;
    cursor: pointer;
    font-weight: normal;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.avatar-uploader .avatar-edit {
    position: absolute;
    right: 0;
    z-index: 1;
    top: 0;
}

.avatar-uploader {
    position: relative;
}

.avatar-xl {
    height: 5.125rem;
    width: 5.125rem;
}
.avatar-group {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.nav.nav-bottom-line {
    border-bottom: solid 1px var(--bs-border-color);
}

.nav.nav-bottom-line .nav-link.active {
    background: transparent;
    color: #198754;
    border-bottom: 3px solid #198754;
}

.nav.nav-bottom-line .nav-link {
    border: transparent;
    font-weight: 600;
    padding: 0.75rem 0.975rem;
}

.tab-content {
    padding: 25px 0;
}

.h-80px {
    height: 80px !important;
}

.mt-n5 {
    margin-top: -3rem !important;
}

.mb-3 {
    margin-bottom: 1rem !important;
}

.lastPostUser {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 85px;
    display: block;
}

.favoriteGroups {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>