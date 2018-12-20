<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card ">
          <div class="card-header card-info">
            Primary Information
            <div class="card-btn pull-right">
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="importData" enctype="multipart/form-data">
              <div class="row">
                <div class="col-md-4 no-padding ">
                  <div class="row">
                    <div class="form-group  col-md-8 no-padding ">
                      <label class="col-md-12">Employee CSV File</label>
                      <div class="col-md-12">
                        <label class="">
                          <!--  -->
                          <img id="csvfil_load">
                          <i class=""></i>
                          <input type="file"  ref="csv_file" @change="selectFile()" name="csv_file" accept="*.csv">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <input name="id" type="hidden" value="1">
                <div class="form-group col-md-12 no-padding">
                  <div class="col-md-12">
                    <button type="submit"  class="btn btn-primary">Update</button>
                  </div>
                </div>
              </div>
            </form>
            <br>
            <!--<a class="btn btn-success" href="http://leamerp.com/company-branch"><i class="fa fa-plus-circle"></i> Branches </a>-->
            <!--<a class="btn btn-info" href="http://leamerp.com/storage-info"><i class="fa fa-plus-circle"></i> Depot </a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EmployeeService from '@/services/EmployeeService'
export default {
  name: 'editPrimaryInfo',
  data () {
    return {
      csv_file: ''
    }
  },
  mounted () {

  },
  methods: {
    selectFile () {
      this.csv_file = this.$refs.csv_file.files[0]
    },
    async importData () {
      let formData = new FormData()
      formData.append('csv_file', this.csv_file)
      await EmployeeService.importEmployee(formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style></style>
