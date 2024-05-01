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
      <div class="card">
          <!-- Card header START -->
          <div class="card-header d-sm-flex align-items-center justify-content-between border-0 pb-0">
              <h5 class="card-title mb-sm-0">探索活动</h5>
              <!-- Button modal -->
              <a class="btn btn-primary-soft btn-sm" href="javascript:;"  data-bs-toggle="modal" data-bs-target="#modalCreateEvents">
                  <i class="fa-solid fa-plus pe-1"></i> Create events
              </a>
          </div>
          <!-- Card header END -->
          <!-- Card body START -->
          <div class="card-body">
              <!-- Upcoming event START -->
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>即将到来:</strong> 2024年2月19日学习会议
                  <a href="events.html" class="btn btn-xs btn-success ms-md-4">View event</a>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <!-- Upcoming event END -->
              <!-- Events list START -->
              <div class="row">
                  <div class="d-sm-flex align-items-center">
                      <!-- Avatar -->
                      <div class="avatar avatar-xl">
                          <a href="#!"><img class="avatar-img rounded border border-white border-3" src="https://b3logfile.com/avatar/1571447700499_1706680309088.png?imageView2/1/w/256/h/256/format/jpg/interlace/0/q/100" alt=""></a>
                      </div>
                      <div class="ms-sm-4 mt-2 mt-sm-0">
                          <!-- Info -->
                          <h5 class="mb-1"><a href="event-details.html" class="link-success link-underline link-underline-opacity-0"> Comedy on the green </a></h5>
                          <ul class="nav nav-stack small">
                              <li class="nav-item">
                                  <i class="bi bi-calendar-check pe-1"></i> Mon, Sep 25, 2020 at 9:30 AM
                              </li>
                              <li class="nav-item">
                                  <i class="bi bi-geo-alt pe-1"></i> San francisco
                              </li>
                              <li class="nav-item">
                                  <i class="bi bi-people pe-1"></i> 77 going
                              </li>
                          </ul>
                      </div>
                      <!-- Button -->
                      <div class="d-flex mt-3 ms-auto">
                          <div class="dropdown">
                              <!-- Card share action menu -->
                              <button class="icon-md btn btn-secondary-soft" type="button" id="profileAction" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="bi bi-three-dots"></i>
                              </button>
                              <!-- Card share action dropdown menu -->
                              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileAction">
                                  <li><a class="dropdown-item" href="javascript:;"> <i class="bi bi-bookmark fa-fw pe-2"></i>Share profile in a message</a></li>
                                  <li><a class="dropdown-item" href="javascript:;"> <i class="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save your profile to PDF</a></li>
                                  <li><a class="dropdown-item" href="javascript:;"> <i class="bi bi-lock fa-fw pe-2"></i>Lock profile</a></li>
                                  <li><hr class="dropdown-divider"></li>
                                  <li><a class="dropdown-item" href="javascript:;"> <i class="bi bi-gear fa-fw pe-2"></i>Profile settings</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- Events list END -->
          </div>
          <!-- Card body END -->

          <div class="modal fade" id="modalCreateEvents" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                      <!-- Modal feed header START -->
                      <div class="modal-header">
                          <h5 class="modal-title" id="modalLabelCreateEvents">创建活动</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <!-- Modal feed header END -->
                      <!-- Modal feed body START -->
                      <div class="modal-body">
                          <!-- Form START -->
                          <form class="row g-4">
                              <!-- Title -->
                              <div class="col-12">
                                  <label class="form-label">标题</label>
                                  <input type="text" class="form-control" placeholder="活动名称">
                              </div>
                              <!-- Description -->
                              <div class="col-12">
                                  <label class="form-label">描述</label>
                                  <textarea class="form-control" rows="2" placeholder="Ex: 主题, 日程等"></textarea>
                              </div>
                              <!-- Date -->
                              <div class="col-sm-4">
                                  <label class="form-label">日期</label>
                                  <input type="text" class="form-control flatpickr flatpickr-input" placeholder="Select date" readonly="readonly">
                              </div>
                              <!-- Time -->
                              <div class="col-sm-4">
                                  <label class="form-label">时间</label>
                                  <input type="text" class="form-control flatpickr flatpickr-input" data-enabletime="true" data-nocalendar="true" placeholder="Select time" readonly="readonly">
                              </div>
                              <!-- Duration -->
                              <div class="col-sm-4">
                                  <label class="form-label">期间</label>
                                  <input type="text" class="form-control" placeholder="1hr 23m">
                              </div>
                              <!-- Location -->
                              <div class="col-12">
                                  <label class="form-label">地点</label>
                                  <input type="text" class="form-control" placeholder="活动选择所在的地理位置">
                              </div>
                              <!-- Add guests -->
                              <div class="col-12">
                                  <label class="form-label">添加参与者</label>
                                  <input type="email" class="form-control" placeholder="Guest email">
                              </div>
                              <!-- Avatar group START -->
                              <div class="col-12 mt-3">
                                  <ul class="avatar-group list-unstyled align-items-center mb-0">
                                      <li class="">
                                          <small> +50 </small>
                                      </li>
                                  </ul>
                              </div>
                              <!-- Dropzone photo START -->
                              <div class="mb-3">
                                  <label class="form-label">上传附件</label>
                                  <div class="dropzone dropzone-default card shadow-none dz-clickable" data-dropzone="{&quot;maxFiles&quot;:2}">
                                      <div class="dz-message">
                                          <i class="bi bi-file-earmark-text display-3"></i>
                                          <p>将演示文稿和文档拖放到此处或单击上传。</p>
                                      </div>
                                  </div>
                              </div>
                              <!-- Dropzone photo END -->
                          </form>
                          <!-- Form END -->
                      </div>
                      <!-- Modal feed body END -->
                      <!-- Modal footer -->
                      <!-- Button -->
                      <div class="modal-footer">
                          <button type="button" class="btn btn-danger-soft me-2" data-bs-dismiss="modal"> 取消 </button>
                          <button type="button" class="btn btn-success-soft"> 立即创建 </button>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </div>
</template>

<script>
export default {
    name: "events"
}
</script>

<style scoped>
.btn-primary-soft {
    color: #198754;
    background-color: #1987541c;
}
.avatar-img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}
.avatar-xl {
    height: 5.125rem;
    width: 5.125rem;
}
.avatar {
    height: 3rem;
    width: 3rem;
    position: relative;
    display: inline-block;
    -ms-flex-negative: 0 !important;
    flex-shrink: 0 !important;
}

.dropzone.dz-clickable {
    cursor: pointer;
}
.dropzone {
    min-height: auto;
    border-radius: 0.4rem;
    position: relative;
    z-index: 0;
    border: 2px dashed #eef0f2;
}
.dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {
    cursor: pointer;
}

.dropzone .dz-message {
    text-align: center;
    margin: 2em 0;
}

</style>