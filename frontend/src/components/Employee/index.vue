<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/employees/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title"> All Employees </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Name</th>
                <th>Personal Number</th>
                <th>Gender</th>
                <th>Nid</th>
                <th>Rank</th>
                <th>Designation</th>
                <th>Status</th>
                <th colspan="2" width="10%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in employees" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.name_english+' ( '+data.name_bengali+' ) '}}</td>
                <td>{{data.personal_id}}</td>
                <td>{{data.gender}}</td>
                <td>{{data.nid}}</td>
                <td>{{data.rank}}</td>
                <td>{{data.designation}}</td>
                <td>
                  <span v-if="data.status==1" class="text-success" title="Complete Employee Registration"><i class="fa fa-check-circle-o fa-2x"></i></span>
                  <span v-else class="text-danger" title="Incomplete Employee Registration"><i class="fa fa-times-circle-o fa-2x"></i></span>
                </td>
                <td>
                <router-link tag="a" v-bind:to="{ name: 'employeeShow', params: { id: data._id } }" class="btn btn-xs btn-info"><i class="fa fa-book" title="View profile with details "></i></router-link>
                  <router-link tag="a" v-bind:to="{ name: 'employeeEdit', params: { id: data._id } }" class="btn btn-xs btn-success"><i class="fa fa-edit" title="Click here to edit profile"></i></router-link>
                 <button class="btn btn-xs btn-danger" @click="deleteEmployee(data._id, index)" title="Click here to delete this "> <i class="fa fa-trash"></i> </button> </td>
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
import EmployeeService from '@/services/EmployeeService'
export default {
  name: 'employee',
  data () {
    return {
      employees: []
    }
  },
  mounted () {
    this.getEmployee()
  },
  methods: {
    async getEmployee () {
      const response = await EmployeeService.index()
      this.employees = response.data
    },
    async deleteEmployee (id, i) {
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
          EmployeeService.destroy(id)
            .then(success => {
              $this.employees.splice(i, 1)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>
<style></style>
