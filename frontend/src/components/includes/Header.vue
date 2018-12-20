<template>
  <span class="dashboard">
      <div id="pcoded" class="pcoded">
      <div class="pcoded-container navbar-wrapper">
        <nav class="navbar header-navbar pcoded-header" style="background-color:#c3ddfa;position:fixed;">
          <top-navbar></top-navbar>
        </nav>
        <div class="pcoded-main-container">
          <div class="pcoded-wrapper">
            <nav class="pcoded-navbar">
              <div class="pcoded-inner-navbar main-menu bg-custom">
                  <ul class="pcoded-item pcoded-left-item">
                    <li class="" v-bind:class="{'pcoded-trigger': activeParent == 'Dashboard'}">
                      <router-link to="/" class="waves-effect waves-dark" v-on:click.native="routename">
                          <span class="pcoded-micon"><i class="feather icon-home"></i></span>
                          <span class="pcoded-mtext">
                            Dashboard
                          </span>
                      </router-link>
                    </li>
                    <li v-for="(mod, index) in allModules" :key="index" v-if="mod.menus.length == 0" v-bind:class="{'pcoded-trigger': activeParent == mod.module.name}" >
                      <router-link :to="'/' + mod.module.url" class="waves-effect waves-dark" v-on:click.native="routename">
                          <span class="pcoded-micon"><i v-if="mod.module.icon_class!=''" :class="mod.module.icon_class"></i> <i class="fa fa-folder" v-else ></i></span>
                          <span class="pcoded-mtext">
                             {{mod.module.name}}
                          </span>
                      </router-link>
                    </li>
                    <!--Information-->
                      <li v-for="(mod, index) in allModules" :class="[mod.menus.length > 0 ? 'pcoded-hasmenu' : '', {'pcoded-trigger': activeParent == mod.module.name}]"  :key="index" v-if="mod.menus.length > 0">
                        <a href="javascript:void(0)" class="waves-effect waves-dark">
                          <span class="pcoded-micon"><i v-if="mod.module.icon_class!=''" :class="mod.module.icon_class"></i> <i class="fa fa-folder" v-else ></i></span>
                          <span class="pcoded-mtext"> {{mod.module.name}} </span>
                        </a>
                            <ul  v-if="mod.menus.length > 0" class="pcoded-submenu" :style="[ activeParent == mod.module.name ? displayBlock : displayNone ]">
                                <li v-for="(myMenu, ind) in mod.menus" :key="ind" class="pcoded-hasmenu" v-bind:class="{'active': activeSubParent == myMenu.menu.name}" :id="myMenu.menu.url + ind + index" v-if="myMenu.subMenu.length > 0">
                                    <a href="javascript:void(0)" class="waves-effect waves-dark">
                                      <span class="pcoded-mtext">{{myMenu.menu.name}}</span>
                                    </a>
                                    <ul v-if="myMenu.subMenu.length > 0" class="pcoded-submenu" :style="[ activeSubParent == myMenu.menu.name ? displayBlock : displayNone ]">
                                        <li v-for="(subMenu, indx) in myMenu.subMenu" v-bind:class="{'active': activeRoute == subMenu.url}" :key="indx">
                                          <router-link :to="'/' + subMenu.url" class="waves-effect waves-dark" v-on:click.native="routename">
                                            <span class="pcoded-mtext"> {{subMenu.name}}</span>
                                          </router-link>
                                        </li>
                                    </ul>
                                </li>
                              <li v-for="(myMenu, ind) in mod.menus" :key="ind" v-if="myMenu.subMenu.length == 0">
                                <router-link :to="'/' + myMenu.menu.url" class="" v-on:click.native="routename">
                                  <span class="pcoded-mtext" v-bind:class="{'textActive': activeRoute == myMenu.menu.url}">
                                    {{myMenu.menu.name}}
                                  </span>
                                </router-link>
                                </li>
                            </ul>
                      </li>
                  </ul>
              </div>
            </nav>
            <div class="pcoded-content">
              <div class="page-header" v-bind:class="{'m-t-50': screenheight > 480}" style="text-align:center;">
                <div class="page-block">
                    <div class="row align-items-center">
                        <div class="col-md-12">
                            <div class="page-header-title" style="margin-top:-20px;margin-bottom:-10px;display: none">
                                <h4 class="m-b-10"><img src="/static/files/assets/images/institute-logo.png" height="55"/></h4>
                            </div>
                            <div class="row">
                              <div class="col-md-9">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item">
                                    <a href="#">
                                      <i class="feather icon-home"></i>
                                    </a>
                                    </li>
                                    <li class="breadcrumb-item">
                                      <a href="#!">{{activeParent}}</a>
                                    </li>
                                    <li v-if="breadcrumb !== 'null'" class="breadcrumb-item">
                                      <a href="#!">{{breadcrumb}}</a>
                                    </li>
                                    <li v-if="breadcrumb2 !== 'null'" class="breadcrumb-item">
                                      <a href="#!">{{breadcrumb2}}</a>
                                    </li>
                                </ul>
                              </div>
                              <div class="col-md-3" style="display: none">
                                <div class="dropdown" style="padding-top:5px;">
                                 <i class="fa fa-bars"></i> Modules
                                  <div class="dropdown-content">
                                    <a href="#">Online Admission</a>
                                    <a href="#">Class Management</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="pcoded-inner-content">
                <div class="main-body">
                  <div class="page-wrapper">
                    <div class="page-body">
                      <loading v-if="$root.loading"></loading>
                <router-view v-else :key="$route.fullPath"></router-view>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <script2 type="text/javascript" src="/static/files/plugins/jquery/js/jquery.min.js"></script2>
     <script2 src="/static/files/assets/pages/waves/js/waves.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/plugins/bootstrap/js/bootstrap.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/plugins/jquery-slimscroll/js/jquery.slimscroll.js"></script2>

    <script2 src="/static/files/assets/js/pcoded.min.js"></script2>
    <script2 src="/static/files/assets/js/vertical/vertical-layout.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/assets/js/script.min.js"></script2>
    <script2 type="text/javascript" src="/static/files/assets/js/custom.js"></script2>
  </span>
