<script>
import UserService from '@/services/UserService'
import FrontendService from '@/services/FrontendService'
export default {
  name: 'Login',
  data () {
    return {
      email: 'admin@leamtech.com',
      password: '123456',
      info: '',
    }
  },
  mounted () {
    this.getData()
    if (localStorage.getItem('token') != null) {
      this.$router.go(-1)
    }
  },
  methods: {
    async getData(){
      let information = await FrontendService.info()
      this.info = information.data
      this.info.logo = this.$baseUrl+this.info.logo
    },
    async login () {
      await UserService.login({
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$router.go({path: '/'})
      }).catch(error => {
        this.$iziToast.error({
          title: 'Error',
          message: error.response.data.message
        })
      })
    }
  }
}
</script>
<style>
@import "../../static/files/plugins/bootstrap/css/bootstrap.min.css";
@import "../../static/files/assets/pages/waves/css/waves.min.css";
@import "../../static/files/assets/css/style.css";
@import "../../static/files/assets/css/pages.css";
@import "../../static/files/assets/css/widget.css";
@import "../../static/files/assets/icon/feather/css/feather.css";
@import "../../static/files/plugins/iziToast/iziToast.min.css";
</style>
<template>
  <div>
    <section class="login-block">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="md-float-material form-material">
              <div class="auth-box card">
                <div class="card-block" style="background: #dde7ff">
                  <div class="row m-b-20">
                    <div class="col-sm-6 text-left">
                      <img class="img-responsive" :src="info.logo" :alt="info.company_name" style="height:32px"/>
                    </div>
                    <div class="col-sm-6" ><h4 class="text-right">Login</h4></div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-md-12">
                      <p class="text-center"> Log in to your account </p>
                    </div>
                  </div>
                  <div class="form-group form-primary">
                    <input type="email" v-model="email" placeholder="Your Email Address" class="form-control" required>
                    <span class="form-bar"></span>
                  </div>
                  <div class="form-group form-primary">
                    <input type="password" placeholder="Password" v-model="password" class="form-control" required="">
                    <span class="form-bar"></span>
                  </div>
                  <div class="row m-t-25 text-left">
                    <div class="col-12">
                      <div class="checkbox-fade fade-in-primary d-">
                        <label>
                          <input type="checkbox" value="">
                          <span class="cr"><i class="cr-icon icofont icofont-ui-check txt-primary"></i></span>
                          <span class="text-inverse">Remember me</span>
                        </label>
                      </div>
                      <div class="forgot-phone text-right float-right">
                        <a href="" class="text-right f-w-600"> Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                  <div class="row m-t-30">
                    <div class="col-md-12">
                      <button type="button" @click="login" class="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20">Sign in</button>
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-md-12">
                      <p class="text-inverse text-center m-b-0">Thank you.</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end of col-sm-12 -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container-fluid -->
    </section>
  </div>
</template>
