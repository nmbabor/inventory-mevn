<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            <i class="fa fa-edit"></i> Edit Company Info
            <div class="card-btn pull-right">
              <router-link tag="a" to="/company" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group row  ">
              <label for="company_name" class="col-md-3 control-label">Name of Organization</label>
              <div class="col-md-8">
                <input type="text" v-model="form.company_name" class="form-control" placeholder="Name of Organization" value="" id="company_name">
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label">Company Address</label>
              <div class="col-md-8">
                <input type="text" v-model="form.address" class="form-control" placeholder="Contact Number" value="" id="mobile_no">
              </div>
            </div>
            <div class="form-group row  ">
              <label for="mobile_no" class="col-md-3 control-label">Contact Number</label>
              <div class="col-md-8">
                <input type="text" v-model="form.mobile_no" class="form-control" placeholder="Contact Number" value="" id="mobile_no">
              </div>
            </div>
            <div class="form-group row  ">
              <label for="email" class="col-md-3 control-label">Email</label>
              <div class="col-md-8">
                <input type="email" v-model="form.email" class="form-control" placeholder="Email" value="" id="email">
              </div>
            </div>
            <div class="form-group row  ">
              <label for="shipping_address" class="col-md-3 control-label">Shipping Address</label>
              <div class="col-md-8">
                <textarea v-model="form.shipping_address" class="form-control" placeholder="Shipping Address" id="shipping_address"></textarea>
                <input type="hidden" v-model="form.id" class="form-control" value="">
              </div>
            </div>
            <div class="form-group row  ">
              <label for="shipping_address" class="col-md-3 control-label">Status</label>
              <div class="col-md-8">
                <select class="form-control" v-model="form.status" required>
                  <option value="1" > Active </option>
                  <option value="0"> Inactive </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-3"></div>
              <div class="col-md-9">
                <button type="submit" @click="update" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CompanyService from '@/services/CompanyService'
export default {
  name: 'Company',
  data () {
    return {
      form: {
        address: '',
        company_name: '',
        email: '',
        mobile_no: '',
        shipping_address: '',
        status: '',
        id: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await CompanyService.edit({
        id: this.$route.params.id
      })
      this.form = response.data
      this.form.id = this.$route.params.id
    },

    async update () {
      await CompanyService.update(this.form)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Update',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style></style>
