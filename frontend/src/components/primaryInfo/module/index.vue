<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/module/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title">View All Modules </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Name</th>
                <th>URL</th>
                <th>Menu</th>
                <th width="5%">Type</th>
                <th width="3%">Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in modules" :key="index">
                <td>{{index+1}}</td>
                <td><i v-bind:class="data.icon_class"></i> {{data.name}}</td>
                <td>{{data.url}}</td>
                <td><router-link class="btn btn-xs btn-success" v-bind:to="{ name: 'menu', params: { module_id: data._id } }"> <i class="fa fa-list-ul"></i> Menu</router-link></td>
                <td><span v-if="data.type==1"> Module </span> <span v-else> Main Menu </span></td>
                <td><i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger"  v-else></i></td>
                <td> <router-link class="btn btn-xs btn-info" v-bind:to="{ name: 'editModule', params: { id: data._id } }"> <i class="fa fa-edit"></i></router-link> </td>
                <td> <button class="btn btn-xs btn-danger displayNone" @click="deleteData(data._id, index)"><i class="fa fa-trash"></i></button></td>
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
import ModuleService from '@/services/ModuleService'
export default {
  name: 'Modules',
  data () {
    return {
      modules: []
    }
  },
  mounted () {
    this.getModule()
  },
  methods: {
    async getModule () {
      const response = await ModuleService.index()
      this.modules = response.data.allData
    },
    async deleteData (id, index) {
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
          ModuleService.delete(id)
          $this.modules.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style></style>
