<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Send Bulk SMS
            <div class="card-btn pull-right">
               <router-link tag="a" to="/mail" class="btn btn-primary btn-sm"> Custom SMS send </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10">
                <form id="inputForm"  @submit.prevent="store" enctype="multipart/form-data">
                  <div class="form-group row">
                    <label for="input" class="col-md-12">Excel Sheet Upload:</label>
                    <div class="col-md-9">
                      <input type="file" id="input" class="form-control" />
                    </div>
                    <div class="col-md-3">
                      <a class="btn btn-success" :href="baseUrl+'number.xlsx'"><i class="fa fa-file-excel-o"></i> Download sample </a>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-md-12">Text:</label>
                    <div class="col-md-12">
                      <textarea rows="4" required v-model="form.text" class="form-control" placeholder="Text" id="text"></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-12">
                      <button type="submit" class="btn btn-primary"> <i class="fa fa-paper-plane-o"></i> Send</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SmsService from '@/services/SmsService'
  import readXlsxFile from 'read-excel-file'
  export default {
    name: 'SmsSendManually',
    data () {
      return {
        form:{
          text:'',
          number:''
        },
        baseUrl: this.$baseUrl,
      }
    },
    mounted(){
      this.getData()
    },

    methods: {
      async getData(){
        this.form = {
          text:'',
          number:''
        }
      },

      async store () {
        const input = document.getElementById('input')
        let myFile = []
        let rows = await readXlsxFile(input.files[0]);
        for(let i=1;i<rows.length;i++){
          myFile.push(rows[i][0])
        }
        this.form.number = myFile
        await SmsService.multiple(this.form)
          .then(res => {
            console.log(res.data)
            this.getData()
            this.$swal({
              type: 'success',
              title: 'Data Successfully Saved',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(err => {
            this.$swal({
              type: 'warning',
              title: err.response.data,
              showConfirmButton: true,
            })
          })
      }
    }
  }
</script>
<style></style>
