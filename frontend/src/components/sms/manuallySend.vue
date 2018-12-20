<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Send SMS
            <div class="card-btn pull-right">
               <router-link tag="a" to="/custom-sms" class="btn btn-primary btn-sm"> Custom SMS send </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10">
                <form id="inputForm"  @submit.prevent="store">
                  <div class="form-group row">
                    <label for="number" class="col-md-12">Mobile Number:</label>
                    <div class="col-md-12">
                      <input type="text" v-model="form.number" class="form-control" placeholder="Mobile Number" id="number">
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
  export default {
    name: 'SmsSendManually',
    data () {
      return {
        form:{
          text:'',
          number:''
        },
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
        await SmsService.send(this.form)
          .then(res => {
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
