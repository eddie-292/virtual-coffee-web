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

    <!--   new   -->
    <div v-if="action === 'new'">
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">标 题</span>
            <input type="text" class="form-control" placeholder="输入标题" aria-describedby="inputGroup-sizing-default" v-model="dataForm.title">
        </div>

        <div class="input-group mb-3">
            <div class="dropdown dropend">
                <a class="btn btn-primary-soft dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    选择分类 {{dataForm.category + ' / ' + dataForm.categoryTitle}}
                </a>
                <ul class="dropdown-menu">
                    <li class="p-2">
                        <input type="text" v-model="filterText" class="form-control" placeholder="输入过滤关键词">
                    </li>
                    <div style="max-height: 400px;overflow: auto;">
                        <li><a class="dropdown-item" href="javascript:;" v-for="tag in filteredTagList" :key="tag.tagId" @click="selectTag(tag)">{{tag.tagName + ' / ' + tag.title}}</a></li>
                    </div>
                </ul>
            </div>
        </div>

        <div class="w-100 mb-3" style="word-wrap: break-word;word-break: break-all;">
            <div id="vditor"></div>
        </div>

        <div class="input-group mt-3">
            <button type="button" class="btn btn-primary-soft btn-sm " :disabled="sendBtnLoading" @click="save()" v-if="$checkPermission('PUBLISH_TOPIC')">
                <svg v-if="!sendBtnLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
                <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="sendBtnLoading"></span>
                <span role="status"> {{submitBenMsg}}</span>
            </button>
        </div>
    </div>


    <!--   append   -->
    <div v-if="action === 'append'">
        <div class="mb-3">
            <router-link class="link-success text-reset link-underline link-underline-opacity-0 me-2" :to="{ name: 't', params: { id: dataForm.articleId } }" >{{dataForm.title}}</router-link>
            <i class="bi bi-caret-right me-2"></i>
            <span>新增附言</span>
        </div>

        <div class="w-100 mb-3" style="word-wrap: break-word;word-break: break-all;">
            <div id="vditor"></div>
        </div>

        <div class="input-group mt-3">
            <button type="button" class="btn btn-primary-soft btn-sm " :disabled="sendBtnLoading" @click="save()" v-if="$checkPermission('PUBLISH_TOPIC')">
                <svg v-if="!sendBtnLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
                <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="sendBtnLoading"></span>
                <span role="status"> {{submitBenMsg}}</span>
            </button>
        </div>
    </div>


    <!--   update   -->
    <div v-if="action === 'update'">
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">标 题</span>
            <input type="text" class="form-control" placeholder="输入标题" aria-describedby="inputGroup-sizing-default" v-model="dataForm.title">
        </div>

        <div class="input-group mb-3">
            <div class="dropdown dropend">
                <a class="btn btn-primary-soft dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    选择分类 {{dataForm.category + ' / ' + dataForm.categoryTitle}}
                </a>
                <ul class="dropdown-menu">
                    <li class="p-2">
                        <input type="text" v-model="filterText" class="form-control" placeholder="输入过滤关键词">
                    </li>
                    <div style="max-height: 400px;overflow: auto;">
                        <li><a class="dropdown-item" href="javascript:;" v-for="tag in filteredTagList" :key="tag.tagId" @click="selectTag(tag)">{{tag.tagName + ' / ' + tag.title}}</a></li>
                    </div>
                </ul>
            </div>
        </div>

        <div class="w-100 mb-3" style="word-wrap: break-word;word-break: break-all;">
            <div id="vditor"></div>
        </div>

        <div class="input-group mt-3">
            <button type="button" class="btn btn-primary-soft btn-sm " :disabled="sendBtnLoading" @click="save()" v-if="$checkPermission('PUBLISH_TOPIC')">
                <svg v-if="!sendBtnLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
                <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="sendBtnLoading"></span>
                <span role="status"> {{submitBenMsg}}</span>
            </button>
        </div>
    </div>



  </div>
</template>

