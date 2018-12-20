<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/depot/create" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>

            </div>
            <h4 class="card-title">View All Depot </h4>
          </div>
          <div class="card-body table-responsive">
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Depot Name</th>
                <th> Type </th>
                <th>Company name</th>
                <th>Area</th>
                <th>Branch</th>
                <th>Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.name}}</td>
                <td>
                  <span v-if="data.type==1" class="text-success"> Central Depot </span>
                  <span v-else-if="data.type==2" class="text-info"> Area Depot </span>
                  <span class="text-primary" v-else=""> Branch Depot </span>
                </td>
                <td>{{data.company_name}}</td>
                <td>{{data.area.name}}</td>
                <td>{{data.branch.name}}</td>
                <td>
                  <i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger" v-else=""></i>
                </td>
                <td>
                  <router-link tag="a" v-bind:to="{ name: 'editDepot', params: { id: data._id } }" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></router-link>
                </td>
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
import DepotService from '@/services/inventory/DepotService'
export default {
  name: 'Depot',
  data () {
    return {
      allData: []
    }
  },
  mounted () {
    this.getCompany()
  },
  methods: {
    async getCompany () {
      const response = await DepotService.index()
      this.allData = response.data
    }
  }
}
</script>
<style></style>