</template>

<script>
  import TopNavbar from '@/components/layouts/top-navbar'
  import LeftNavbar from '@/components/layouts/left-navbar'
  import Loading from '@/components/includes/Loading'
  import FrontendService from '@/services/FrontendService'
  import VueJwtDecode from 'vue-jwt-decode'

  export default {

    name: 'Header',

    data () {
      return{
        reset: {},
        display: {},
        displayBlock: {
          display: 'block'
        },
        displayNone: {
          display: 'none'
        },
        screenheight: '',
        activeRoute: '',
        activeParent: '',
        activeSubParent: '',
        breadcrumb: '',
        breadcrumb2: '',
        allModules: [],
        auth: '',
      }
    },

    components:{
      'top-navbar' : TopNavbar,
      'left-navbar': LeftNavbar,
      'loading': Loading,
    },

    mounted() {
      let token = localStorage.getItem("token");
      if(!token){
        this.$router.push({name: "login"})
      }
      this.auth = VueJwtDecode.decode(token)
      this.getData ()
    },

    methods: {
      routename(value) {
        this.display = this.reset,
          this.activeRoute      = this.$route.path.split('/')[1],
          this.activeParent     = this.$route.meta.parent,
          this.activeSubParent  = this.$route.meta.subparent,
          this.breadcrumb       = this.$route.meta.breadcrumb,
          this.breadcrumb2      = this.$route.meta.breadcrumb2

        if(this.activeSubParent != 'null'){
          $("#" + this.activeSubParent).removeClass("pcoded-trigger")
          this.display[this.$route.meta.subparent] = 'block'
        }else{
          this.display = this.reset
        }
      },
      async getData () {
        const response = await FrontendService.module()
        this.allModules = response.data
      }
    },

    computed: {

    },

    created() {
      this.display = this.reset,
        this.activeRoute      = this.$route.path.split('/')[1],
        this.activeParent     = this.$route.meta.parent,
        this.activeSubParent  = this.$route.meta.subparent,
        this.breadcrumb       = this.$route.meta.breadcrumb,
        this.breadcrumb2      = this.$route.meta.breadcrumb2
      this.submenu          = this.$route.meta.submenu

      if(this.submenu == 'true'){
        this.display[this.$route.meta.parent] = 'block'
        if(this.activeSubParent != 'null'){
          this.display[this.$route.meta.subparent] = 'block'
        }
      }else{
        this.display = this.reset
      }
      this.screenheight = screen.height;
    }
  }
</script>

<style>
  @import "../../../static/files/plugins/bootstrap/css/bootstrap.min.css";
  @import "../../../static/files/assets/pages/waves/css/waves.min.css";
  @import "../../../static/files/assets/css/style.css";
  @import "../../../static/files/assets/pages/j-pro/css/j-pro-modern.css";
  @import "../../../static/files/assets/css/pages.css";
  @import "../../../static/files/assets/css/widget.css";
  @import "../../../static/files/assets/icon/feather/css/feather.css";
  @import "../../../static/files/assets/icon/themify-icons/themify-icons.css";
  @import "../../../static/files/assets/icon/icofont/css/icofont.css";
  @import "../../../static/files/assets/icon/font-awesome/css/font-awesome.min.css";
  @import "../../../static/files/plugins/iziToast/iziToast.min.css";
  @import "../../../static/files/assets/css/custom.css";
  .pcoded[theme-layout="vertical"] .pcoded-navbar .pcoded-item .pcoded-hasmenu .pcoded-submenu.display-block{display: block;}
  .pcoded[theme-layout="vertical"] .pcoded-navbar .pcoded-item .pcoded-hasmenu .pcoded-submenu.display-none{display: none;}
</style>
