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
  <div class="container w-100">
    <div v-if="tabIndex === 0">
      <div>
        图片规则和建议
        <ul>
          <li>禁止使用任何低俗或者敏感图片作为头像</li>
          <li>禁止使用二维码图片，社区拒绝过度的推广行为</li>
          <li>请勿使用异性照片作为头像，这样可能会对其他人产生误导</li>
          <li>建议尽量不要使用自己的真人照片头像，除非你像我一样蜜汁自恋</li>
          <li>不反对使用偶像的照片，因为他是我们在很长一段时间上的精神支柱</li>
          <li>为保证浏览体验，请使用 240 * 240 以上分辨率图片</li>
        </ul>
      </div>
        <input type="file" @change="uploadFile">
    </div>

    <div v-if="tabIndex === 1" class="text-center">
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">正在处理...</span>
        </div>
        <h5 class="mt-2">正在处理...</h5>
    </div>

    <div v-if="tabIndex === 2">
      <p>上传进度：</p>
      <div class="progress" role="progressbar" aria-label="Animated Success example" :aria-valuenow="uploadProgress" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" :style="{ width: uploadProgress + '%' }">{{ uploadProgress }}%</div>
      </div>
    </div>

    <div v-if="tabIndex === 3">
      <div class="mb-4 text-center">
          <img :src="baseUrl + uploadResult.url" style="max-width: 300px;max-height:300px;border-radius: 3px;"  alt=""/>
      </div>
      <div class="row text-center">
          <div class="col-12" v-if="changeImgType === 'h'">
              <button type="button" class="btn btn-secondary-soft btn-sm" @click="changeTarget('h')">改变背景图</button>
          </div>
          <div class="col-12" v-if="changeImgType === 'a'">
              <button type="button" class="btn btn-secondary-soft btn-sm" @click="changeTarget('a')">改变头像</button>
          </div>
      </div>
    </div>

    <div v-if="tabIndex === 4" class="text-center">
      <i class="bi bi-emoji-frown" style="font-size: 5em"></i>
      <p class="mb-2" style="font-size: 2em">上传失败</p>
      <button type="button" class="btn btn-secondary btn-sm" @click="tabIndex = 0">重 试</button>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      tabIndex: 0,
      baseUrl: '',
      fileInfo: null,
      uploading: false,
      uploadProgress: 0,
      uploaded: false,
      uploadResult: null,
      uploadError: false,
      timeout: 60000
    }
  },
  props: {
      changeImgType: String
  },
  created() {

  },
  methods: {
    getUPYunConfig(f) {
        this.$http.get('/upyun/config/avatar?t=' + this.changeImgType).then(({ data: res }) => {
            if (res.code !== 200) {
                this.tabIndex = 0
                alert(res.msg)
                return
            }

            f(res.data)
        }).catch(() => {

        })
    },
    changeTarget(t) {
        this.updateUserInfo(t, this.baseUrl + this.uploadResult.url)
    },
    updateUserInfo(t, link) {
        const data = {
            avatar: t === 'a' ? link : '',
            homeBackgroundImage: t === 'h' ? link : ''
        }
        this.$http.post('/user/info/update-image', data).then(({ data: res }) => {
            if (res.code !== 200) {
                alert(res.msg)
                return
            }

            this.$store.commit("SET_AUTH_INFO", res.data)

            //刷新当前
            window.location.reload()
        }).catch(() => {})
    },
    uploadFile(event) {
      const file = event.target.files[0]
      this.fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
      }
      this.tabIndex = 1
      this.getUPYunConfig((d) => {
          this.baseUrl = d.baseUrl
          const formData = new FormData()
          formData.append('file', file)
          formData.append('policy', d.policy)
          formData.append('authorization', d.signature)
          const xhr = new XMLHttpRequest()
          xhr.timeout = this.timeout; // 5 秒
          xhr.open('POST', d.url)
          xhr.upload.addEventListener('progress', event => {
              if (event.lengthComputable) {
                  this.uploading = true
                  this.tabIndex = 2
                  this.uploadProgress = Math.round(
                      (event.loaded / event.total) * 100
                  )
              }
          })
          xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                  this.uploading = false
                  if (xhr.status === 200) {
                      this.tabIndex = 3
                      this.uploaded = true
                      this.uploadResult = JSON.parse(xhr.responseText)
                      this.fileInfo = null
                  } else {
                      this.tabIndex = 4
                      this.uploadError = true
                      this.uploadResult = JSON.parse(xhr.responseText)
                      this.fileInfo = null
                  }
              }
          }
          xhr.ontimeout = function () {
              console.log("请求超时");
          };
          xhr.send(formData)
      });

    },
  },
}
</script>
