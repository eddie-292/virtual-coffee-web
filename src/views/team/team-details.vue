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
    <div >
        <div class="row g-4" v-show="!pageOk">
            <div>
                <PageLoading></PageLoading>
            </div>
        </div>
        <div class="row g-4" v-show="pageOk">
            <div class="col-lg-3">
                <LeftTable></LeftTable>
            </div>
            <div class="col-md-8 col-lg-6 vstack gap-4">
                <div class="card">
                    <!-- Card body START :style="{backgroundImage: 'url(' +team.homeBackgroundImage+ ')'}" -->
                    <div class="card-body bg-center bg-cover">
                        <div class="d-md-flex flex-wrap align-items-start text-center text-md-start">
                            <div class="mb-2">
                                <!-- Avatar -->
                                <div class="avatar avatar-xl">
                                    <img class="avatar-img border-0" :src="team.teamImageUrl" alt="">
                                </div>
                            </div>
                            <div class="ms-md-4 ">
                                <!-- Info -->
                                <h1 class="h5 mb-0">{{team.teamName}}</h1>
                                <ul class="nav nav-divider justify-content-center justify-content-md-start">
                                    <li class="nav-item"> {{team.isPublic ? 'Public' : 'Private'}} group </li>
                                    <li class="nav-item">&nbsp;·&nbsp;</li>
                                    <li class="nav-item"> {{ team.teamMemberCount }} members </li>
                                </ul>
                            </div>
                            <!-- Button -->
                            <div class="d-flex justify-content-center justify-content-md-start align-items-center mt-3 ms-lg-auto">

                                <button class="btn btn-sm btn-primary-soft me-2" type="button" v-if="team.join"> <i class="bi bi-person-check-fill pe-1"></i> 已加入</button>
                                <button class="btn btn-sm btn-primary-soft me-2" type="button" v-if="team.isPublic && !team.join" @click="joinTeam(team)"> <i class="bi bi-universal-access"></i> 加入</button>
                                <button class="btn btn-sm btn-secondary-soft me-2" type="button" @click="favoriteTeam">
                                  <i class="bi bi-star" v-if="!team.favorite"></i>
                                  <i class="bi bi-star-fill" v-if="team.favorite"></i>
                                  {{!team.favorite ? '收藏' : '取消'}}
                                </button>
                                <button class="btn btn-sm btn-primary-soft me-2" type="button" v-if="!team.isPublic  && !team.join" @click="applyJoinTeam(team)" :disabled="applyJoinMark"> <i class="fa-solid fa-plus pe-1"></i> {{applyJoinMsg}}</button>

<!--                                <div class="dropdown" v-if="false">
                                    <button class="icon-sm btn btn-sm btn-secondary-soft" type="button" id="groupAction" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="groupAction">
                                        <li>
                                            <a class="dropdown-item" href="javascript:;" @click="favoriteTeam">
                                                <span v-if="!team.favorite">收藏</span>
                                                <span v-if="team.favorite">取消收藏</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>-->

                            </div>
                        </div>
                        <!-- Join group START -->
