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

      <div class="input-group mb-3" v-if="pushSuccess">
        <div class="alert alert-success w-100" role="alert">
          发布成功
        </div>
      </div>

      <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">标 题</span>
          <input type="text" class="form-control" placeholder="输入标题" aria-describedby="inputGroup-sizing-default" v-model="dataForm.title">
      </div>

      <div class="input-group mb-3">
        <button class="btn btn-primary-soft me-2" @click="chooseMembers">选择接收者</button>
        <div class="d-flex gap-2 justify-content-center">
          <UserBadge v-for="(item) in selectedMembers" :key="item.userId" :imageUrl="item.avatar" :label="item.nickname" @remove="removeReceiver" :id="item.userId"/>
        </div>
      </div>


      <div class="w-100" style="word-wrap: break-word;word-break: break-all;">
          <!-- 工具栏 -->
          <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
          />
          <!-- 编辑器 -->
          <Editor
                  style="height: 60vh; overflow-y: hidden"
                  :defaultConfig="editorConfig"
                  v-model="dataForm.content"
                  @onChange="onChange"
                  @onCreated="onCreated"
          />
      </div>

      <div class="input-group mt-3">
          <button type="button" class="btn btn-primary-soft btn-sm " @click="save()">
              <svg v-if="!sendBtnLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
              </svg>
              <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="sendBtnLoading"></span>
              <span role="status"> 发 布</span>
          </button>
      </div>


    <!-- select user -->
    <div class="modal fade" id="membersModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">选择接收者</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="max-height: calc(100vh - 300px);overflow: auto;">
            <div class="text-center" v-if="members.length == 0">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div class="d-flex text-body-secondary pt-3" v-for="(item) in members" :key="item.userId">
              <img :src="item.avatar" class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="42" height="42">
              <div class="pb-3 mb-0 lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                  <strong class="text-gray-dark">{{ item.nickname }}</strong>
                  <a href="#">
                    <input class="form-check-input me-2" type="checkbox" :disabled="dataForm.receiverIds.length >= 5 && !dataForm.receiverIds.includes(item.userId)" :value="item.userId" v-model="dataForm.receiverIds" :id="item.userId"/>
                  </a>
                </div>
                <span class="d-block">
                      第{{item.memberNumber}}号会员
                  </span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary-soft" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary-soft" @click="submitChoose">选择</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import {getUPYunConfig} from '@/utils/UPYun.js'
import UserBadge from '@/views/component/UserBadge.vue'

