<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header card-info">
            Send Custom SMS
            <div class="card-btn pull-right">
              <router-link tag="a" to="/sms" class="btn btn-primary btn-sm"> Manually Send SMS </router-link>
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
                    <th> Mobile Number </th>
                    <th width="5%"><input style="width: 20px;height: 20px;" type="checkbox" @click="allCheck" id="allCheck"> </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(employee,i) in employees" :key="i">
                    <td>{{i+1}}</td>
                    <td>{{employee.personal_id}}</td>
                    <td>{{employee.name_english}}</td>
                    <td>{{employee.official_mobile}}</td>
                    <td>
                     <label><input type="checkbox" :value="employee.official_mobile" class="checkElement" :id="'check-'+i" name="number[]"> </label>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="form-group row">
              <label for="text" class="col-md-12">Text:</label>
              <div class="col-md-12">
                <textarea rows="4" required v-model="form.text" class="form-control" placeholder="Text" id="text"></textarea>
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
import SmsService from '@/services/SmsService'
import FrontendService from '@/services/FrontendService'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'CustomSMSSend',
  data () {
    return {
      form:{
        text:'',
        number:[]
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
  methods: {
    async getData(){
     this.form = {
          text:'',
          number:[]
      }
      let reg = await FrontendService.regiment()
      this.regiment = reg.data
    },
    async getEmployee(){
      let employee = await SmsService.employee(this.regiment_id)
      this.employees = employee.data
    },
    async store () {
      let number = []
      $('.checkElement').each(function(){
        if ($(this).is(':checked')) {
          number.push($(this).val())
        }
      })
      this.form.number = number
      await SmsService.multiple(this.form)
        .then(res => {
          console.log(res.data)
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
        $('.checkElement').each(function(){
          $(this).prop('checked',true)
        })
      } else {
        $('.checkElement').each(function(){
          $(this).prop('checked',false)
        })
      }

    }

  }
}
</script>
<style></style>
