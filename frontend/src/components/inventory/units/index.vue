<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">

            </div>
            <h4 class="card-title"> Inventory Units </h4>
          </div>
          <div class="card-body table-responsive">
            <form @submit.prevent="store" method="POST">
              <div class="row">
                <div class="col-md-10">
                  <div class="row">
                    <label class="col-md-3 control-label"> Name : </label>
                    <div class="col-md-7">
                      <input type="text" class="form-control" required v-model="form.name" placeholder="Name">
                    </div>
                    <div class="col-md-2">
                      <button class="btn btn-sm btn-success"> <i class="fa fa-save"></i> Save </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <br>
            <table id="datatable" class="table table-striped table-bordered">
              <thead>
              <tr>
                <th width="5%">SL</th>
                <th>Name</th>
                <th width="5%">Status</th>
                <th colspan="2" width="5%">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in allData" :key="index">
                <td>{{index+1}}</td>
                <td> {{data.name}}</td>
                <td><i v-if="data.status==1" class="fa fa-check-circle text-success"></i>
                  <i class="fa fa-times-circle-o text-danger"  v-else></i></td>
                <td><!-- Button trigger modal -->
                  <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" :data-target="['#myModal'+data._id]">
                    <i class="fa fa-edit"></i>
                  </button>
                  <!-- Modal -->
                  <div class="modal fade" :id="['myModal'+data._id]" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title" id="myModalLabel">Edit Units</h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <label class="col-md-12"> Name : </label>
                            <div class="col-md-12">
                              <input type="text" class="form-control" required v-model="data.name" placeholder="Branch Name">
                            </div>
                          </div>
                          <div class="row">
                            <label class="col-md-12"> Status: </label>
                            <div class="col-md-12">
                              <select class="form-control" v-model="data.status">
                                <option value="1"> Active </option>
                                <option value="0"> Inactive </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateData(data,index)" >Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td> <a href="#" class="btn btn-xs btn-danger displayNone" @click="deleteData(data._id)"> <i class="fa fa-trash"></i> </a></td>
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
import UnitService from '@/services/inventory/UnitService'
export default {
  name: 'Units',
  data () {
    return {
      form: {
        name: '',
      },
      allData: [],
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await UnitService.index()
      this.allData = response.data
    },
  async store () {
    await UnitService.store(this.form).then(res=>{
      this.form.name=''
      this.getData()
      this.$swal({
        type: 'success',
        title: 'Data Successfully Added',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch(err=>{
      console.log(err.response.data)
    })

    },
    async updateData (form, i) {
      await UnitService.update(form)
      this.getData()
      this.$swal({
        type: 'success',
        title: 'Data Successfully Updated',
        showConfirmButton: false,
        timer: 1500
      })
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
          UnitService.delete(id)
          this.getData()
        }
      })
    }
  }
}
</script>
<style></style>