export default {
    components: {Editor, Toolbar, UserBadge},
    name: "newNotifications",
    data() {
        return {
            sendBtnLoading: false,
            pushSuccess: false,
            pageNum: 1,
            pages: 0,
            dataForm: {
                title: '',
                content: '',
                receiverIds: [],
            },
            selectedMembers: [{userId:"0", nickname:"全部", avatar: ""}],
            members: [],
            articleId:'',
            editor: null,
            toolbarConfig: {
                toolbarKeys: [
                  "bold",
                  "code",
                  "codeBlock",
                  "header1",
                  "header2",
                  "header3",
                  "header4",
                  "header5",
                ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
            },
            editorConfig: {
                placeholder: "输入内容",
                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {
                    //图片配置
                    uploadImage: {
                      // 自定义上传
                      customUpload(file, insertFn) {
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
                              const uploadProgress = Math.round(
                                  (event.loaded / event.total) * 100
                              )
                              console.log(uploadProgress)
                            }
                          })
                          xhr.onreadystatechange = () => {
                            if (xhr.readyState === 4) {
                              if (xhr.status === 200) {
                                const uploadResult = JSON.parse(xhr.responseText)
                                const  imgUrl = d.baseUrl + uploadResult.url;
                                insertFn(imgUrl, "alt", imgUrl)
                              } else {
                                //上传错误
                              }
                            }
                          }
                          xhr.ontimeout = function () {
                            console.log("请求超时");
                          };
                          xhr.send(formData)
                        });
                      }
                    },
                    //视频配置
                    uploadVideo: {
                      // 自定义上传
                      async customUpload(file, insertFn) {
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
                              const uploadProgress = Math.round(
                                  (event.loaded / event.total) * 100
                              )
                              console.log(uploadProgress)
                            }
                          })
                          xhr.onreadystatechange = () => {
                            if (xhr.readyState === 4) {
                              if (xhr.status === 200) {
                                const uploadResult = JSON.parse(xhr.responseText)
                                const  imgUrl = d.baseUrl + uploadResult.url;
                                insertFn(imgUrl, "alt", imgUrl)
                              } else {
                                //上传错误
                              }
                            }
                          }
                          xhr.ontimeout = function () {
                            console.log("请求超时");
                          };
                          xhr.send(formData)
                        });
                      }
                    }

                },
            },
        }
    },
    methods: {
        submitChoose() {
          const selectedMembers = [];
          this.dataForm.receiverIds.forEach(selectedItemId => {
            const member = this.members.find(m => m.userId === selectedItemId);
            if (member) {
              selectedMembers.push(member);
            }
          });
          this.selectedMembers = selectedMembers;
          this.$Modal.getOrCreateInstance('#membersModal').hide()
        },
        chooseMembers() {
          this.$Modal.getOrCreateInstance('#membersModal').show()
          this.getMembers()
        },
        getMembers () {
          this.$http.get('/notifications/members?p=' + this.pageNum).then(({ data: res }) => {
            if (res.code !== 200) {
              alert(res.msg)
              return
            }

            this.members = res.data.records
          }).catch(() => {
          })
        },
        removeReceiver(id) {
          // 删除 this.selectedMembers 中 userId = id的
          this.selectedMembers = this.selectedMembers.filter(member => member.userId !== id);
          this.dataForm.receiverIds = this.dataForm.receiverIds.filter(memberId => memberId !== id);
          console.log("remove ", id)
        },
        onCreated(editor) {
            this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
          //console.log(this.editor.getAllMenuKeys())
        },
        onChange(editor) {
            //console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
            //console.log("onChange", this.dataForm.content); // onChange 时获取编辑器最新内容
        },
        getEditorText() {
            const editor = this.editor;
            if (editor == null) return;

            //console.log(editor.getText()); // 执行 editor API
        },
        printEditorHtml() {
            const editor = this.editor;
            if (editor == null) return;
            editor.getHtml()
        },
        save() {
            if (this.dataForm.content && this.dataForm.content !== '<p><br></p>') {
                this.sendBtnLoading = true
                this.$http.post('/notifications', this.dataForm).then(({ data: res }) => {
                    if (res.code !== 200) {
                        this.sendBtnLoading = false
                        alert(res.msg)
                        return
                    }

                  this.sendBtnLoading = false
                  this.pushSuccess = true

                  setTimeout(() => {
                    window.location.reload()
                  }, 1000)
                }).catch(() => {
                    this.sendBtnLoading = false
                })
            }
        }

    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    monted() {

    },
    created() {
      //this.articleId = this.$route.params.id;
    },
  computed: {

    },

}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style >
:root,
:host {
    --w-e-textarea-slight-bg-color: #f8f9fa;
    --w-e-textarea-bg-color: #fcfcfc;
    --w-e-toolbar-bg-color: #fcfcfc;
}

.textarea-dark {
    --w-e-textarea-bg-color: #1c2023;
    --w-e-textarea-color: #f8f9fa;
    --w-e-textarea-border-color: #2d3339;
    --w-e-textarea-slight-border-color: #212529;
    --w-e-textarea-slight-color: #1c2023;
    --w-e-textarea-slight-bg-color: #0c69192b;
    --w-e-textarea-selected-border-color: #198754;
    --w-e-textarea-handler-bg-color: #1c2023;
    --w-e-toolbar-color: #f8f9fa;
    --w-e-toolbar-bg-color: #1c2023;
    --w-e-toolbar-active-color: #1c2023;
    --w-e-toolbar-active-bg-color: #212529;
    --w-e-toolbar-disabled-color: #999;
    --w-e-toolbar-border-color: #303942;
    --w-e-modal-button-bg-color: #1c2023;
    --w-e-modal-button-border-color: #1c2023;
}

.w-e-text-container [data-slate-editor] pre>code {
    text-shadow: unset;
}

.w-e-bar-item .active {
  color: #17d17b !important;
}

.w-e-bar-item button:hover {
  color: #17d17b !important;
}
</style>