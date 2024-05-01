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
        <div v-if="!$store.state.loginFlg">
            <div class="card" style="">
                <div class="card-body">
                    <h5 class="card-title">欢迎你！</h5>
                    <p class="card-text">{{ common.webSiteDesc }}</p>
                    <router-link to="/login" class="btn btn-sm btn-primary-soft mt-3 w-25">登录</router-link>


                    <p class="mt-5 mb-3 text-body-secondary">
                        <a class="text-body-secondary link-underline link-underline-opacity-0"
                           href="https://beian.miit.gov.cn/" target="_blank">{{ common.recordNum }}</a>
                    </p>
                    <p class="mb-3 text-body-secondary">
                        <a data-v-1c9e004c="" target="_blank"  href="https://www.upyun.com/?utm_source=lianmeng&amp;utm_medium=referral">
                            <img data-v-1c9e004c="" src="../../assets/ypy.png" style="width: 100px;border-radius: 5px;padding: 0 20px;background: radial-gradient(ellipse at 50% -50%, #6c94ff 0, #000 100%);">
                        </a>
                    </p>
                </div>
            </div>
        </div>

        <div :key="Math.floor(Math.random() * 100000)" v-if="$store.state.loginFlg">
            <div class="card" style="">
                <div class="h-60px card-img-top" :style="style"></div>
                <div class="card-body">
                    <div class="text-center mb-2">
                        <div class="avatar avatar-lg mt-n5 mb-3">
                            <router-link :to="{ name: 'member', params: { id: $store.state.authInfo.userId } }" target="_blank">
                                <img class="avatar-img rounded border border-white border-3" :src="$store.state.authInfo.avatar" alt="">
                            </router-link>
                        </div>
                        <h5 class="my-nickname">{{ $store.state.authInfo.nickname }}</h5>
                        <p class="card-text text-secondary">{{ $store.state.authInfo.occupation }}</p>
                    </div>
                    <div class="hstack gap-2 gap-xl-3 justify-content-center">
                        <!-- User stat item -->
                        <div class="text-center">
                            <h6 class="mb-0">{{ $store.state.authInfo.postCount }}</h6>
                            <small>主题</small>
                        </div>
                        <!-- Divider -->
                        <div class="vr"></div>
                        <!-- User stat item -->
                        <div class="text-center">
                            <h6 class="mb-0">{{ $store.state.authInfo.followingCount }}</h6>
                            <small>关注中</small>
                        </div>
                    </div>
                </div>
                <div class="list-group list-group-flush">
                    <div class="list-group-item  nav-link-text text-warning-emphasis" style="cursor: pointer;" @click="$goToP('settings', {tab: 'stars'})">
                      <span class="d-flex align-items-center p-1 pe-2 text-dark-emphasis ">
                        <Star50 :w="24"></Star50>
                        <span style="margin-left: 2px;">{{ $store.state.authInfo.economy }}</span>
                      </span>
                    </div>

                    <!--      style="background-image: url('https://i.devnts.com/mygroup/default/dailyRewards.png');"          -->
                    <button type="button" class="list-group-item list-group-item-action green-gradient" @click="dailyRewards" v-if="!$store.state.authInfo.dailyRewards">
                        <span class=""><i class="bi bi-gift"></i> 领取每日登录奖励</span>
                    </button>
                </div>
                <div class="card-body p-2">
                    <div class="text-center">
                        <router-link :to="{ name: 'member', params: { id: $store.state.authInfo.userId } }"
                                     target="_blank"
                                     class="link-underline link-underline-opacity-0  link-success">我的主页
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

import Star50 from "@/views/component/Star50.vue";

export default {
  components: {Star50},
    data() {
        return {
            style: {
                backgroundImage: 'url(' + this.$store.state.authInfo.homeBackgroundImage+ ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            },
            common: {
                year: window.common.year,
                recordNum: window.common.recordNum,
                webSiteName: window.common.webSiteName,
                webSiteDesc: window.common.webSiteDesc
            },
        }
    },
    created() {

    },
    mounted() {
        this.$nextTick(() => {
          this.getMyProfile()
          if (!this.$store.state.authInfo.homeBackgroundImage)  {
            this.style.backgroundImage = 'linear-gradient(to right,#2e7d32,#c8e6c9)'
          }
        })
    },
    methods: {
        dailyRewards() {
            this.$http.post('/user/daily-rewards').then(({data: res}) => {
                this.$store.state.authInfo.dailyRewards = true
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                // 已领取
                this.$store.commit('setSignReward', res.data)

                //刷新当前
                //window.location.reload()
            }).catch(() => {
            })
        },
        getMyProfile() {
            if (this.$store.state.loginFlg) {
                this.$http.get('/user/my-profile').then(({data: res}) => {
                    if (res.code !== 200) {
                        alert(res.msg)
                        return
                    }

                    if (null !== res.data) {
                        this.$store.state.authInfo = res.data
                        this.$store.commit("SET_AUTH_INFO", res.data)
                    } else {
                        this.$store.commit('resetStore')
                        this.$store.state.loginFlg = false
                    }
                }).catch(() => {
                })
            }
        },

    }
}
</script>

<style scoped>
.my-nickname {
    font-weight: 800;
    font-size: 20px;
}

.nav-link-text {
    font-weight: 800;
    font-size: 14px;
}

.h-60px {
    height: 60px !important;
}

.avatar-lg {

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

.avatar-img {
    width: 72px;
    height: 72px;
    -o-object-fit: cover;
    object-fit: cover;
}
</style>