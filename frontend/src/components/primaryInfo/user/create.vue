<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            User Registration
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
                        <input type="text"  id="name" v-model="form.name"  name="name" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('name') }">
                        <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
                        <span v-for="(err, ind) in validateErrors['name']" class="help text-danger" :key="ind">{{ err }}</span>
                      </div>
                    </div>
                    <!-- end name -->
                    <!-- start email phone -->
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Your email</label>
                        <div class="j-input">
                          <label class="j-icon-right " for="email">
                            <i class="icofont icofont-envelope"></i>
                          </label>
                          <input type="text" id="email" v-model="form.email" name="email" v-validate="'required|email'" :class="{'input': true, 'text-danger': errors.has('email') }">
                          <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                          <span  class="help text-danger" v-if="emailExist != ''">{{ emailExist }}</span>
                          <span v-for="(err, ind) in validateErrors['email']" class="help text-danger" :key="ind">{{ err }}</span>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">Phone/Mobile</label>
                        <div class="j-input">
                          <label class="j-icon-right" for="phone">
                            <i class="icofont icofont-phone"></i>
                          </label>
                          <input type="text" min="0" id="phone" v-model="form.mobile" v-validate="'required|min:11|max:11'" data-vv-as="mobile" name="mobile" :class="{'input': true, 'text-danger': errors.has('mobile') }">
                          <span class="j-tooltip j-tooltip-right-top">Mobile Number</span>
                          <span v-show="errors.has('mobile')" class="help text-danger">{{ errors.first('mobile') }}</span>
                          <span v-for="(err, ind) in validateErrors['mobile']" class="help text-danger" :key="ind">{{ err }}</span>
                        </div>
                      </div>
                    </div>
                    <!-- start password  -->
                    <div class="j-row">
                      <div class="j-span6 j-unit">
                        <label class="j-label">Password</label>
                        <div class="j-input">
                          <label class="j-icon-right" for="password">
                            <i class="icofont icofont-ui-password"></i>
                          </label>
                          <input type="password" v-validate="'required|min:6|max:12'" name="password" id="password" v-model="form.password" ref="password" :class="{'input': true, 'text-danger': errors.has('password')}">
                          <span class="j-tooltip j-tooltip-right-top">Password</span>
                          <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
                        </div>
                      </div>
                      <div class="j-span6 j-unit">
                        <label class="j-label">Confirm Password</label>
                        <div class="j-input">
                          <label class="j-icon-right" for="cpassword">
                            <i class="icofont icofont-ui-password"></i>
                          </label>
                          <input type="password"  id="cpassword" v-model="form.password_confirmation" v-validate="'required|confirmed:password'" name="password_confirmation" data-vv-as="password" >
                          <span class="j-tooltip j-tooltip-right-top">Confirm Password</span>
                          <span v-show="errors.has('password_confirmation')" class="help help-block text-danger">{{ errors.first('password_confirmation') }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="j-unit">
                      <label class="j-label">Address</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="adults">
                          <i class="icofont icofont-location-pin"></i>
                        </label>
                        <input type="text" id="adults" v-model="form.address" name="address" v-validate="'required'">
                        <span class="j-tooltip j-tooltip-right-top">Your Address</span>
                        <span v-show="errors.has('address')" class="help help-block text-danger">{{ errors.first('address') }}</span>
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
                        <label class="j-label">Company</label>
                        <div class="j-input">
                          <select v-model="form.company_id" class="form-control">
                            <option value=""> -select- </option>
                            <option :value="com._id" v-for="(com,ind) in company" :key="ind">{{com.company_name}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="j-row">
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
                  </div>
                  <!-- end /.content -->
                  <div class="j-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
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
  name: 'Registration',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        mobile: '',
        address: '',
        role: '',
        company_id: '',
        branch_id: '',
      },
      emailExist: '',
      validateErrors: [],
      roles: {},
      company: {},
      branch: ['Army','Navy','Air','Civil']
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      let role = await UserService.roles()
      this.roles = role.data
      let company= await UserService.company()
      this.company = company.data
    },
    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
          if (resp){
            UserService.store(this.form).then(success=>{
              this.$swal({
                type: 'success',
                title: 'Registration Successfully Done',
                showConfirmButton: false,
                timer: 1500
              })
              this.$router.push({path: '/users'})
            }).catch(err=>{
              this.validateErrors=err.response.data
              console.log(this.validateErrors)
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
