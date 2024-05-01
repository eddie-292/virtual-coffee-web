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
  <div class="row g-4">
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
                          <p><small class="text-secondary">{{loginUser.occupation}}</small></p>
                      </div>
                      <!-- Button -->
                      <div class="d-flex mt-3 justify-content-center ms-sm-auto">
                        <router-link to="/settings" target="_blank"  class="btn btn-primary-soft me-2"> <i class="bi bi-pencil-fill pe-1"></i> Edit profile </router-link>
                          <div class="dropdown">
                              <!-- Card share action menu -->
                              <button class="icon-md btn btn-primary-soft" type="button" id="profileAction2" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="bi bi-three-dots"></i>
                              </button>
                              <!-- Card share action dropdown menu -->
                              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileAction2" style="">
                                  <li><a class="dropdown-item" href="javascript:;" @click="changeImg('h')"> 更改背景</a></li>
                                  <li><a class="dropdown-item" href="javascript:;" @click="changeImg('a')"> 更改头像</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <!-- List profile -->
                  <ul class="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                      <li class="list-inline-item me-4" v-if="loginUser.city">
                          <i class="bi bi-geo-alt"></i> {{loginUser.city}}
                      </li>
                      <li class="list-inline-item me-4">
                        <i class="bi bi-calendar2-plus"></i> {{loginUser.registerTime}} <span v-if="loginUser.memberNumber">{{webSiteName}} 第{{loginUser.memberNumber}}号会员</span>
                      </li>
                  </ul>
              </div>
              <!-- Card body END -->
              <div class="card-footer mt-3 pt-2 pb-0">
                  <!-- Nav profile pages -->
                  <ul class="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
<!--                      <li class="nav-item"> <a class="nav-link active link-success" data-bs-toggle="tab" href="#tab-2" aria-selected="false" tabindex="-1" role="tab" @click="clickTab('Post')"> Feed </a> </li>-->
                      <li class="nav-item"> <a class="nav-link active link-success" data-bs-toggle="tab" href="#tab-2" aria-selected="false" tabindex="-1" role="tab" @click="clickTab('About')"> 关于 </a> </li>
<!--                      <li class="nav-item"> <a class="nav-link link-success" data-bs-toggle="tab" href="#tab-2" aria-selected="false" tabindex="-1" role="tab" @click="clickTab('Media')"> Media</a> </li>-->
<!--                      <li class="nav-item"> <a class="nav-link link-success" data-bs-toggle="tab" href="#tab-2" aria-selected="false" tabindex="-1" role="tab" @click="clickTab('Events')"> Events</a> </li>-->
                  </ul>
              </div>
          </div>

          <!--     切换     -->
          <keep-alive>
