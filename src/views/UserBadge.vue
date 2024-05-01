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
      <ul class="row row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8 list-unstyled list">
        <li class="col emoji-badge" data-name="0-circle" data-tags="number numeral" data-categories="shapes" v-for="(item) in badges" :key="item.id">
          <a href="javascript:;" :title="item.badgeNameCn" @click="viewBadge(item)" class="link-underline link-underline-opacity-0">
            <span v-html="getIcon(item.badgeName, 32, 32, 32)"></span>
          </a>
        </li>
      </ul>

      <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">徽章</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              <span v-html="getIcon(badge.badgeName, 200, 200, 100)"></span>
              <h3 class="mt-3">{{badge.badgeNameCn}}</h3>
              <h4 class="mt-3 text-secondary">{{memberName}} 在 {{badge.getTime}} 获得</h4>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import { getIcon } from '@/utils/svgIcons.js';

export default {
    name: "UserBadge",
    data() {
        return {
          badges: [],
          badge: {}
        }
    },
  props: {
    memberId: String,
    memberName: String
  },
  created() {
    this.getUserBadge()
  },
  methods: {
    getIcon,
    viewBadge(item) {
      this.badge = item
      this.$Modal.getOrCreateInstance('#exampleModalToggle').show()
    },
    getUserBadge() {
      this.$http.get('/user/badges?uId=' + this.memberId,).then(({ data: res }) => {
        if (res.code !== 200) {
          alert(res.msg)
          return
        }

        this.badges = res.data
      }).catch(() => {
      })
    },
  }
}
</script>

<style scoped>
.emoji-badge {
  border: 1px solid #434549;
  border-radius: 6px;
  margin: 5px;
  text-align: center;
}
</style>