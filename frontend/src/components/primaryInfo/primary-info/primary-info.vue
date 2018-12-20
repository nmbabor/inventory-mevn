<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card ">
          <div class="card-header card-info">
            Primary Information
            <div class="card-btn pull-right">
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="update" enctype="multipart/form-data">
              <div class="row">
                <div class="col-md-12 no-padding" style="display: none">
                  <div class="form-group col-md-12 no-padding">
                    <label class="col-md-4"> <input type="radio" v-model="form.type"  value="1" name="type"> Group of company </label>
                    <label class="col-md-4"> <input type="radio" v-model="form.type"  value="2"  name="type"> Single company </label>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="row">
                    <div class="form-group col-md-6 no-padding ">
                      <label for="company_name" class="col-md-12">Name of Organization</label>
                      <div class="col-md-12">
                        <input v-model="form.company_name" class="form-control" placeholder="Name of Organization" name="company_name" type="text" id="company_name">
                      </div>
                    </div>
                    <div class="form-group  col-md-6 no-padding ">
                      <label for="address" class="col-md-12">Organization Address</label>
                      <div class="col-md-12">
                        <input v-model="form.address" class="form-control" placeholder="Organization Address" name="address" type="text" id="address">
                      </div>
                    </div>
                    <div class="form-group col-md-6 no-padding  ">
                      <label for="mobile_no" class="col-md-12">Contact Number</label>
                      <div class="col-md-12">
                        <input v-model="form.mobile" class="form-control" placeholder="Contact Number"  type="text" id="mobile_no">
                      </div>
                    </div>
                    <div class="form-group col-md-6 no-padding  ">
                      <label for="email" class="col-md-12">Email</label>
                      <div class="col-md-12">
                        <input v-model="form.email" class="form-control" placeholder="Email" name="email" type="email" id="email">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 no-padding ">
                  <div class="row">
                    <div class="form-group  col-md-8 ">
                      <label class="col-md-12">Organization Logo</label>
                      <div class="col-md-12">
                        <label class="upload_photo upload client_logo_upload">
                          <!--  -->
                          <img id="image_load" v-if="logoUrl" :src="logoUrl">
                          <i class="upload_hover ion ion-ios-camera-outline"></i>
                          <input type="file"  ref="logo" @change="selectFile()" style="display:none" name="logo">
                        </label>
                      </div>
                    </div>
                    <div class="form-group col-md-4 ">
                      <label class="col-md-12"> Icon</label>
                      <div class="col-md-12">
                        <label class="upload_photo upload favicon_upload">
                          <!--  -->
                          <img id="image_load2" v-if="favUrl" :src="favUrl">
                          <i class="upload_hover ion ion-ios-camera-outline"></i>
                          <input type="file"  ref="favicon" @change="selectFavicon()" style="display:none" name="favicon">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <input name="id" type="hidden" value="1">
                <div class="form-group col-md-12 no-padding">
                  <div class="col-md-12">
                    <input type="hidden" v-model="form._id" class="form-control" value="">
                    <button type="submit"  class="btn btn-primary">Update</button>
                  </div>
                </div>
              </div>
            </form>
            <br>
            <!--<a class="btn btn-success" href="http://leamerp.com/company-branch"><i class="fa fa-plus-circle"></i> Branches </a>-->
            <!--<a class="btn btn-info" href="http://leamerp.com/storage-info"><i class="fa fa-plus-circle"></i> Depot </a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PrimaryInfoService from '@/services/PrimaryInfoService'
  export default {
    name: 'editPrimaryInfo',
    data () {
      return {
        form: [],
        logoUrl: '',
        favUrl: '',
        baseUrl: this.$baseUrl,
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const response = await PrimaryInfoService.edit()
        this.form = response.data
        this.logoUrl = this.baseUrl+response.data.logo
        this.favUrl = this.baseUrl+response.data.favicon
      },
      selectFile () {
        this.form.logo = this.$refs.logo.files[0]
        this.logoUrl = URL.createObjectURL(this.form.logo)
      },
      selectFavicon () {
        this.form.favicon = this.$refs.favicon.files[0]
        this.favUrl = URL.createObjectURL(this.form.favicon)
      },
      async update () {
        /* Initialize the form data */
        let formData = new FormData()
        /* Add the form data we need to submit */
        for (let key in this.form) {
          formData.append(key, this.form[key])
        }
        await PrimaryInfoService.update(formData)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err.response)
          })
        this.$swal({
          type: 'success',
          title: 'Data Successfully Updated',
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push({ path: 'primary-info' })
      }
    }
  }
</script>
<style></style>
