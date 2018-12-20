<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/employee/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title">View All Employee </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Copmany</th>
                <th>Branch</th>
                <th>Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.employee_id}}</td>
                <td>{{data.name}}</td>
                <td>{{data.email}}</td>
                <td>{{data.mobile}}</td>
                <td>{{data.company_name}}</td>
                <td>{{data.branch_name}}</td>
                <td>
                  <i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger" v-else=""></i>
                </td>
                <td>
                  <router-link tag="a" v-bind:to="{ name: 'EmployeeEdit', params: { id: data._id } }" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EmployeeService from '@/services/hr/EmployeeService'
  export default {
    name: 'Employee',
    data () {
      return {
        allData: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const response = await EmployeeService.index()
        this.allData = response.data
      }
    }
  }
</script>
<style></style>
