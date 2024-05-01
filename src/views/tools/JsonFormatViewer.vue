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

    <div class="row" v-if="errorMsg">
      <div class="col-12">
        <div class="alert alert-warning" role="alert">
          {{errorMsg}}
        </div>
      </div>
    </div>

    <div class="row ">
      <div class="col-6">
        <textarea v-model="testJson" class="editor-jf" @input="changeVal"></textarea>
      </div>
      <div class="col-6">
        <json-viewer :value="testJsonView" :expand-depth="5" sort ></json-viewer>
      </div>
    </div>

  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  components:{
    JsonViewer
  },
  data() {
    return {
      testJson: "",
      testJsonView:'',
      errorMsg:''
    }
  },
  created() {

  },
  methods: {
    changeVal() {
      if (!this.testJson) {
        this.errorMsg = ''
        this.testJsonView = ''
        return
      }

      try {
        this.testJsonView = JSON.parse(this.testJson)
        this.errorMsg = ''
      } catch (error) {
        this.testJsonView = error.message
        console.log(error)
      }

    }
  }
}
</script>

<style>
.jv-container.jv-light {
  background: #000000 !important;
  white-space: nowrap;
  color: #f8f7f7;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;
}
.jv-container.jv-light .jv-key {
  color: #f8f8f8 !important;
  margin-right: 4px;
}
.jv-container.jv-light .jv-item.jv-object {
  color: #f8f8f8 !important;
}
.jv-container.jv-light .jv-item.jv-array {
  color: #f8f8f8 !important;
}

.jv-container {
  width: 100%;
  height: calc(100vh - 300px);
  overflow: auto;
  border-radius: 6px;
}

.editor-jf {
  width: 100%;
  height: calc(100vh - 300px);
  border-radius: 6px;
  padding: 10px;
  border: unset;
  resize: none;
}

.editor-jf:focus {
  outline: none;
  border: unset!important;
}
</style>