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

    <div class="col-lg-9">
      <div class="mb-2" v-if="switch_enable">
        <a href="javascript:;" @click="editorType = 'html'" class="me-3">html</a>
        <a href="javascript:;" @click="editorType = 'markdown'">markdown</a>
      </div>
      <HtmlEditor v-if="editorType === 'html'"></HtmlEditor>
      <MarkdownEditor v-if="editorType === 'markdown'" :tid="tid" action="append"></MarkdownEditor>
    </div>
    <div class="col-lg-3">
      <div class="card mb-3">
        <div class="card-header pb-0 border-0 d-flex">
          <div class="card-title mb-0">增加附言提示</div>
        </div>
        <div class="card-body">
            <small>
              <div>尊敬的社区成员们：</div>
              <div class="mb-1">欢迎来到我们的网络社区，这里是我们共同交流、学习和成长的平台。为了营造一个健康、和谐、友好的网络环境，我们特此发布以下发帖提示，希望大家共同遵守：</div>
              <ul>
                <li class="mb-1">尊重他人：请尊重每一位社区成员的观点和感受，避免人身攻击、恶意言论和歧视行为。让我们用友善的语言相互交流，共同成长。</li>
                <li class="mb-1">遵守法律法规：请勿发布违法、违规的信息，包括但不限于色情、暴力、赌博等内容。一经发现，我们将立即删除相关主题，并视情况对发布者进行处理。</li>
                <li class="mb-1">保持原创性：鼓励大家发表原创作品，尊重他人的知识产权。请勿抄袭、剽窃他人的作品，一经核实，将予以删除并视情况处理。</li>
                <li class="mb-1">广告与推广：本社区禁止发布广告、推广信息以及恶意刷屏等行为。如有需要，请联系社区管理员进行合作。</li>
                <li class="mb-1">分类发帖：请按照社区的分类导航进行发帖，以便于大家更快地找到感兴趣的内容。不相关的主题将被移至相应板块或删除。</li>
                <li class="mb-1">注意网络安全：请大家注意保护个人隐私，不要在社区中公开泄露个人信息，如电话号码、地址等。同时，谨防网络诈骗，提高安全意识。</li>
                <li class="mb-1">举报不良行为：如果您发现社区内有不良行为或违规行为，请及时向管理员举报，我们将及时处理，共同维护社区秩序。</li>
              </ul>
            </small>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import HtmlEditor from '@/views/article/HtmlEditor.vue'
import MarkdownEditor from '@/views/article/MarkdownEditor.vue'
export default {
    name: "newArticles",
    data() {
        return {
          switch_enable: false, // 是否显示切换编辑器
          editorType: 'markdown',
          tid:''
        }
    },
    components: {
      HtmlEditor, MarkdownEditor
    },
    methods: {

    },
    beforeDestroy() {

    },
    created() {
      this.tid = this.$route.params.id;
    },
    computed: {

    },
}
</script>
<style >

</style>