<!--            <Post v-if="tabIndex === 'Post'"></Post>-->
            <About v-if="tabIndex === 'About'"></About>
          </keep-alive>


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
                  <UserBadge :member-id="$store.state.authInfo.userId" :member-name="$store.state.authInfo.nickname"/>
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
                          <a class="btn btn-primary-soft btn-sm" href="javascript:;" data-bs-toggle="modal" data-bs-target="#modalCreateExperience" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                              </svg>
                          </a>
                      </div>
                      <div class="card-body position-relative pt-0">
                          <!-- Experience item START -->
                          <div class="d-flex" v-for="(item) in experienceList" :key="item.experienceId">
                              <div>
                                  <h6 class="card-title mb-0"><a class="link-success link-underline-opacity-0" href="javascript:;"> {{item.companyName}} </a></h6>
                                  <p class="small">
                                      {{item.startWorkTime}} 至 {{item.endWorkTime}}
                                      <a class="btn btn-danger-soft btn-xs ms-2" href="javascript:;" @click="delExperience(item.experienceId)">Delete </a>
                                  </p>
                              </div>
                          </div>
                          <!-- Experience item END -->

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
                          <h5 class="card-title">我关注的人</h5>
                      </div>
                      <div class="card-body position-relative p-0">
                          <div class="list-group mb-3" >
                              <router-link class="list-group-item d-flex align-items-center border-0" :to="{ name: 'member', params: { id: item.userId } }" v-for="(item) in myFollows">
                                  <img :src="item.avatar" alt="@mdo" width="24" height="24" class="rounded me-2" loading="lazy">
                                  <span>
                                    <strong>{{ item.username }}</strong>
                                  </span>
                              </router-link>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- Card END -->

              <!-- 上传图片 -->
              <div class="modal modal-lg fade" id="uploadFileModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">上传{{ changeImgType === 'h' ? '背景图片' : '头像' }}</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <UploadFile :change-img-type="changeImgType"></UploadFile>
                          </div>
                      </div>
                  </div>
              </div>

                <!--  创建经历 -->
              <div class="modal fade" id="modalCreateExperience" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                          <!-- Modal feed header START -->
                          <div class="modal-header">
                              <h5 class="modal-title" id="modalLabelCreateEvents">创建经历</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <!-- Modal feed header END -->
                          <!-- Modal feed body START -->
                          <div class="modal-body">
                              <!-- Form START -->
                              <form class="row g-4">
                                  <!-- Title -->
                                  <div class="col-12">
                                      <label class="form-label">单位名称</label>
                                      <input type="text" class="form-control" v-model="experience.companyName" placeholder="单位名称">
                                  </div>
                                  <!-- Date -->
                                  <div class="col-sm-6">
                                      <label class="form-label">开始工作日期</label>
                                      <div class="d-flex">
                                          <input type="number" min="1937" max="2124" class="form-control mr-1" v-model="experience.startWorkTimeYear" placeholder="YYYY"  maxlength="4" @input="formatStartDate">
                                          <input type="number" min="1" max="12" class="form-control mx-1" v-model="experience.startWorkTimeMonth" placeholder="MM"  maxlength="2" @input="formatStartDate">
                                          <input type="number" min="1" max="31" class="form-control ml-1" v-model="experience.startWorkTimeDay" placeholder="DD"  maxlength="2" @input="formatStartDate">
                                      </div>
                                  </div>
                                  <!-- Time -->
                                  <div class="col-sm-6">
                                      <label class="form-label">结束工作日期</label>
                                      <div class="d-flex">
                                          <input type="number" min="1937" max="2124" class="form-control mr-1" v-model="experience.endWorkTimeYear" placeholder="YYYY"  maxlength="4" @input="formatEndDate">
                                          <input type="number" min="1" max="12" class="form-control mx-1" v-model="experience.endWorkTimeMonth" placeholder="MM"  maxlength="2" @input="formatEndDate">
                                          <input type="number" min="1" max="31" class="form-control ml-1" v-model="experience.endWorkTimeDay" placeholder="DD"  maxlength="2" @input="formatEndDate">
                                      </div>
                                  </div>
                                  <!-- Text -->
                                  <div class="col-12">
                                      <p v-if="!validDateFormat" class="text-danger">{{errorMsg}}</p>
                                  </div>
                              </form>
                              <!-- Form END -->
                          </div>
                          <!-- Modal feed body END -->
                          <!-- Modal footer -->
                          <!-- Button -->
                          <div class="modal-footer">
                              <button type="button" class="btn btn-danger-soft me-2" id="modalCreateExperienceClose" data-bs-dismiss="modal"> 取消 </button>
                              <button type="button" class="btn btn-success-soft" @click="addExperience"> 立即创建 </button>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import Post from "@/views/user/post.vue";
import About from "@/views/user/about.vue";
import UploadFile from "@/views/upload-file.vue";
import UserBadge from "@/views/UserBadge.vue";

