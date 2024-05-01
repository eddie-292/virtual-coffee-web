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
        <header class="p-3 mb-3 border-bottom shadow-sm">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
                       style="margin-right: 20px;">
                        <img class="" src="../assets/logo.png" alt="" width="50" height="40">
                    </a>
                    <form class="col-12 col-lg-auto me-lg-auto mb-3 mb-lg-0 me-lg-3" role="search"
                          @submit.prevent="search">
                        <input type="search" :style="{'width': width}" v-model="keyword" class="form-control"
                               placeholder="搜索..." aria-label="Search" @focus="inputFocus()" @focusout="inputBlur()">
                    </form>

                    <ul class="nav col-12 col-lg-auto  mb-2 justify-content-center mb-md-0" style="margin-right: 10px;">
                        <li>
                            <router-link class="nav-link px-2 link-body-emphasis" to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link class="nav-link px-2 link-body-emphasis" to="/team">Groups</router-link>
                        </li>
                        <li>
                            <router-link class="nav-link px-2 link-body-emphasis" to="/topics">主题</router-link>
                        </li>
                        <li v-if="$store.state.authInfo.nickname">
                            <router-link to="/profile" class="nav-link px-2 link-body-emphasis">
                                <strong class="text-success">{{ $store.state.authInfo.nickname }}</strong>
                            </router-link>
                        </li>
                    </ul>


                    <div class="text-end" v-if="!$store.state.loginFlg">
                        <button type="button" class="btn btn-sm btn-primary-soft me-2" @click="$goTo('login')">登录
                        </button>
                        <button type="button" class="btn btn-sm btn-secondary-soft" @click="$goTo('signup')">注册
                        </button>
                    </div>

                    <div class="dropdown text-end" v-if="$store.state.loginFlg">
                        <a href="javascript:;" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                           data-bs-toggle="dropdown" aria-expanded="false">
                          <img :src="$store.state.authInfo.avatar" alt="mdo" width="32" height="32" class="rounded-2 position-relative"/>
                          <span style="left: 78%!important;padding: 0.4rem!important;" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger rounded-circle" v-if="unreadNoticeCount > 0">
                            <span class="visually-hidden">New alerts</span>
                          </span>
                        </a>
                        <ul class="dropdown-menu text-small">
                            <li v-if="$checkPermission('PUBLISH_TOPIC')">
                                <router-link class="dropdown-item" to="/write">创建主题</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/settings">设置</router-link>
                            </li>
                            <li>
                              <router-link class="dropdown-item" to="/notifications">通知 <span v-if="unreadNoticeCount > 0">{{unreadNoticeCount}}</span></router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" @click="signOut" href="javascript:;">Sign out</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </header>

    </div>
</template>

<script>
export default {
    name: 'AppHeaders',
    data() {
        return {
            //loginUser: this.$store.state.authInfo,
            version: window.common.version,
            webSiteName: window.common.webSiteName,
            keyword: '',
            width: '100%',
            unreadNoticeCount: 0
        }
    },
    created() {
    },
    mounted() {
      if (this.$store.state.loginFlg) {
        this.getPermissions()
        this.notifyPermission()
        //每次刷新页面时，重新获取未读消息数量
        this.getUnreadNoticeCount();
        //每隔1分钟获取一次未读消息数量
        setInterval(() => {
          this.getUnreadNoticeCount();
        }, 60000)
      }
    },
    methods: {
        notifyPermission() {
            // 手动获取用户桌面通知权限
            if (this.Push.Permission.GRANTED) { // 判断当前是否有权限，没有则手动获取
                this.Push.Permission.request()
            }
            // 监听浏览器 当前系统是否在当前页
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {   // 处于当前页面
                                          // 关闭之前的消息通知，清空
                    this.Push.clear()
                    this.notificationArr = []
                }
            })
        },
        notify() {
            //桌面通知
            if (this.Push.Permission.has()) {
                if (this.unreadNoticeCount > 0) {
                    this.Push.create(window.common.webSiteName, {
                        body: `您有${this.unreadNoticeCount}条未读消息`,
                        icon: '/favicon.ico',
                        timeout: 5000,
                        onClick: function () {
                            window.focus()
                        }
                    })
                }
            }
        },
        inputFocus() {
            // 最大200，缓慢递增
            this.width = '200%';
        },
        inputBlur() {
            // 鼠标移出 input 时，恢复 input 原状
            this.width = '100%';
        },
        search() {
            window.open(`https://www.bing.com/search?q=${this.keyword} site:kafeih.com`);
        },
        getUnreadNoticeCount() {
          if (!$store.state.loginFlg) {
            return
          }

          this.$http.get('/user/unread-notice-count').then(({data: res}) => {
            if (res.code !== 200) {
              alert(res.msg)
              return
            }

            localStorage.setItem("unreadNoticeCount", res.data)
            this.unreadNoticeCount = res.data
            this.notify()
          }).catch(() => {
          })
        },
        // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
        goTo(menuId) {
            this.$goTo(menuId)
        },
        signOut() {
            this.$store.commit('resetStore')
            this.$http.post('/user/sign-out', this.dataForm).then(({data: res}) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

              this.$goToP('login', {reload: true})
            }).catch(() => {
            })
        },
        getPermissions() {
            this.$http.get('/user/permissions').then(({data: res}) => {
                if (res.code !== 200) {
                    alert(res.msg)
                    return
                }

                localStorage.setItem("permissions", JSON.stringify(res.data))
                if (null != res.data) {
                  this.$root.$data.userPermissions = res.data.map(item => item.permission_code)
                }
            }).catch(() => {
            })
        }
    }
}
</script>

<style scoped>
.form-control-dark {
    border-color: var(--bs-gray);
}

.form-control-dark:focus {
    border-color: #fff;
    box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.text-small {
    font-size: 85%;
}

.dropdown-toggle:not(:focus) {
    outline: 0;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

.b-example-divider {
    width: 100%;
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
}

.bi {
    vertical-align: -.125em;
    fill: currentColor;
}

.nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
}

.nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
    --bd-violet-bg: #712cf9;
    --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

    --bs-btn-font-weight: 600;
    --bs-btn-color: var(--bs-white);
    --bs-btn-bg: var(--bd-violet-bg);
    --bs-btn-border-color: var(--bd-violet-bg);
    --bs-btn-hover-color: var(--bs-white);
    --bs-btn-hover-bg: #6528e0;
    --bs-btn-hover-border-color: #6528e0;
    --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
    --bs-btn-active-color: var(--bs-btn-hover-color);
    --bs-btn-active-bg: #5a23c8;
    --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
    z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
    display: block !important;
}
</style>