<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/users/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>
            </div>
            <h4 class="card-title">View All User </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th width="3%">Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in users" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.name}}</td>
                <td>{{data.email}}</td>
                <td>{{data.role}}</td>
                <td><i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger"  v-else></i></td>
                <td> <router-link class="btn btn-xs btn-info" v-bind:to="{ name: 'editUser', params: { id: data._id } }"> <i class="fa fa-edit"></i></router-link> </td>
                <td> <button class="btn btn-xs btn-danger displayNone" @click="deleteData(data._id)"><i class="fa fa-trash"></i></button></td>
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
import UserService from '@/services/UserService'
export default {
  name: 'Users',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getusers()
  },
  methods: {
    async getusers () {
      const response = await UserService.allUser()
      this.users = response.data
    },
    async deleteData (id) {
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
          UserService.delete(id)
          $this.$router.go({
            path: '/users'
          })
        }
      })
    }
  }
}
</script>
<style></style>