export default {
    name: "index",
    components: {
      UserBadge,
        Post,About,UploadFile
    },
    data() {
        return {
            tabIndex: 'About',
            changeImgType: '',
            login: this.$store.state.loginFlg,
            loginUser: this.$store.state.authInfo,
            webSiteName: window.common.webSiteName,
            style: {
                backgroundImage: 'url(' +this.$store.state.authInfo.homeBackgroundImage+ ')',
                backgroundColor: 'rgb(32 48 45)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            },
            experience: {
                companyName:'',
                startWorkTime:'',
                endWorkTime:'',

                startWorkTimeYear: '',
                startWorkTimeMonth: '',
                startWorkTimeDay: '',
                endWorkTimeYear: '',
                endWorkTimeMonth: '',
                endWorkTimeDay: ''
            },
            experienceList:[],
            validDateFormat: true,
            errorMsg: '',
            myFollows: []
        }
    },
    created() {
        //改变页面标题
        document.title = this.loginUser.nickname  + ' - ' + window.common.webSiteName
        if (!this.$store.state.authInfo.homeBackgroundImage)  {
          this.style.backgroundImage = 'linear-gradient(to right,#2e7d32,#c8e6c9)'
        }
        this.getExperience()
        this.getMyFollows()
    },
    computed: {

    },
    methods: {
        formatDate(year, month, day) {
            // Remove non-numeric characters
            year = year.replace(/\D/g, '');
            month = month.replace(/\D/g, '');
            day = day.replace(/\D/g, '');

            // Ensure leading zeros for month and day
            month = month.padStart(2, '0');
            day = day.padStart(2, '0');

            // Ensure year is within range
            let minYear = 1937;
            let maxYear = 2124;
            year = Math.min(Math.max(parseInt(year), minYear), maxYear).toString();

            // Ensure month is within range
            let minMonth = 1;
            let maxMonth = 12;
            month = Math.min(Math.max(parseInt(month), minMonth), maxMonth).toString();

            // Ensure day is within range
            let minDay = 1;
            let maxDay = 31;
            day = Math.min(Math.max(parseInt(day), minDay), maxDay).toString();

            // Concatenate year, month, and day with "-"
            // Update v-model
            return `${year}-${month}-${day}`;
        },
        formatStartDate(event) {
            // Update v-model
            this.experience.startWorkTime = this.formatDate(this.experience.startWorkTimeYear, this.experience.startWorkTimeMonth, this.experience.startWorkTimeDay);
            console.log(this.experience.startWorkTime)
        },
        formatEndDate(event) {
            // Update v-model
            this.experience.endWorkTime = this.formatDate(this.experience.endWorkTimeYear, this.experience.endWorkTimeMonth, this.experience.endWorkTimeDay);
            console.log(this.experience.endWorkTime)
        },
        isValidDateFormat() {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            return (
                dateRegex.test(this.experience.startWorkTime) && dateRegex.test(this.experience.endWorkTime)
            );
        },
        clickTab(idx) {
            this.tabIndex = idx;
        },
        delExperience(id) {
            this.$http.post('/experience/remove', [id]).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                this.getExperience()
            });
        },
        addExperience() {
            //为空校验
            if(this.experience.companyName === '' || this.experience.startWorkTime === '' || this.experience.endWorkTime === '') {
                this.validDateFormat = false
                this.errorMsg = ('请填写完整信息')
                return
            }

            if (!this.isValidDateFormat()) {
                this.validDateFormat = false
                this.errorMsg = ('日期格式不正确, 填写正确格式 YYYY-MM-DD')
                return
            }

            //调用POST/experience/save
            this.$http.post('/experience/save', this.experience).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                //关闭模态框
                this.$Modal.getOrCreateInstance('#modalCreateExperience').hide()

                this.getExperience()
          });
        },
        getExperience() {
            this.$http.post('/experience/list', {}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                this.experienceList = res.data
            }).catch(() => {
            })
        },
        getMyFollows() {
            this.$http.get('/user/my-follows', {}).then(({ data: res }) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                this.myFollows = res.data
            }).catch(() => {
            })
        },
        changeImg(t) {
            this.changeImgType = t
            this.$Modal.getOrCreateInstance('#uploadFileModal').show()
        },
    }
}
</script>

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

.nav.nav-bottom-line .nav-link.active {
    background: transparent;
    color: #198754;
    border-bottom: 3px solid #198754;
}
</style>