<!--                        <ul class="avatar-group list-unstyled justify-content-center justify-content-md-start align-items-center mb-0 mt-3 flex-wrap">
                            <li class="avatar avatar-xs me-2">
                                <div class="avatar-img rounded-circle bg-success"><span class="smaller text-white position-absolute top-50 start-50 translate-middle">+19</span></div>
                            </li>
                            <li class="small text-center">
                                卡洛琳·奥尔蒂斯 (Carolyn Ortiz)、弗朗西斯·格雷罗 (Frances Guerrero) 和 20 人加入了小组
                            </li>
                        </ul>-->
                        <!-- Join group END -->
                    </div>
                    <!-- Card body END -->
                    <div class="card-footer pb-0">
                        <ul class="nav nav-tabs nav-bottom-line justify-content-center justify-content-md-start mb-0" role="tablist">
                            <li class="nav-item" role="presentation"> <a class="nav-link link-success active" data-bs-toggle="tab" @click="tabIndex = 0" href="javascript:;" aria-selected="true" role="tab"> Feed </a> </li>
                        </ul>
                    </div>
                </div>

                <div v-if="tabIndex === 0">
                    <div class="row g-4">
                        <div class="col-lg-8 vstack gap-4">
                            <CodeEditor ref="codeEditor" position="team" :team-id="team.teamId" @refresh-list="refresh" @reload="reload" v-if="team.join"></CodeEditor>
                            <div>
                                <div class="text-center" v-if="contentList.length === 0">
                                    <i class="bi bi-emoji-laughing" style="font-size: 8rem;" ></i>
                                    <h5>还没有内容</h5>
                                    <div v-if="!team.isPublic && !team.join">
                                        <p>这是一个私有组，你必须先加入才可查看组内数据</p>
                                    </div>
                                </div>
                                <!--    用户发布内容    -->
                                <div class="card mb-3" v-for="(item) in contentList" v-bind:key="item.id">
                                    <div class="card-header border-unset">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <!-- Avatar -->
                                                <div class="avatar avatar-story me-2" v-if="!item.anonymize">
                                                    <img class="avatar-img rounded" :src="item.authorImg" alt="" width="38" height="38">
                                                </div>
                                                <!-- Info -->
                                                <div>
                                                    <div class="nav nav-divider">
                                                        <h6 class="nav-item card-title mb-0 ">
                                                            <router-link :to="{name:'member', params:{id:item.userId}}" target="_blank" class="link-success link-underline-opacity-0">
                                                                <strong>{{ item.author }}</strong>
                                                            </router-link>
                                                        </h6>
                                                        <span class="nav-item small text-secondary">&nbsp;&nbsp;{{ item.createTime }}</span>
                                                    </div>
                                                    <p class="mb-0 small text-secondary">{{ item.authorDesc }}</p>
                                                </div>
                                            </div>
                                            <!-- Card feed action dropdown START -->

                                            <div class="dropdown">
                                                <a href="javascript:;" class="text-secondary btn btn-secondary-soft-hover py-1 px-2" @click="reply(item)">
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
                                                        <a class="dropdown-item" href="javascript:;" @click="favorite(item)">
                                                            <span> {{item.favorite ? '取消收藏' : '收藏'}}</span>
                                                        </a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="javascript:;" @click="reply(item)" :class="$store.state.loginFlg ? '' : 'disabled'"> 回复</a></li>
                                                    <li><hr class="dropdown-divider"></li>
                                                    <li><a class="dropdown-item" href="javascript:;" v-if="item.userId === loginUser.userId" @click="remove(item)"> 删除</a></li>
                                                    <li><a class="dropdown-item" href="javascript:;" @click="report(item.id)"> 报告此内容</a></li>
                                                </ul>
                                            </div>
                                            <!-- Card feed action dropdown END -->
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="code_snippet" v-highlight v-html="item.content"></div>
                                        <div v-if="item.articles" class="border-top mt-3 pt-3">
                                            <div v-for="(item) in JSON.parse(item.articles)" :key="item.id">
                                                <i class="bi bi-link me-3"></i>
                                                <router-link target="_blank" class="link-success link-underline-opacity-0" :to="{ name: 't', params: { id: item.id } }" >{{item.title}}</router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer text-body-secondary">
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end align-items-center" >
                                            <div v-if="item.spam === 1">
                                              <span class="btn btn-sm disabled border-0" >疑似SPAM</span>
                                            </div>
                                            <div v-if="item.userId !== loginUser.userId">
                                                <span class="btn btn-sm disabled border-0" v-if="rechargeError === item.id" v-text="rechargeErrorMsg"></span>
                                                <button type="button" class="btn btn-sm" @click="recharge(item)">
                                                    <span class="d-flex align-items-center p-1 pe-2 text-dark-emphasis ">
                                                      <Star50 :w="24"></Star50>
                                                      <span style="margin-left: 2px;" v-if="item.batteryLevel > 0">{{item.batteryLevel}}</span>
                                                    </span>
                                                </button>
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
                        </div>
                        <div class="col-lg-4">
                            <div class="card mb-4">
                                <!-- Title -->
                                <div class="card-header border-0 pb-0">
                                    <div class="card-title">About</div>
                                </div>
                                <!-- Card body START -->
                                <div class="card-body position-relative pt-0">
                                    <p class="p-0" style="font-size: 15px;" v-if="team.teamDescription">{{team.teamDescription}}</p>
                                    <!-- info -->
                                    <ul class="list-unstyled mt-3 mb-0">
                                        <li class="mb-2">  People: <strong> {{team.teamMemberCount}} Members </strong> </li>
                                        <li class="mb-2">  Status: <strong> {{team.isPublic ? 'Public' : 'Private'}} </strong> </li>
                                    </ul>
                                </div>
                                <!-- Card body END -->
                            </div>

                            <div class="card mb-4">
                                <!-- Title -->
                                <div class="card-header border-0 pb-0">
                                    <div class="card-title">有关链接</div>
                                </div>
                                <!-- Card body START -->
                                <div class="card-body position-relative pt-0">
                                    <ul>
                                        <li v-for="(item) in team.teamLinks">
                                            <a class="link-success me-3" target="_blank" :href="item.url" hreflang="zh-tw">{{item.title}}</a>
                                            <a class="link-danger link-underline link-underline-opacity-0" href="javascript:;" @click="delLink(item.id)" v-if="item.userId === loginUser.userId">Delete </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="card mb-4" v-if="team.creatorUserId === loginUser.userId">
                                <!-- Title -->
                                <div class="card-header border-0 pb-0">
                                    <div class="card-title">组管理</div>
                                </div>
                                <!-- Card body START -->
                                <div class="card-body position-relative pt-0">
                                  <div class="dropdown-menu d-block position-static pt-0 mx-0 border-0 overflow-hidden">
                                    <ul class="list-unstyled mb-0">
                                      <li>
                                        <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">
                                          <span class="d-inline-block bg-success rounded-circle p-1"></span>
                                          编辑组信息
                                        </a>
                                      </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#" data-bs-toggle="modal" data-bs-target="#modalLinkGroup">
                                                <span class="d-inline-block bg-success rounded-circle p-1"></span>
                                                添加链接
                                            </a>
                                        </li>
                                    </ul>
                                  </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>


            <div class="modal fade " id="modalLinkGroup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">添加链接</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body ">
                            <div class="mb-3">
                                <label for="tt" class="form-label">标题</label>
                                <input type="text" class="form-control" id="tt" placeholder="" v-model="teamLink.title">
                            </div>
                            <div class="mb-3">
                                <label for="tlk" class="form-label">地址</label>
                                <textarea class="form-control" id="tlk" rows="3" v-model="teamLink.url"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-success-soft" @click="saveTeamLink">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <TeamPublic operator="update" title="更新组信息" :t-id="id" @refresh="refresh"></TeamPublic>

            </div>
        </div>
    </div>
