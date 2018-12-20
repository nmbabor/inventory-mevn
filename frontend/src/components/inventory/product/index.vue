<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/product/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title">View All Product </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Product Name</th>
                <th>Product Code</th>
                <th>Category name</th>
                <th>Company Name</th>
                <th>Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.name}}</td>
                <td>{{data.code}}</td>
                <td>{{data.category_name}}</td>
                <td>{{data.company_name}}</td>
                <td>
                  <i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger" v-else=""></i>
                </td>
                <td>
                  <router-link tag="a" v-bind:to="{ name: 'editProduct', params: { id: data._id } }" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></router-link>
                </td>
                <td> <button class="btn btn-xs btn-danger" @click="deleteData(data._id)"> <i class="fa fa-trash"></i> </button> </td>
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
import ProductService from '@/services/inventory/ProductService'
export default {
  name: 'AllProduct',
  data () {
    return {
      allData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData() {
      const response = await ProductService.index()
      this.allData = response.data
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
          ProductService.delete(id).then(res=>{
            $this.getData()
          }).catch(err=>{
            console.log(err.response.data)
          })
        }
      })
    }
  }
}
</script>
<style></style>