<script>
import Vditor from 'vditor'
import {getUPYunConfig} from '@/utils/UPYun.js'
export default {
  props:{
    tid: {
      type: String,
      default: ''
    },
    action: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      contentEditor:'',
      sendBtnLoading: false,
      filterText: '',
      submitBenMsg: '发 布',
      dataForm: {
          title: '',
          content: '',
          category: '',
          categoryTitle: '',
          type: 0
      },
      articleId:'',
      editor: null,
      extraData:{},
      tagList: [],
    }
  },
  mounted() {
    console.log('m' + this.tid, this.action)
    this.getUYPConfig()
    this.tags()
    /*this.$nextTick(() => {
        if (this.tid) {
          if (this.action === 'update') {
            this.submitBenMsg = '提交修改'
            this.getContent()
          }

          if (this.action === 'append') {
            this.submitBenMsg = '提交附言'
            this.getContent()
          }

          if (this.action === 'new') {
            this.submitBenMsg = '发 布'
          }
        }
    })*/
  },
  created() {
    console.log('c' + this.tid, this.action)
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
    selectTag(tag) {
      this.dataForm.categoryTitle = tag.title;
      this.dataForm.category = tag.tagName;
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
    getContent() {
      this.$http.get('/article/' + this.tid).then(({data: res}) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        if (res.data === null) {
          this.$goTo('404')
          return
        }

        this.dataForm = res.data

        // 编辑器赋值
        if (this.action === 'update') {
          this.contentEditor.setValue(this.dataForm.content)
        }

        if (this.action === 'append') {
          this.contentEditor.setValue('')
        }
      }).catch(() => {

      })
    },
    getUYPConfig() {
        getUPYunConfig((d) => {
            this.extraData = {
                policy: d.policy,
                authorization: d.signature,
                url: d.url,
                baseUrl: d.baseUrl
            }

            this.contentEditor = new Vditor('vditor', {
                height: 'calc(60vh)',
                theme:'dark',
                cdn: 'https://kafeih.com/vditor/', //自定义cdn地址
                preview: {
                    theme: {
                        current: "dark"
                    },
                    hljs: {
                        enable: true,
                        style: "native"
                    }
                },
                upload: {
                    fieldName: 'file',
                    accept: 'image/*',
                    url: this.extraData.url,
                    extraData: this.extraData,
                    multiple: false,
                    max: 8 * 1024 * 1024,
                    filename (name) {
                        return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
                        replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
                        replace('/\\s/g', '')
                    },
                    //file(files: File[]): File[] | Promise<File[]>	将上传的文件处理后再返回	-
                    file(files) {
                        // 修改文件名
                        const updatedFiles = files.map((file) => {
                            // 添加前缀
                            const prefix = new Date().getTime() + '_';
                            const newName = prefix + file.name;
                            console.log('原文件名:', file.name);
                            console.log('新文件名:', newName);
                            const newFile = new File([file], newName, { type: file.type });
                            return newFile;
                        });
                        return updatedFiles;
                    },
                    format: (files, responseText) => {
                        //{"image-type":"PNG","image-frames":1,"image-height":742,"code":200,"file_size":84158,"image-width":909,"url":"\/mygroup\/2024\/1776939896870707200\/image.png","time":1712744943,"message":"ok","mimetype":"image\/png"}
                        var resultObj = JSON.parse(responseText);
                        if (resultObj.code !== 200) {
                            return ''
                        }

                        const name = files[0].name;
                        let succMap = {}
                        succMap[name] = this.extraData.baseUrl +  resultObj.url

                        var returnObj = {
                            "msg": "",
                            "code": 0,
                            "data": {
                                "errFiles": [],
                                "succMap": succMap
                            }
                        }
                        return JSON.stringify(returnObj)
                    },
                },
                toolbar: [
                    "emoji",
                    "headings",
                    "bold",
                    "italic",
                    "strike",
                    "link",
                    "|",
                    "list",
                    "ordered-list",
                    "check",
                    "outdent",
                    "indent",
                    "|",
                    "quote",
                    "line",
                    "code",
                    "inline-code",
                    "insert-before",
                    "insert-after",
                    "|",
                    "upload",
                    "record",
                    "table",
                    "|",
                    "undo",
                    "redo",
                ],
                toolbarConfig: {
                    pin: true,
                },
                counter: {
                    "enable": true,
                    "type": "text"
                },
                cache: {
                    enable: false,
                },
                after: () => {
                    this.contentEditor.setValue('')
                    if (this.action === 'update') {
                      this.submitBenMsg = '提交修改'
                      this.getContent()
                    }

                    if (this.action === 'append') {
                      this.submitBenMsg = '提交附言'
                      this.getContent()
                    }

                    if (this.action === 'new') {
                      this.submitBenMsg = '发 布'
                    }
                },
                input (md) {
                    //用户进行了输入
                },
            })

        });
    },
    save() {
        if (this.action === 'update') {
          this.update()
        }

        if (this.action === 'append') {
          this.append()
        }

        if (this.action === 'new') {
          this.insert()
        }
    },
    update() {
      this.dataForm.content = this.contentEditor.getValue()
      this.sendBtnLoading = true
      this.$http.post('/article/update', this.dataForm).then(({ data: res }) => {
        if (res.code !== 200) {
          this.sendBtnLoading = false
          alert(res.msg)
          return
        }

        //延迟1秒后关闭提示
        setTimeout(() => {
          this.sendBtnLoading = false
          window.location.href = '/t/' + this.tid
        }, 1000)
      }).catch(() => {
        this.sendBtnLoading = false
      })
    },
    insert() {
      this.dataForm.content = this.contentEditor.getValue()
      this.sendBtnLoading = true
      this.$http.post('/article/save', this.dataForm).then(({ data: res }) => {
        if (res.code !== 200) {
          this.sendBtnLoading = false
          alert(res.msg)
          return
        }

        //延迟1秒后关闭提示
        setTimeout(() => {
          this.sendBtnLoading = false
          window.location.href = '/t/' + res.data
        }, 1000)
      }).catch(() => {
        this.sendBtnLoading = false
      })
    },
    append() {
        this.dataForm.content = this.contentEditor.getValue()
        this.sendBtnLoading = true
        this.$http.post('/article/append', this.dataForm).then(({ data: res }) => {
            if (res.code !== 200) {
                this.sendBtnLoading = false
                alert(res.msg)
                return
            }

            //延迟1秒后关闭提示
            setTimeout(() => {
              this.sendBtnLoading = false
              window.location.href = '/t/' + res.data
            }, 1000)
        }).catch(() => {
            this.sendBtnLoading = false
        })
    }

  },
  components: {},
}
</script>
<style >
@import "vditor/dist/index.css";
</style>