</template>

<script>
import LeftTable from "@/views/user/leftTable.vue";
import CodeEditor from "@/views/code/code-editor.vue";
import {getUPYunConfig} from "@/utils/UPYun";
import PageLoading from "@/views/pageLoading.vue";
import TeamPublic from "@/views/team/TeamPublic.vue";
import {background} from "quill/ui/icons";
import Star50 from "@/views/component/Star50.vue";

export default {
    name: "team-details",
  computed: {
    background() {
      return background
    }
  },
    components: {Star50, TeamPublic, PageLoading, CodeEditor,  LeftTable},
    data() {
        return {
            login: this.$store.state.loginFlg,
            loginUser: this.$store.state.authInfo,
            team: {},
            contentList: [],
            pageNum: 1,
            pages: '',
            loadingStatus: false,
            tabIndex: 0,
            uploadProgress: 0,
            uploadProgress1: 0,
            applyJoinMsg: '申请加入',
            applyJoinMark: false,
            rechargeError: '',
            rechargeErrorMsg:'',
            pageOk: false,
            id:'',
            teamLink : {
                title: '',
                url: '',
                teamId: ''
            }
        }
    },
    created() {
        this.id = this.$route.params.id;
    },
    mounted() {
        this.$nextTick(() => {
            this.getContent()
        })
    },
    methods: {
        delLink(id) {
            this.$http.post('/team/link/del', {id: id}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                //删除链接
                this.team.teamLinks = this.team.teamLinks.filter(item => item.id !== id)
            }).catch(() => {
            })
        },
        saveTeamLink() {
            this.teamLink.teamId = this.id
            this.$http.post('/team/link', this.teamLink).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }
                this.$Modal.getOrCreateInstance("#modalLinkGroup").hide()
            }).catch(() => {
            })
        },
        reply(item) {
            this.$refs.codeEditor.reply(item.author)
        },
        changeFavicon() {
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = this.team.teamImageUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        getContent() {
            this.$http.get('/team/info/' + this.id).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                this.pageOk = true

                if (res.data === null) {
                    this.$goTo('404')
                    return
                }

                this.team = res.data
                if (!this.team.isPublic) {
                    if (this.team.join) {
                        //私有组已加入则加载feed列表
                        this.refresh()
                    }
                } else {
                    //公开组加载feed列表
                    this.refresh()
                }

                //改变页面标题
                document.title = this.team.teamName + ' - ' + window.common.webSiteName
                //改变icon
                this.changeFavicon()
            }).catch(() => {

            })
        },
        viewMore() {
            this.pageNum += 1
            this.refresh()
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
        report(id) {
            this.$http.post('/feed/report', {id: id}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }
            }).catch(() => {
            })
        },
        recharge(item) {
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
        reload () {
            this.pageNum = 1;
            this.contentList = []
        },
        refresh() {
            this.loadingStatus = true;
            this.$http.post('/feed/home/page', {pageNum: this.pageNum, position: 'team', teamId: this.id}).then(({ data: res }) => {
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
        joinTeam(item) {
            this.$http.post('/team/join', {"teamId": item.teamId}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                item.join = !item.join
            }).catch(() => {
            })
        },
        applyJoinTeam(team) {
            this.$http.post('/team/join-apply', {"teamId": team.teamId}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }
                this.applyJoinMsg = '已提交申请';
                this.applyJoinMark = true;
            }).catch(() => {
            })
        },
        favoriteTeam() {
            this.$http.post('/team/favorite', {"teamId": this.team.teamId}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                this.team.favorite = !this.team.favorite
            }).catch(() => {
            })
        },
        updateGroupSubmit () {
            this.$http.post('/team/info/update', this.team).then(({ data: res }) => {
                if (res.code !== 200) {
                    console.log(res)
                    alert(res.msg)
                    return;
                }

                // 刷新当前
                window.location.reload()
            }).catch(() => {})
        },
        uploadFile(file, type) {
          if (file) {

            getUPYunConfig((d) => {
              const formData = new FormData()
              formData.append('file', file)
              formData.append('policy', d.policy)
              formData.append('authorization', d.signature)
              const xhr = new XMLHttpRequest()
              xhr.timeout = 60000; // 60 秒
              xhr.open('POST', d.url)
              xhr.upload.addEventListener('progress', event => {
                if (event.lengthComputable) {
                  if (type === 'groupAvatar') {
                    this.uploadProgress = Math.round(
                        (event.loaded / event.total) * 100
                    )
                  } else if (type === 'groupBackground') {
                    this.uploadProgress1 = Math.round(
                        (event.loaded / event.total) * 100
                    )
                  }


                }
              })
              xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    const uploadResult = JSON.parse(xhr.responseText)
                    const  imgUrl = d.baseUrl + uploadResult.url;

                    if (type === 'groupAvatar') {
                      this.team.teamImageUrl = imgUrl
                      document.getElementById("avatar-preview-groupAvatar").src = this.team.teamImageUrl;
                    } else if (type === 'groupBackground') {
                      this.team.homeBackgroundImage = imgUrl
                      document.getElementById("avatar-preview-groupBackground").src = this.team.teamImageUrl;
                    }

                  } else {
                    //上传错误
                    this.tips("上传头像时发生了错误")
                  }
                }
              }
              xhr.ontimeout = function () {
                console.log("请求超时");
                this.tips("上传头像时发生了错误")
              };
              xhr.send(formData)
            });
          }
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.uploadFile(file, 'groupAvatar')
        },
        onFileChange1(e) {
          const file = e.target.files[0];
          this.uploadFile(file, 'groupBackground')
        },
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

.bg-center {
  background-position: center;
}
.bg-cover {
  background-size: cover;
}
</style>
<style scoped>
.avatar-img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 4px;
}

.avatar {
    height: 3rem;
    width: 3rem;
    position: relative;
    display: inline-block;
    -ms-flex-negative: 0 !important;
    flex-shrink: 0 !important;
}


.avatar {
    height: 3rem;
    width: 3rem;
    position: relative;
    display: inline-block;
    -ms-flex-negative: 0 !important;
    flex-shrink: 0 !important;
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


</style>