<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Send Mail
            <div class="card-btn pull-right">
              <router-link tag="a" to="/manually-mail" class="btn btn-primary btn-sm"> Manually Send Mail </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10">
            <form id="inputForm"  @submit.prevent="store">
              <div class="form-group row" v-if="auth.role=='superadmin'">
                <label class="col-md-2"></label>
                <div class="col-md-8">
                  <select id="regiment_id" @change="getEmployee" required class="form-control" v-model="regiment_id">
                    <option value="" > -select division- </option>
                    <option v-for="(reg, indx) in regiment" :key="indx" :value="reg._id"> {{reg.name}} </option>
                  </select>
                </div>
              </div>
            <div class="form-group row">
              <div class="col-md-12">
                <table class="table table-bordered min-padding-table" id="autoIncrement">
                  <thead>
                  <tr>
                    <th width="5%">SL</th>
                    <th> Personal ID </th>
                    <th> Employee Name </th>
                    <th> Employee Email </th>
                    <th width="5%"><input style="width: 20px;height: 20px;" type="checkbox" @click="allCheck" id="allCheck"> </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(employee,i) in employees" :key="i">
                    <td>{{i+1}}</td>
                    <td>{{employee.personal_id}}</td>
                    <td>{{employee.name_english}}</td>
                    <td>{{employee.email}}</td>
                    <td>
                     <label><input type="checkbox" :value="employee.email" class="checkEmail" :id="'check-'+i" name="email[]"> </label>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="form-group row">
              <label for="subject" class="col-md-12">Subject:</label>
              <div class="col-md-12">
                <input type="text" v-model="form.subject" class="form-control" required placeholder="Subject" id="subject">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-12">Message:</label>
              <div class="col-md-12">
                <editor id="message" theme='modern' plugins='code link lists' toolbar='formatselect | bold italic strikethrough | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat' v-model="form.message"  placeholder="Description" class="form-control text-editor" ></editor>
              </div>
            </div>
            <div class="form-group row" v-if="employees.length>0">
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
import FrontendService from '@/services/FrontendService'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'EmailSend',
  data () {
    return {
      form:{
        message:'',
        subject:'',
        email:[]
      },
      regiment_id:'',
      employees:'',
      regiment:'',
      auth: '',
    }
  },
  mounted(){
    this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
    if(this.auth.regiment_id && this.auth.regiment_id!==''){
      this.regiment_id = this.auth.regiment_id
    }
    this.getData()
    this.getEmployee()
  },
  components: {
    'editor': Editor // <- Important part
  },
  methods: {
    async getData(){
     this.form = {
        message:'',
          subject:'',
          email:[]
      }
      let reg = await FrontendService.regiment()
      this.regiment = reg.data
    },
    async getEmployee(){
      let employee = await MailService.employee(this.regiment_id)
      this.employees = employee.data
    },
    async store () {
      let email = []
      $('.checkEmail').each(function(){
        if ($(this).is(':checked')) {
          email.push($(this).val())
        }
      })
      this.form.email = email
      await MailService.send(this.form)
        .then(res => {
          this.getData()
          this.getEmployee()
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
    },
    allCheck(){
      if ($('#allCheck').is(':checked')) {
        $('.checkEmail').each(function(){
          $(this).prop('checked',true)
        })
      } else {
        $('.checkEmail').each(function(){
          $(this).prop('checked',false)
        })
      }

    }

  }
}
</script>
<style></style>
