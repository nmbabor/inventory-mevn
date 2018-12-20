<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/company/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title">View All Company </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Company Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in company" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.company_name}}</td>
                <td>{{data.mobile_no}}</td>
                <td>{{data.email}}</td>
                <td> <router-link tag="a" v-bind:to="{ name: 'companyBranch', params: { company_id: data._id } }" class="btn btn-xs btn-info"><i class="fa fa-arrows"></i> Branch</router-link> </td>
                <td>
                  <i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger" v-else=""></i>
                </td>
                <td>
                  <router-link tag="a" v-bind:to="{ name: 'editCompany', params: { id: data._id } }" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></router-link>
                </td>
                <td> <button class="btn btn-xs btn-danger" @click="deleteCompany(data._id)"> <i class="fa fa-trash"></i> </button> </td>
              </tr>
              </tbody>
            </table>
            <div class="pull-right">
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
  name: 'company',
  data () {
    return {
      company: []
    }
  },
  mounted () {
    this.getCompany()
  },
  methods: {
    async getCompany () {
      const response = await CompanyService.allCompany()
      this.company = response.data
    },
    async deleteCompany (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          CompanyService.destroy(id)
          $this.$router.go({
            path: '/company'
          })
        }
      })
    }
  }
}
</script>
<style></style>
