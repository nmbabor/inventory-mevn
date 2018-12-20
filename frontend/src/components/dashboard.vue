<template>
<span class="Dashboard">
  <div class="row">
    <div class="col-lg-12 col-md-12">
       <div class="row">
        <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/budget">
                <div class="card-block">
                  <div class="row align-items-center">
                      <div class="col-8">
                      <h4 class="text-c-green"> Title </h4>
                      <h6 class="secondTitle text-muted m-b-0">Short Title</h6>
                      </div>
                      <div class="col-4 text-right">
                      <i class="feather icon-file-text f-28"></i>
                      </div>
                  </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0"> Description </p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
                </router-link>
            </div>
        </div>
       </div>
      <div  v-if="auth.role=='superadmin'">
      <div class="row">
        <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/budget">
                <div class="card-block">
                  <div class="row align-items-center">
                      <div class="col-8">
                      <h4 class="text-c-green">{{budget.name}}</h4>
                      <h6 class="secondTitle text-muted m-b-0">Amount: {{budget.amount}}</h6>
                      </div>
                      <div class="col-4 text-right">
                      <i class="feather icon-file-text f-28"></i>
                      </div>
                  </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0"> Head Wise Total Received </p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
                </router-link>
            </div>
        </div>
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/budget-distribute/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-red">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Budget Year: {{budget.name}}</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-calendar f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-red">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Received by HQ</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/budget-distribute">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-blue">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Budget Received</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-thumbs-down f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-blue">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Received by REG</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        </div>
      <div class="row">
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/expenditure">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-yellow">Expenditure</h4>
                    <h6 class="secondTitle text-muted m-b-0">Budget: {{budget.name}}</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-bar-chart-2 f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-yellow">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Total Expenditure</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/reg-expenditure/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Expenditure</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Expenditure by HQ</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card">
              <router-link to="/reports/reg-expenditure">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-red">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Expenditure</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-calendar f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-red">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Head Wise Expenditure by REG</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        </div>
      <div class="row">
           <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-blue">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare fund</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-thumbs-down f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-blue">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Received from HQ</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
           <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-yellow">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare fund</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-bar-chart-2 f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-yellow">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Received from REG	</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare-expenditure/5bd067e77331240188146c8e">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">HQ</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare Paid</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-green">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Paid To HQ Employee</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
            <div class="col-md-3">
            <div class="card">
              <router-link to="/reports/welfare-expenditure">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-red">Division</h4>
                    <h6 class="secondTitle text-muted m-b-0">Welfare Paid</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-calendar f-28"></i>
                    </div>
                </div>
                </div>
                <div class="card-footer bg-c-red">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">Paid To REG Employee</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-down text-white f-16"></i>
                    </div>
                </div>
                </div>
              </router-link>
            </div>
            </div>
        </div>
      <div class="row">
      <div class="col-md-4">
          <div class="card">
            <router-link to="/reports/ntr">
              <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 class="text-c-green">NTR</h4>
                    <h6 class="secondTitle text-muted m-b-0">Total Value</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
              </div>
              <div class="card-footer bg-c-green">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0"> Find Total Value of NTR </p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-up text-white f-16"></i>
                  </div>
              </div>
              </div>
              </router-link>
          </div>
      </div>
          <div class="col-md-4">
          <div class="card">
            <router-link to="/reports/ntr-deposit/5bd067e77331240188146c8e">
              <div class="card-block">
              <div class="row align-items-center">
                  <div class="col-8">
                  <h4 class="text-c-red">HQ</h4>
                  <h6 class="secondTitle text-muted m-b-0">NTR Deposit</h6>
                  </div>
                  <div class="col-4 text-right">
                  <i class="feather icon-calendar f-28"></i>
                  </div>
              </div>
              </div>
              <div class="card-footer bg-c-red">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0">NTR Deposited By HQ	</p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-down text-white f-16"></i>
                  </div>
              </div>
              </div>
            </router-link>
          </div>
          </div>
          <div class="col-md-4">
          <div class="card">
            <router-link to="/reports/ntr-deposit">
              <div class="card-block">
              <div class="row align-items-center">
                  <div class="col-8">
                  <h4 class="text-c-blue">Division</h4>
                  <h6 class="secondTitle text-muted m-b-0">NTR Deposit</h6>
                  </div>
                  <div class="col-4 text-right">
                  <i class="feather icon-thumbs-down f-28"></i>
                  </div>
              </div>
              </div>
              <div class="card-footer bg-c-blue">
              <div class="row align-items-center">
                  <div class="col-9">
                  <p class="text-white m-b-0">NTR Deposited By REG</p>
                  </div>
                  <div class="col-3 text-right">
                  <i class="feather icon-trending-down text-white f-16"></i>
                  </div>
              </div>
              </div>
            </router-link>
          </div>
          </div>
      </div>

      </div>
      <div  v-else="">
        <div class="row">
            <div class="col-md-4" v-for="(reg , i) in regiments" :key="i">
            <div class="card">
                <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                    <h4 :class="'text-c-'+color[i]">{{reg.short_name}} </h4>
                    <h6 class=" text-muted m-b-0">{{reg.code}}</h6>
                    </div>
                    <div class="col-4 text-right">
                    <i class="feather icon-file-text f-28"></i>
                    </div>
                </div>
                </div>
                <div :class="'card-footer bg-c-'+color[i]">
                <div class="row align-items-center">
                    <div class="col-9">
                    <p class="text-white m-b-0">{{reg.name}}</p>
                    </div>
                    <div class="col-3 text-right">
                    <i class="feather icon-trending-up text-white f-16"></i>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</span>
</template>

<script>
import FrontendService from '@/services/FrontendService'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'Dashboard',
  data () {
    return {
      auth: '',
      regiments: '',
      budget: '',
      color:['yellow','green','blue','red','blue','yellow','green','yellow','green','blue','red','blue','yellow','green']
    }
  },
  mounted() {
    this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
    this.getData ()
  },

  methods: {
    async getData(){

    }
  }
}
</script>

<style scoped>
  .secondTitle{visibility: visible}
</style>
