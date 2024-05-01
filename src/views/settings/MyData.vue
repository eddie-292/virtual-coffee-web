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
    <!--  我的主题  -->
    <div class="mb-4">
      <div class="card ">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link link-success strong" :class="{active: nav === 'Topics'}" aria-current="true" @click="nav = 'Topics'" href="javascript:;">Topics</a>
            </li>
            <li class="nav-item">
              <a class="nav-link link-success strong" :class="{active: nav === 'Feeds'}" aria-current="true" @click="nav = 'Feeds'" href="javascript:;">Feeds</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <keep-alive>
            <Topic v-if="nav === 'Topics'"></Topic>
            <Feeds v-if="nav === 'Feeds'"></Feeds>
          </keep-alive>
        </div>
      </div>
    </div>

    <!--  生成邀请码  -->
    <div class="mb-4" v-if="this.$store.state.authInfo.username && this.$store.state.authInfo.username != null">
      <h2>Referral</h2>
      <div class="mb-2">您可以在您的个人网站上推广{{websiteName}}的链接。当有新用户通过您的推荐成功注册时，您和这位新用户都将获得<strong style="margin: 0 3px;">{{rewardStars}}</strong>颗星星奖励。</div>
      <div class="input-group">
        <button class="btn btn-secondary-soft" type="button" id="button-addon1" @click="copyReferralLink">{{copyReferralLinkBtnMsg}}</button>
        <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" disabled aria-describedby="button-addon1" v-model="referralLink">
      </div>
    </div>

  </div>
</template>

<script>
import Topic from './Topics.vue';
import Feeds from './Feeds.vue';
export default {
  components: {
    Topic,
    Feeds
  },
  data() {
    return {
      copyReferralLinkBtnMsg: '复制推荐链接',
      referralLink: window.location.protocol + "//" + window.location.host + '/invite/' + this.$store.state.authInfo.username,
      rewardStars: 88,
      websiteName: window.common.webSiteName,
      nav:'Topics',
      topics: ['Topic 1', 'Topic 2', 'Topic 3'],
      feed: ['Feed Item 1', 'Feed Item 2', 'Feed Item 3'],


      itemsPerPage: 10, // 每页显示的消息数量
      currentPage: 1, // 当前页码,
      total: 1000, // 数据总量
      pages: 100, //总页数
    };
  },
  methods: {
    copyReferralLink() {
      // Copy referral link to clipboard
      const el = document.createElement('textarea');
      el.value = this.referralLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copyReferralLinkBtnMsg = '已复制';
      // Reset button text after 2 seconds
      setTimeout(() => {
        this.copyReferralLinkBtnMsg = '复制推荐链接';
      }, 2000);
    },
  },
  computed: {

  }

}
</script>

<style scoped>

</style>
