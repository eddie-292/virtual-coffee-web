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
        <LeftTable></LeftTable>
      </div>
      <div class="col-lg-9 gap-4" style="border-left: 1px solid #3f3f3f">
        <!-- Main content START -->
        <div class="vstack gap-4">
          <!-- Blog single START -->
          <div class="card card-body border-0">
            <img class="rounded mb-4" v-if="article.mainImageUrl" :src="article.mainImageUrl" alt="">
            <div>
              <!-- Tag -->
              <a href="javascript:;" class="badge bg-success bg-opacity-10 link-underline link-underline-opacity-0 text-success mb-2 fw-bold">{{ article.category }}</a>
              <!-- Title info -->
              <h1 class="mb-2 h2">{{ article.title }}</h1>
              <ul class="nav nav-stack gap-3 align-items-center">
                <li class="nav-item">
                  <div class="">
                    by <router-link target="_blank" :to="{ name: 'member', params: { id: article.creatorUserId } }" class="link-success"> {{ article.creatorUsername }} </router-link>
                  </div>
                </li>
                <li class="nav-item"> <i class="bi bi-calendar-date pe-1"></i>{{ article.createTime }}</li>
                <li class="nav-item"> <i class="bi bi-clock pe-1"></i>{{readingTime}}</li>
                <li class="nav-item"> <i class="bi bi-eye pe-1"></i>{{article.view}}</li>
              </ul>

              <!-- description -->
              <p class="mt-4"></p>

              <!-- Row START    -->
                <div v-show="type === 1" class="article-content" v-highlight v-html="article.content"></div>
                <div v-show="type === 0" id="preview" class="article-content vditor-reset mb-5"></div>

                <div v-show="article.appendCount > 0">
                  <div class="text-secondary mb-2"><i class="bi bi-caret-right"></i> 第一次附言</div>
                  <div v-show="type === 0" id="previewAppend1" class="article-content vditor-reset mb-5"></div>
                </div>
                <div v-show="article.appendCount > 1">
                  <div class="text-secondary mb-2"><i class="bi bi-caret-right"></i> 第二次附言</div>
                  <div v-show="type === 0" id="previewAppend2" class="article-content vditor-reset mb-5"></div>
                </div>
                <div v-show="article.appendCount > 2">
                  <div class="text-secondary mb-2"><i class="bi bi-caret-right"></i> 第三次附言</div>
                  <div v-show="type === 0" id="previewAppend3" class="article-content vditor-reset "></div>
                </div>
              <!-- Row END -->

                <div class="mt-3 text-secondary small" v-if="article.updateTime">
                  主题最后更新在 {{ article.updateTime }}
                </div>
            </div>
          </div>
          <!-- Card END -->

          <div class="card card-body border-0 p-0">
            <div class="mb-3">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-sm btn-primary-soft" @click="recharge">
                  <span class="d-flex align-items-center p-1 pe-2 text-dark-emphasis ">
                    <Star50 :w="24"></Star50>
                    <span style="margin-left: 2px;" v-if="article.batteryLevel > 0">{{article.batteryLevel}}</span>
                  </span>
                </button>
                <button type="button" class="btn btn-sm btn-primary-soft" @click="favorite" v-if="$store.state.loginFlg">
                  <i class="bi bi-star" v-if="!article.favorite"></i>
                  <i class="bi bi-star-fill" v-if="article.favorite"></i>
                  {{!article.favorite ? '收藏' : '取消'}}
                </button>
                <button type="button" class="btn btn-sm btn-primary-soft" @click="report">报告</button>
                <button type="button" class="btn btn-sm btn-primary-soft" @click="update" v-if="$store.state.loginFlg && $store.state.authInfo.userId === article.creatorUserId && article.update">编辑</button>
                <button type="button" class="btn btn-sm btn-primary-soft" @click="append" v-if="$store.state.loginFlg && $store.state.authInfo.userId === article.creatorUserId && article.append">附言</button>
              </div>
            </div>
            <CommentFloor :title="article.title" :bizId="id" :article-creator-user-id="article.creatorUserId"></CommentFloor>
          </div>
          <!-- Blog single END -->
        </div>
        <!-- Main content END -->
      </div>
    </div>
  </div>
</template>

<script>
import VditorPreview from 'vditor/dist/method.min'
import PageLoading from "@/views/pageLoading.vue";
import CommentFloor from "@/views/CommentFloor.vue";
import LeftTable from "@/views/user/leftTable.vue";
import Star50 from "@/views/component/Star50.vue";

