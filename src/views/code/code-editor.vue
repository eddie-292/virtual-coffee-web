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
      <!--   编辑器     -->
      <div class="card mb-4">
          <div class="card-body">
              <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="sendMsgFlg">
                  <strong>已发送!</strong>  系统将在第一时间处理发送的内容.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <div id="editor">
                  <div class="d-flex mb-3">
                      <!-- Avatar -->
                      <div class="avatar avatar-xs me-2">
                          <img class="avatar-img rounded" :src="$store.state.authInfo.avatar" alt="">
                      </div>
                      <!-- Two-way Data-Binding -->
                      <div class="w-100" style="word-wrap: break-word;word-break: break-all;">
                          <quill-editor
                                  v-highlight
                                  ref="myQuillEditor"
                                  v-model="content"
                                  :options="editorOption"
                                  @change="onEditorChange"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)"
                          />
                      </div>
                  </div>
              </div>
          </div>
          <div class="card-footer">
              <div class="d-flex gap-2">

                  <!--      主题链接关联      -->
                  <button :disabled="getPostBtnLoading" title="关联主题" @click="getPost(1)" class="btn btn-primary-soft btn-sm" >
                      <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="getPostBtnLoading"></span>
                      关联主题
                  </button>

                  <div class="ms-auto d-flex gap-2">
                      <button type="button" class="btn btn-secondary-soft btn-sm " @click="clearData">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                          清空
                      </button>
                      <button type="button" class="btn btn-primary-soft btn-sm " :disabled="sendBtnLoading" @click="send()" v-if="$checkPermission('PUBLISH_FEED')">
                        <svg v-if="!sendBtnLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                        </svg>
                        <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="sendBtnLoading"></span>
                        <span role="status"> 发送</span>
                      </button>
                  </div>
              </div>
          </div>
          <div class="card-footer" v-if="selectedPost.length > 0">
            <div v-for="(item) in selectedPost" :key="item.articleId">
              <i class="bi bi-link me-3"></i>
              <a href="javascript:;" class="link-success link-underline-opacity-0" :title="item.title">{{item.title}}</a>
              <hr>
            </div>
          </div>
      </div>


<!--      关联主题modal-->
    <div class="modal modal-lg fade" id="relationPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <div v-if="contentList.length === 0" class="text-center p-5">
              <h3>暂无主题</h3>
            </div>
            <div style="height: 400px;overflow: auto;" v-if="contentList.length > 0">
              <div v-for="(item) in contentList" v-bind:key="item.articleId" class="mb-2">
                <div class="p-3" style="border-bottom: 1px solid #a9a9a95c;">
                  <input class="form-check-input me-2" type="checkbox" :disabled="selectedItems.length >= 5 && !selectedItems.includes(item.articleId)" :value="item.articleId" v-model="selectedItems" :id="item.articleId"/>
                  {{item.title}}
                </div>
              </div>
              <!-- Pagination -->
              <div class="text-center" v-if="loadingStatus">
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div class="mt-4" v-if="contentList.length > 0">
                <div class="d-grid mt-3 mb-3">
                  <a class="btn btn-sm link-success" href="javascript:;" @click="viewMore" v-if="pages > 1 && pageNum < pages">
                    View more
                  </a>
                  <div class="text-center text-secondary" v-if="pageNum >= pages"> No more </div>
                </div>
              </div>
              <!-- Pagination -->
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary-soft" data-bs-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary-soft" @click="submitChoose">确定选择</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Cookies from "js-cookie";
import { quillEditor, Quill } from 'vue-quill-editor'
import {ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
    name: "code-editor",
    components: {quillEditor},
    props: {
        position: String,
        teamId: String
    },
    data() {
        return {
            toolBenShow: false,
            sendMsgFlg:false,
            getPostBtnLoading: false,
            sendBtnLoading: false,
            loadingStatus: false,
            content: '',
            pageNum: 1,
            pages: 0,
            contentList: [],
            selectedItems: [],
            selectedPost:[],
            editorOption: {
                theme: 'bubble',
                placeholder: ' ',
                //在 vue-quill-editor 中禁止某些标签，比如 <h1>, <h2> 等，可以通过配置 Quill 的 formats 属性来实现。
                formats: ['code-block', 'link', 'image', 'video'],
                modules: {
                    clipboard: { // 剪切板事件
                        matchers: [
                            ['img', (node, delta) => {  delta.ops = []; return delta;}] // 匹配图片剪切板
                        ],
                    },
                    toolbar: {
                        container:[
                          ['code-block','link'],
                        ],
                        handlers: {

                        }
                    },
                }
            },
        }
    },
    methods: {
        reply(username) {
            this.content += ('<p>@' + username + '&nbsp;</p>')
        },
        onEditorBlur(quill) {
            //console.log("editor blur!", quill);
        },
        onEditorFocus(quill) {
            //console.log("editor focus!", quill);
        },
        onEditorReady(quill) {
            //console.log("editor ready!", quill);
        },
        onEditorChange({ text }) { //{ html, text }
            const lastChar = text[text.length - 2];
            if (lastChar === '@') {
                console.log('触发了@')
            }
        },
        clearData() {
          this.content = ''
          this.selectedItems = []
          this.selectedPost = []
        },
        submitChoose() {
          const selectedArticles = [];
          this.selectedItems.forEach(selectedItemId => {
            const selectedArticle = this.contentList.find(article => article.articleId === selectedItemId);
            if (selectedArticle) {
              selectedArticles.push(selectedArticle);
            }
          });
          this.selectedPost = selectedArticles;
          this.$Modal.getOrCreateInstance('#relationPostModal').hide()
        },
        send() {
            if (this.content && this.content.length > 0) {
              this.sendBtnLoading = true
              const submitBody = {
                content: this.content,
                position: this.position,
                teamId: this.teamId,
                articleIds: this.selectedPost.map(item => item.articleId)
              }
              this.$http.post('/feed', submitBody).then(({ data: res }) => {
                  this.sendBtnLoading = false
                  if (res.code !== 200) {
                      alert(res.msg)
                      return
                  }

                  this.sendMsgFlg = true;

                  //延迟1秒后调用父組件方法
                  setTimeout(() => {
                      this.$emit('reload')
                      this.$emit('refresh-list')
                  }, 1000)

                //延迟1秒后关闭提示
                setTimeout(() => {
                  this.sendMsgFlg = false
                }, 3000)
              }).catch(() => {
                this.sendBtnLoading = false
              })
            }
        },
        getPost(t) {
          if (t === 1) {
              this.pageNum = 1
          }

          this.getPostBtnLoading = true
          this.$http.post('/article/member', {pageNum: this.pageNum, userId: this.$store.state.authInfo.userId}).then(({ data: res }) => {
              this.getPostBtnLoading = false
            if (res.code !== 200) {
              alert(res.msg)
              return
            }

            if (t === 1) {
                this.contentList = []
                this.contentList = res.data.records
            } else {
              this.contentList.push(...res.data.records)
            }
            this.pages = res.data.pages
            this.$Modal.getOrCreateInstance('#relationPostModal').show()

          }).catch(() => {
              this.getPostBtnLoading = false
          })
        },
      viewMore() {
        this.pageNum += 1
        this.getPost(2)
      },
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

.nav.nav-divider .nav-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
</style>