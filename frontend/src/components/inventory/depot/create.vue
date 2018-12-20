<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Create New Depot
            <div class="card-btn pull-right">
              <router-link tag="a" to="/depot" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-body">
            <form method="POST" @submit.prevent="store">
            <div class="form-group row  ">
              <label for="company_name" class="col-md-3 control-label">Name of Depot</label>
              <div class="col-md-8">
                <input type="text" v-model="form.name" class="form-control" required placeholder="Name of Depot" value="" id="company_name">
              </div>
            </div>
            <div class="form-group row  ">
              <label class="col-md-3 control-label">Details</label>
              <div class="col-md-8">
                <input type="text" v-model="form.details" class="form-control" placeholder="Details" value="" id="details">
              </div>
            </div>
            <div class="form-group row" v-if="auth.role=='superadmin'">
              <label for="type" class="col-md-3 control-label">Company</label>
              <div class="col-md-8">
                <select v-model="form.company_id" @change="branch" class="form-control" id="company_id" required>
                  <option value="">-select company-</option>
                  <option v-for="com in company" :value="com._id" :key="com._id">{{com.company_name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group row  ">
              <label for="type" class="col-md-3 control-label">Type</label>
              <div class="col-md-8">
                <select v-model="form.type" class="form-control" id="type" required>
                  <option value="">-select type-</option>
                  <option value="1">Central Depot</option>
                  <option value="2">Area Depot</option>
                  <option value="3">Branch Depot</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.type==2">
              <label for="area_id" class="col-md-3 control-label">Area</label>
              <div class="col-md-8">
                <select v-model="form.area_id" required class="form-control" id="area_id">
                  <option value="">-select area-</option>
                  <option v-for="dist in area" :value="dist._id" :key="dist._id">{{dist.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.type==3">
              <label for="branch_id" class="col-md-3 control-label">Branch</label>
              <div class="col-md-8">
                <select v-model="form.branch_id" class="form-control" required id="branch_id">
                  <option value="">-select branch-</option>
                  <option v-for="branch in branches" :value="branch._id" :key="branch._id">{{branch.name}}</option>
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
import DepotService from '@/services/inventory/DepotService'
export default {
  name: 'DepotCreate',
  data () {
    return {
      form: {
        details: '',
        name: '',
        company_id: '',
        type: '',
        branch_id: '',
        area_id: ''
      },
      auth: this.$auth,
      company:[],
      branches:'',
      area:''
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      if(this.auth.company_id && this.auth.company_id!==''){
        this.form.company_id = this.auth.company_id
        this.branch()
      }
      let comp =await DepotService.company()
      this.company = comp.data
      let area =await DepotService.area()
      this.area = area.data
    },
    async store () {
      if(this.form.type==="2"){
        this.form.branch_id=null
      }
      if(this.form.type==="3"){
        this.form.area_id=null
      }
      if(this.form.type==="1"){
        this.form.branch_id=null
        this.form.area_id=null
      }
      await DepotService.store(this.form)
        .then(res => {
          this.$swal({
            type: 'success',
            title: 'Data Successfully Saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({path: '/depot'})
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    async branch(){
      let branches = await DepotService.branch(this.form.company_id)
      this.branches = branches.data
    }
  }
}
</script>
<style></style>
