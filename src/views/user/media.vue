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
              <h5 class="card-title">Photos</h5>
              <!-- Button modal -->
              <a class="btn btn-sm btn-primary-soft" href="javascript:;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                  </svg>
                  Add
              </a>
          </div>
          <!-- Card header END -->
          <!-- Card body START -->
          <div class="card-body">
              <!-- Photos of you tab START -->
              <div class="row g-3">

                  <!-- Photo item START -->
                  <div class="col-sm-6 col-md-4 col-lg-3">
                      <!-- Photo -->
                      <a href="assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
                          <img class="rounded img-fluid" src="https://b3logfile.com/avatar/1571447700499_1706680309088.png?imageView2/1/w/256/h/256/format/jpg/interlace/0/q/100" alt="">
                      </a>
                  </div>
                  <!-- Photo item END -->

                  <!-- Photo item START -->
                  <div class="col-sm-6 col-md-4 col-lg-3">
                      <!-- Photo -->
                      <a href="assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
                          <img class="rounded img-fluid" src="https://b3logfile.com/avatar/1571447700499_1706680309088.png?imageView2/1/w/256/h/256/format/jpg/interlace/0/q/100" alt="">
                      </a>
                  </div>
                  <!-- Photo item END -->

                  <!-- Photo item START -->
                  <div class="col-sm-6 col-md-4 col-lg-3">
                      <!-- Photo -->
                      <a href="assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
                          <img class="rounded img-fluid" src="https://b3logfile.com/avatar/1571447700499_1706680309088.png?imageView2/1/w/256/h/256/format/jpg/interlace/0/q/100" alt="">
                      </a>
                  </div>
                  <!-- Photo item END -->

                  <!-- Photo item START -->
                  <div class="col-sm-6 col-md-4 col-lg-3">
                      <!-- Photo -->
                      <a href="assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
                          <img class="rounded img-fluid" src="https://b3logfile.com/avatar/1571447700499_1706680309088.png?imageView2/1/w/256/h/256/format/jpg/interlace/0/q/100" alt="">
                      </a>
                  </div>
                  <!-- Photo item END -->

                  <!-- Photo item START -->
                  <div class="col-sm-6 col-md-4 col-lg-3">
                      <!-- Photo -->
                      <a href="assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
                          <img class="rounded img-fluid" src="https://b3logfile.com/avatar/1571447700499_1706680309088.png?imageView2/1/w/256/h/256/format/jpg/interlace/0/q/100" alt="">
                      </a>
                  </div>
                  <!-- Photo item END -->

                  <!-- Photo item START -->
                  <div class="col-sm-6 col-md-4 col-lg-3">
                      <!-- Photo -->
                      <a href="assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
                          <img class="rounded img-fluid" src="https://b3logfile.com/avatar/1571447700499_1706680309088.png?imageView2/1/w/256/h/256/format/jpg/interlace/0/q/100" alt="">
                      </a>
                  </div>
                  <!-- Photo item END -->

              </div>
              <!-- Photos of you tab END -->
          </div>
          <!-- Card body END -->
      </div>

      <!--   上传照片   -->
      <div class="modal fade" id="exampleModal" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div class="modal-dialog">
              <div class="modal-content">
                  <!-- Modal header -->
                  <div class="modal-header">
                      <h5 class="modal-title" id="modalLabelCreateAlbum">创建新的上传</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <!-- Form START -->
                      <form>
                          <!-- Album name -->
                          <div class="mb-3">
                              <label class="form-label">名称</label>
                              <input type="text" class="form-control" placeholder="为图片命名">
                          </div>
                          <!-- Upload Photos or Videos -->
                          <div class="mb-3">
                              <!-- Dropzone photo START -->
                              <label class="form-label">上传照片</label>
                              <div class="dropzone dropzone-default card shadow-none dz-clickable" >
                                  <div class="dz-message">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16">
                                          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/>
                                      </svg>
                                      <p>单击此处上传</p>
                                  </div>
                              </div>
                              <!-- Dropzone photo END -->
                          </div>
                      </form>
                      <!-- Form END -->
                  </div>
                  <!-- Modal footer -->
                  <div class="modal-footer">
                      <button type="button" class="btn btn-primary-soft">Create now</button>
                  </div>
              </div>
          </div>
      </div>
      <!--   上传照片   -->

  </div>
</template>

<script>
export default {
    name: "media"
}
</script>

<style scoped>
.btn-primary-soft {
    color: #198754;
    background-color: #1987541c;
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