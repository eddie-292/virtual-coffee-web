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
      <div class="modal fade" id="modalCreateGroup" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Title -->
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabelCreateGroup">
                  <svg class="w-12 mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M7.80914 18.7462V24.1907H13.2536V18.7462H7.80914Z" fill="#FF3270"></path><path d="M18.7458 18.7462V24.1907H24.1903V18.7462H18.7458Z" fill="#861FFF"></path><path d="M7.80914 7.80982V13.2543H13.2536V7.80982H7.80914Z" fill="#097EFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.41775C4 5.08246 5.08246 4 6.41775 4H14.6457C15.7626 4 16.7026 4.75724 16.9802 5.78629C18.1505 4.67902 19.7302 4 21.4685 4C25.0758 4 28.0003 6.92436 28.0003 10.5317C28.0003 12.27 27.3212 13.8497 26.2139 15.02C27.243 15.2977 28.0003 16.2376 28.0003 17.3545V25.5824C28.0003 26.9177 26.9177 28.0003 25.5824 28.0003H17.0635H14.9367H6.41775C5.08246 28.0003 4 26.9177 4 25.5824V15.1587V14.9367V6.41775ZM7.80952 7.80952V13.254H13.254V7.80952H7.80952ZM7.80952 24.1907V18.7462H13.254V24.1907H7.80952ZM18.7462 24.1907V18.7462H24.1907V24.1907H18.7462ZM18.7462 10.5317C18.7462 9.0283 19.9651 7.80952 21.4685 7.80952C22.9719 7.80952 24.1907 9.0283 24.1907 10.5317C24.1907 12.0352 22.9719 13.254 21.4685 13.254C19.9651 13.254 18.7462 12.0352 18.7462 10.5317Z" fill="black"></path><path d="M21.4681 7.80982C19.9647 7.80982 18.7458 9.02861 18.7458 10.5321C18.7458 12.0355 19.9647 13.2543 21.4681 13.2543C22.9715 13.2543 24.1903 12.0355 24.1903 10.5321C24.1903 9.02861 22.9715 7.80982 21.4681 7.80982Z" fill="#FFD702"></path></svg>
                  {{ title }}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Form START -->
              <form>
                <!-- Group name -->
                <div class="mb-3">
                  <label class="form-label">組名称</label>
                  <input type="text" v-model="team.teamName" class="form-control" placeholder="Add Group name here">
                </div>
                <!-- Group picture -->
                <div class="mb-3">
                  <label class="form-label">組图片</label>
                  <!-- Avatar upload START -->
                  <div class="d-flex align-items-center">
                    <div class="avatar-uploader me-3">
                      <!-- Avatar edit -->
                      <div class="avatar-edit">
                        <input type="file"  id="avatarUpload" accept=".png, .jpg, .jpeg" @change="onFileChange">
                        <label for="avatarUpload">
                          <svg style="color: black;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                          </svg>
                        </label>
                      </div>
                      <!-- Avatar preview -->
                      <div class="avatar avatar-xl position-relative">
                        <img id="avatar-preview-groupAvatar" class="avatar-img rounded-circle border border-white border-3 shadow" :src="team.teamImageUrl" alt="">
                      </div>
                      <div>
                        <!-- 上传进度 -->
                        <div style="height: 10px;border-bottom: 3px solid #17d17b;" :style="{width: uploadProgress + '%'}"></div>
                      </div>
                    </div>
                    <!-- Avatar remove button -->
                    <div class="avatar-remove">
                      <!--                                        <button type="button" id="avatar-reset-img" class="btn btn-light">Delete</button>-->
                    </div>
                  </div>
                  <!-- Avatar upload END -->
                </div>
                <div class="mb-3">
                  <label class="form-label">背景横幅图片</label>
                  <!-- Avatar upload START -->
                  <div class="align-items-center">
                    <div class="avatar-uploader me-3">
                      <!-- Avatar edit -->
                      <div class="avatar-edit">
                        <input type="file"  id="avatarUpload1" accept=".png, .jpg, .jpeg" @change="onFileChange1">
                        <label for="avatarUpload1">
                          <svg style="color: black;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                          </svg>
                        </label>
                      </div>
                      <!-- Avatar preview -->
                      <div class="avatar position-relative" style="width: 100%;">
                        <img id="avatar-preview-groupBackground" class="avatar-img border border-white border-3 shadow" v-if="team.homeBackgroundImage" :src="team.homeBackgroundImage" alt="" style="border-radius: 6px;">
                        <div style="background-color: #0cbc87;"></div>
                      </div>
                      <div>
                        <!-- 上传进度 -->
                        <div style="height: 10px;border-bottom: 3px solid #17d17b;" :style="{width: uploadProgress1 + '%'}"></div>
                      </div>
                    </div>
                    <!-- Avatar remove button -->
                    <div class="avatar-remove">
                      <!--                                        <button type="button" id="avatar-reset-img" class="btn btn-light">Delete</button>-->
                    </div>
                  </div>
                  <!-- Avatar upload END -->
                </div>
                <!-- Select audience -->
                <div class="mb-3">
                  <label class="form-label d-block">选择受众</label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="team.isPublic" name="PublicRadioOptions" id="publicRadio1" :value="true">
                    <label class="form-check-label" for="publicRadio1">公开</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="team.isPublic" name="PublicRadioOptions" id="privateRadio2" :value="false">
                    <label class="form-check-label" for="privateRadio2">私有</label>
                  </div>
                </div>
                <!-- Group description -->
                <div class="mb-3">
                  <label class="form-label">組简介</label>
                  <textarea class="form-control" rows="3" v-model="team.teamDescription" placeholder="Description here"></textarea>
                </div>
              </form>
              <!-- Form END -->
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-primary-soft" @click="dataFormSubmitHandle">提 交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getUPYunConfig} from '@/utils/UPYun.js'

export default {
    name: "TeamPblic",
    props: {
      title: String,
      tId: String,
      operator: String
    },
    data() {
        return {
            team: {
                isPublic: true,
                homeBackgroundImage: ''
            },
            uploadProgress: 0,
            uploadProgress1: 0
        }
    },
    created() {

    },
    mounted() {
      if (this.tId) {
        this.getContent()
      }
    },
    methods: {
      getContent() {
        this.$http.get('/team/info/' + this.tId).then(({ data: res }) => {
          if (res.code !== 200) {
            alert(res.msg)
            return
          }

          if (res.data === null) {
            this.$goTo('404')
            return
          }

          this.team = res.data
        }).catch(() => {

        })
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
                    document.getElementById("avatar-preview-groupBackground").src = this.team.homeBackgroundImage;
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
      dataFormSubmitHandle() {
        if (!this.team.teamName) {
          alert("请输入組名称")
          return
        }
        if (!this.team.teamImageUrl) {
          alert("请上传組头像")
          return
        }
        if (!this.team.homeBackgroundImage) {
          alert("请上传背景横幅")
          return
        }

        if (this.operator === 'add') {
          this.addGroupSubmit()
        } else if (this.operator === 'update') {
          this.updateGroupSubmit()
        }
      },
      addGroupSubmit() {
        this.$http.post('/team/info/save', this.team).then(({ data: res }) => {
          if (res.code !== 200) {
            console.log(res)
            alert(res.msg)
            return;
          }

          // 关闭模态框
          this.$Modal.getOrCreateInstance('#modalCreateGroup').hide()

          this.refresh()
        }).catch(() => {})
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
      refresh() {
        this.$emit('refresh')
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
</style>