export default {
    name: "articleContent",
    components: {Star50, LeftTable, PageLoading, CommentFloor},
    created() {

    },
    data() {
        return {
          pageOk: false,
          id: '',
          type: 0,
          readingTime: '5 min read',
          article: {},
          rechargeError: '',
          rechargeErrorMsg:'',
          cdn: 'https://kafeih.com/vditor/'
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        if (this.$route.params.reload)  {
            console.log('reload')
        }
        this.$nextTick(() => {
            this.getContent()
        })
    },
    methods: {
        async renderMarkdown(md, id) {
            const previewElement = document.getElementById(id)
            VditorPreview.preview(previewElement, md, {
                cdn: this.cdn,
                mode: 'dark',
                theme: {
                  current: "dark"
                },
                lazyLoadImage: true,
                hljs: {
                    style: "native"
                }
            })
        },
        getContent() {
            this.$http.get('/article/' + this.id).then(({data: res}) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                if (res.data === null) {
                    this.$goTo('404')
                    return
                }

                this.pageOk = true
                this.article = res.data
                this.type = this.article.type

                //根据this.article.content的长度来计算阅读时间
                this.readingTime = Math.ceil(this.article.content.length / 1200) + ' min read'

                //改变页面标题
                document.title = this.article.title + ' - ' + window.common.webSiteName

                // markdown 渲染
                if (this.type === 0) {
                    this.renderMarkdown(res.data.content, 'preview');
                }
                if (this.article.appendCount > 0) {
                    this.article.appendList.forEach((item, i) => {
                        this.renderMarkdown(item.content, 'previewAppend' + (i + 1));
                    })
                }

                //记录最近查询的主题在localStorage
                this.setRecentArticle()

            }).catch(() => {

            })
        },
      setRecentArticle() {
        //记录最近查询的主题在localStorage
        let recentArticle = localStorage.getItem('recentArticle')
        if (recentArticle === null) {
          recentArticle = []
        } else {
          recentArticle = JSON.parse(recentArticle)
        }

        //复制一份this.article
        const currentArticle = JSON.parse(JSON.stringify(this.article))
        //去掉this.article中的content字段，减少localStorage的存储量
        delete currentArticle.content
        delete currentArticle.summary

        //如果已经存在则替换
        for (let i = 0; i < recentArticle.length; i++) {
          if (recentArticle[i].articleId === currentArticle.articleId) {
            recentArticle[i] = currentArticle
            localStorage.setItem('recentArticle', JSON.stringify(recentArticle))
            return;
          }
        }

        //如果超过10个则删除最后一个
        if (recentArticle.length >= 10) {
          recentArticle.pop()
        }

        recentArticle.push(currentArticle)
        localStorage.setItem('recentArticle', JSON.stringify(recentArticle))
        //记录最近查询的主题在localStorage
      },
      favorite() {
        this.$http.post('/article/favorite', {articleId: this.id}).then(({ data: res }) => {
          if (res.code !== 200) {
            alert(res.msg)
            return
          }
          this.article.favorite = !this.article.favorite
        }).catch(() => {
        })
      },
      append() {
        this.$router.push({ path: '/t/append/' + this.id });
      },
      update() {
        this.$router.push({ path: '/t/update/' + this.id });
      },
      report() {
        this.$http.post('/article/report', {articleId: this.id}).then(({ data: res }) => {
          if (res.code !== 200) {
            alert(res.msg)
            return
          }
        }).catch(() => {
        })
      },
      recharge() {
            if (!this.$store.state.loginFlg) {
                return
            }

            if (this.$store.state.authInfo.userId === this.article.creatorUserId) {
              return
            }

            if (this.$store.state.authInfo.economy <= 0) {
              this.rechargeErrorMsg = '星星不足'
              return
            }

            this.$http.post('/article/recharge', {articleId: this.id}).then(({ data: res }) => {
              if (res.code !== 200) {
                this.rechargeErrorMsg = (res.msg)
                return
              }

              this.article.batteryLevel += 1
            }).catch(() => {
            })
      },
    }
}
</script>

<style>
@import "vditor/dist/index.css";
@import "vditor/dist/css/content-theme/dark.css";

.vditor-reset table tr {
  background-color: #2f363d !important;
}

.vditor-reset table tbody tr:nth-child(2n) {
  background-color: #24292e !important;
}

.article-content {

}


.vditor-reset {
    color: unset !important;
}

pre {
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 0rem;
}

.article-content img {
    max-width: 100%;
    border-radius: 5px;
    border: 1px solid gray;
}

</style>
