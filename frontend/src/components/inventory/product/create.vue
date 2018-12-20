<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Create New Product
            <div class="card-btn pull-right">
              <router-link tag="a" to="/product" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
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
              <label class="col-md-3 control-label">Product Code</label>
              <div class="col-md-8">
                <input type="text" v-model="form.code" class="form-control" placeholder="Code" value="" id="code">
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
              <label for="category_id" class="col-md-3 control-label">Category</label>
              <div class="col-md-8">
                <select v-model="form.category_id" class="form-control" id="category_id" required>
                  <option value="">-select category-</option>
                  <option v-for="cat in category" :value="cat._id" :key="cat._id">{{cat.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="unit_id" class="col-md-3 control-label">Units</label>
              <div class="col-md-8">
                <select v-model="form.unit_id" class="form-control" id="unit_id" required>
                  <option value="">-select unit-</option>
                  <option v-for="unit in units" :value="unit._id" :key="unit._id">{{unit.name}}</option>
                </select>
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
import ProductService from '@/services/inventory/ProductService'
export default {
  name: 'ProductCreate',
  data () {
    return {
      form: {
        code: '',
        name: '',
        company_id: '',
        category_id: '',
        unit_id: '',
        details: ''
      },
      company:[],
      category:[],
      units:[],
      auth: this.$auth,
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
      let comp =await ProductService.company()
      this.company = comp.data
      let cat =await ProductService.category()
      this.category = cat.data
      let unit =await ProductService.units()
      this.units = unit.data
    },
    async store () {
      await ProductService.store(this.form)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({path: '/product'})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style></style>
