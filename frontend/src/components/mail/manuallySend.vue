<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Send Mail
            <div class="card-btn pull-right">
               <router-link tag="a" to="/mail" class="btn btn-primary btn-sm"> Custom Mail send </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10">
                <form id="inputForm"  @submit.prevent="store">
                  <div class="form-group row">
                    <label for="subject" class="col-md-12">Email:</label>
                    <div class="col-md-12">
                      <input type="text" v-model="form.email" class="form-control" placeholder="@ email" id="email">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="subject" class="col-md-12">Subject:</label>
                    <div class="col-md-12">
                      <input type="text" required v-model="form.subject" class="form-control" placeholder="Subject" id="subject">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-12">Message:</label>
                    <div class="col-md-12">
                      <editor id="message" theme='modern' plugins='code link lists' toolbar='formatselect | bold italic strikethrough | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat' v-model="form.message"  placeholder="Description" class="form-control text-editor" ></editor>
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
  import Editor from '@tinymce/tinymce-vue';
  import MailService from '@/services/MailService'
  import VueJwtDecode from 'vue-jwt-decode'
  export default {
    name: 'EmailSendManually',
    data () {
      return {
        form:{
          message:'',
          subject:'',
          email:''
        },
        auth: '',
      }
    },
    mounted(){
      this.getData()
    },
    components: {
      'editor': Editor // <- Important part
    },
    methods: {
      async getData(){
        this.form = {
          message:'',
          subject:'',
          email:''
        }
      },

      async store () {
        await MailService.single(this.form)
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
