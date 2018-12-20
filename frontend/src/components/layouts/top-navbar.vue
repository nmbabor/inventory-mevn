<template>
  <div class="navbar-wrapper">
    <div class="navbar-logo">
      <a class="mobile-menu waves-effect waves-light" id="mobile-collapse" href="#!" style="padding-left:15px;">
        <i class="feather icon-toggle-right text-custom"></i>
      </a>
      <router-link to="/">
        <img v-if="info.logo!==''" class="img-fluid" :src="info.logo" :alt="info.company_name"/>
      </router-link>
      <a class="mobile-options waves-effect waves-light">
        <i class="feather icon-more-horizontal text-custom"></i>
      </a>
    </div>
    <div class="navbar-container container-fluid">
      <ul class="nav-left">
        <li class="header-search">
          <div class="main-search morphsearch-search">
            <div class="input-group">
              <span class="input-group-prepend search-close">
                <i class="feather icon-x input-group-text text-custom"></i>
              </span>
              <input type="text" class="form-control" placeholder="Enter Keyword">
              <span class="input-group-append search-btn">
                <i class="feather icon-search input-group-text" style="color:black"></i>
              </span>
            </div>
          </div>
        </li>
        <li>
          <a href="#!" onclick="javascript:toggleFullScreen()" class="waves-effect waves-light">
            <i class="full-screen feather icon-maximize text-custom"></i>
          </a>
        </li>
      </ul>
      <ul class="nav-right">
        <li class="user-profile header-notification">
          <div class="dropdown-primary dropdown">
            <div class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-user-circle" style="font-size: 18px;"></i>
              <span class="text-custom">{{auth.name}}</span>
              <i class="feather icon-chevron-down text-custom"></i>
            </div>
            <ul class="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
              <li>
                <a href="" @click="logout()">
                  <i class="feather icon-log-out"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FrontendService from '@/services/FrontendService'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: "top-navbar",
  data () {
    return{
      auth: '',
      info: {
        logo: '',
        company_name: ''
      },
      baseUrl: this.$baseUrl,
    }
  },
  mounted() {
    let token = localStorage.getItem("token");
    if(!token){
      this.$router.push({name: "login"})
    }
    this.auth = VueJwtDecode.decode(token)
    this.getData();
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({name: "login"})
    },
    async getData(){
      let information = await FrontendService.info()
      if(information.data!=null){
        this.info = information.data
        this.info.logo = this.$baseUrl+this.info.logo
      }

    }
  }
}
</script>

<style>
</style>
