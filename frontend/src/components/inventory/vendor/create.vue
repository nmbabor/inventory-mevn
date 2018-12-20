<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Create New Vendor
            <div class="card-btn pull-right">
              <router-link tag="a" to="/vendor" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form method="POST" @submit.prevent="store">
            <div class="form-group row  ">
              <label for="name" class="col-md-3 control-label">Name</label>
              <div class="col-md-8">
                <input type="text" v-model="form.name" class="form-control" required placeholder="Name" value="" id="name">
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label">Vendor ID</label>
              <div class="col-md-8">
                <input type="text" v-model="form.vendor_id" class="form-control" placeholder="Vendor ID" value="" id="vendor_id">
                <span class="text-danger" v-if="validateErrors.vendor_id">{{validateErrors.vendor_id}}</span>
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label" for="address">Address</label>
              <div class="col-md-8">
                <input type="text" v-model="form.address" class="form-control" placeholder="Address" value="" id="address">
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label" for="representative_name">Representative name</label>
              <div class="col-md-8">
                <input type="text" v-model="form.representative_name" class="form-control" placeholder="Representative name" value="" id="representative_name">
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label" for="mobile">Mobile</label>
              <div class="col-md-8">
                <input type="number" min="0" minlength="11" v-model="form.mobile" class="form-control" placeholder="Mobile" value="" id="mobile" required>
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label" for="additional_mobile">Additional Mobile</label>
              <div class="col-md-8">
                <input type="number" min="0" minlength="11" v-model="form.additional_mobile" class="form-control" placeholder="Mobile" value="" id="additional_mobile" required>
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label" for="nid">NID</label>
              <div class="col-md-8">
                <input type="number" min="0" v-model="form.nid" class="form-control" placeholder="NID" value="" id="nid" required>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 control-label" for="vat_no">Vat no</label>
              <div class="col-md-8">
                <input type="number" min="0" v-model="form.vat_no" class="form-control" placeholder="Vat no" value="" id="vat_no">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 control-label" for="trade_licence_no">Trade licence no</label>
              <div class="col-md-8">
                <input type="number" min="0" v-model="form.trade_licence_no" class="form-control" placeholder="Trade licence no" value="" id="trade_licence_no">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 control-label" for="e_tin">e-TIN</label>
              <div class="col-md-8">
                <input type="number" min="0" minlength="11" v-model="form.e_tin" class="form-control" placeholder="e-TIN" value="" id="e_tin">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 control-label" for="bank_name">Bank name</label>
              <div class="col-md-8">
                <input type="text" v-model="form.bank_name" class="form-control" placeholder="Bank name" value="" id="bank_name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 control-label" for="bank_account">Bank account</label>
              <div class="col-md-8">
                <input type="text" v-model="form.bank_account" class="form-control" placeholder="Bank account" value="" id="bank_account" required>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 control-label" for="bank_branch">Bank Branch</label>
              <div class="col-md-8">
                <input type="text" v-model="form.bank_branch" class="form-control" placeholder="Bank Branch" value="" id="bank_branch">
              </div>
            </div>
            <div class="form-group row  ">
              <label for="details" class="col-md-3 control-label"> Details </label>
              <div class="col-md-8">
                <textarea v-model="form.details" class="form-control" placeholder="Details" id="details"></textarea>
              </div>
            </div>
            <div class="form-group row" v-if="auth.role=='superadmin'">
              <label for="company_id" class="col-md-3 control-label">Company</label>
              <div class="col-md-8">
                <select v-model="form.company_id" class="form-control" id="company_id" required>
                  <option value="">-select company-</option>
                  <option v-for="com in company" :value="com._id" :key="com._id">{{com.company_name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="type" class="col-md-3 control-label">Type</label>
              <div class="col-md-8">
                <select v-model="form.type" class="form-control" id="type" required>
                  <option value="">-select-</option>
                  <option value="1">Company</option>
                  <option value="2">Person</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="type" class="col-md-3 control-label">Photography:</label>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-8 no-padding">
                    <label class="col-md-12">Organization Logo</label>
                    <div class="col-md-12">
                      <label class="upload_photo upload client_logo_upload">
                        <!--  -->
                        <img id="image_load" v-if="logoUrl" :src="logoUrl">
                        <i class="upload_hover ion ion-ios-camera-outline"></i>
                        <input type="file"  ref="logo" @change="selectLogo()" style="display:none" name="logo">
                      </label>
                    </div>
                  </div>
                  <div class="col-md-4 ">
                    <label class="col-md-12">Rep. Photo </label>
                    <div class="col-md-12">
                      <label class="upload_photo upload favicon_upload">
                        <!--  -->
                        <img id="image_load2" v-if="photoUrl" :src="photoUrl">
                        <i class="upload_hover ion ion-ios-camera-outline"></i>
                        <input type="file"  ref="photo" @change="selectPhoto()" style="display:none" name="photo">
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-3"></div>
              <div class="col-md-9">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VendorService from '@/services/inventory/VendorService'
export default {
  name: 'VendorCreate',
  data () {
    return {
      form: {
        type:1
      },
      company:[],
      auth: this.$auth,
      logoUrl:'',
      photoUrl:''

    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      if(this.auth.company_id && this.auth.company_id!==''){
        this.form.company_id = this.auth.company_id
      }
      let comp =await VendorService.company()
      this.company = comp.data
    },
    async store () {
      let formData = new FormData()
      /* Add the form data we need to submit */
      for (let key in this.form) {
        formData.append(key, this.form[key])
      }
      await VendorService.store(formData)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({path: '/vendor'})
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectLogo(){
      this.form.logo = this.$refs.logo.files[0]
      this.logoUrl = URL.createObjectURL(this.form.logo)
    },
    selectPhoto(){
      this.form.photo = this.$refs.photo.files[0]
      this.photoUrl = URL.createObjectURL(this.form.photo)
    }
  }
}
</script>
<style></style>
