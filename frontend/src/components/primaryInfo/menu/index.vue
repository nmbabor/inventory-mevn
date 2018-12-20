<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/module" class="btn btn-success btn-sm"><i class="fa fa-list"></i> Module </router-link>
              <router-link tag="a" v-bind:to="{ name: 'menuCreate', params: { id: module._id } }" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title">View All Menu in {{module.name}} </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Name</th>
                <th>URL</th>
                <th>Sub Menu</th>
                <th width="3%">Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td><i v-bind:class="data.icon_class"></i> {{data.name}}</td>
                <td>{{data.url}}</td>
                <td><router-link class="btn btn-xs btn-success" v-bind:to="{ name: 'subMenu', params: { menu_id: data._id } }"> <i class="fa fa-list-ul"></i>Sub Menu</router-link></td>
                <td><i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger"  v-else></i></td>
                <td> <router-link class="btn btn-xs btn-info" v-bind:to="{ name: 'menuEdit', params: { id: data._id } }"> <i class="fa fa-edit"></i></router-link> </td>
                <td> <a href="#" class="btn btn-xs btn-danger displayNone" @click="deleteData(data._id, index)"> <i class="fa fa-trash"></i> </a></td>
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
import MenuService from '@/services/MenuService'
export default {
  name: 'AllMenu',
  data () {
    return {
      allData: [],
      module: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await MenuService.index(this.$route.params.module_id)
      this.allData = response.data.allData
      this.module = response.data.module
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
          MenuService.delete(id)
          $this.allData.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style></style>
