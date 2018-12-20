<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            User information Edit
            <div class="card-btn pull-right">
              <router-link tag="a" to="/users" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-block">
            <form @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
              <div class="j-wrapper j-wrapper-640">
                <div class="j-pro" id="j-pro">
                  <div class="j-content">
                    <!-- start name -->
                    <div class="j-unit">
                      <label class="j-label">Your name</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="name">
                          <i class="icofont icofont-ui-user"></i>
                        </label>
                        <input type="text" required id="name" v-model="form.name" name="name" v-validate="'required'" value="" :class="{'input': true, 'text-danger': errors.has('name') }">
                        <span class="j-tooltip j-tooltip-right-top">Your Full Name</span>
                        <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
                      </div>
                    </div>
                    <!-- end name -->
                    <!-- start email phone -->
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Your email</label>
                        <div class="j-input">
                          <label class="j-icon-right" for="email">
                            <i class="icofont icofont-envelope"></i>
                          </label>
                          <input type="email" required id="email" v-model="form.email" name="email" v-validate="'required|email'"  value="" :class="{'input': true, 'text-danger': errors.has('email') }">
                          <span class="j-tooltip j-tooltip-right-top">Email Address</span>
                          <span  class="help text-danger" v-if="emailExist != ''">{{ emailExist }}</span>
                          <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">Phone/Mobile</label>
                        <div class="j-input">
                          <label class="j-icon-right" for="phone">
                            <i class="icofont icofont-phone"></i>
                          </label>
                          <input type="text" id="phone" v-model="form.mobile" name="mobile" v-validate="'required|min:11|max:11'" :class="{'input': true, 'text-danger': errors.has('mobile') }">
                          <span class="j-tooltip j-tooltip-right-top">Mobile Number</span>
                          <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="j-unit">
                      <label class="j-label">Address</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="adults">
                          <i class="icofont icofont-location-pin"></i>
                        </label>
                        <input type="text" id="adults" v-model="form.address" name="address" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('address') }">
                        <span class="j-tooltip j-tooltip-right-top">Your Address</span>
                        <span v-show="errors.has('address')" class="help text-danger">{{ errors.first('address') }}</span>
                      </div>
                    </div>
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Role</label>
                        <div class="j-input">
                          <select v-model="form.role" class="form-control" required>
                            <option value=""> -select- </option>
                            <option :value="role.slug" v-for="(role,ind) in roles" :key="ind">{{role.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">Status</label>
                        <div class="j-input">
                          <select v-model="form.status" class="form-control" required>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Company</label>
                        <div class="j-input">
                          <select v-model="form.company_id" class="form-control">
                            <option value=""> -select- </option>
                            <option :value="com._id" v-for="(com,ind) in company" :key="ind">{{com.company_name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">Branch</label>
                        <div class="j-input">
                          <select v-model="form.branch_id" class="form-control">
                            <option value=""> -select- </option>
                            <option :value="cat" v-for="(cat,ind) in branch" :key="ind">{{cat}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="j-row">

                    </div>
                  </div>
                  <!-- end /.content -->
                  <div class="j-footer">
                    <button type="submit" class="btn btn-primary">Save change</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'editUser',
  data () {
    return {
      form: {},
      emailExist: '',
      roles: {},
      company: {},
      branch: ['Army','Navy','Air','Civil']
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await UserService.show({
        id: this.$route.params.id
      })
      this.form = response.data
      let role = await UserService.roles()
      this.roles = role.data
      let company= await UserService.company()
      this.company = company.data
    },
    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then(resp=>{
          if (resp){
            UserService.update({id: this.$route.params.id, input: this.form})
              .then(success=>{
                this.$swal({
                  type: 'success',
                  title: 'Data Successfully Updated',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.$router.push({ name: 'users' })
              })
              .catch(err=>{
                this.emailExist=err.response.data.emailExist
              })
          }
        })
        .catch(function(e) {
          console.log('catch')
        })
    }
  }
}
</script>
<style></style>
