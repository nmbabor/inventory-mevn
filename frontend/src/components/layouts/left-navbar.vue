<template>
  <div class="pcoded-inner-navbar main-menu">
    <div class="pcoded-navigation-label">Navigation</div>
    <ul class="pcoded-item pcoded-left-item">
      <li class=" ">
        <a href="form-masking.html" class="waves-effect waves-dark">
          <span class="pcoded-micon"><i class="feather icon-home"></i></span>
          <span class="pcoded-mtext">Dashboard</span>
        </a>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
          <span class="pcoded-micon"><i class="feather icon-user-plus"></i></span>
          <span class="pcoded-mtext">Admission</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="menu-bottom.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">New Admission'19</span>
            </a>
          </li>
          <li class="">
            <a href="box-layout.html" target="_blank" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Re Admission'19</span>
            </a>
          </li>
          <li class=" pcoded-hasmenu">
            <a href="javascript:void(0)" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Forms of 2019</span>
            </a>
            <ul class="pcoded-submenu">
              <li class="">
                <a href="menu-static.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">New Admission Form</span>
                </a>
              </li>
              <li class="">
                <a href="menu-header-fixed.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Re Admission Form</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-layers"></i>
									</span>
          <span class="pcoded-mtext">Student</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Student Bulk Add</span>
            </a>
          </li>
          <li class="">
            <a v-on:click="setComponent('studentInformation')" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Student Information</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Students Bulk Update</span>
            </a>
          </li>
          <li class=" pcoded-hasmenu">
            <a href="javascript:void(0)" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Manage TC</span>
            </a>
            <ul class="pcoded-submenu">
              <li class="">
                <a href="menu-static.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Generate TC</span>
                </a>
              </li>
              <li class="">
                <a href="menu-header-fixed.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">TC Student</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-users"></i>
									</span>
          <span class="pcoded-mtext">Teacher</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Teacher's Information</span>
            </a>
          </li>
          <li class="">
            <a href="widget-data.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Assign Subjects</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-box"></i>
									</span>
          <span class="pcoded-mtext">Class</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Manage Class</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Manage Section</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Manage Subject</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Class Routine</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-box"></i>
									</span>
          <span class="pcoded-mtext">Attendance</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Student Attendance</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Teacher's Attendance</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-box"></i>
									</span>
          <span class="pcoded-mtext">ID Card</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Student ID Card</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Teacher's ID Card</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-box"></i>
									</span>
          <span class="pcoded-mtext">Exam</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Admit Card</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Exam Settings</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-box"></i>
									</span>
          <span class="pcoded-mtext">Result</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Marks Entry</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Academic Transcript</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Tabulation Sheet</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Merit List</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Excel Entry</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-box"></i>
									</span>
          <span class="pcoded-mtext">Invoice</span>
        </a>
        <ul class="pcoded-submenu">
          <li class=" pcoded-hasmenu">
            <a href="javascript:void(0)" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Generate Invoice</span>
            </a>
            <ul class="pcoded-submenu">
              <li class="">
                <a href="menu-static.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Invoice By Class</span>
                </a>
              </li>
              <li class="">
                <a href="menu-header-fixed.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Advance Invoice</span>
                </a>
              </li>
              <li class="">
                <a href="menu-header-fixed.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Single Invoice</span>
                </a>
              </li>
              <li class="">
                <a href="menu-header-fixed.html" class="waves-effect waves-dark">
                  <span class="pcoded-mtext">Part Payment Invoice</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Invoice List by Class</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Print Invoice by Class</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Part Payment Invoice</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Payment Verification</span>
            </a>
          </li>
        </ul>
      </li>

      <li class="pcoded-hasmenu">
        <a href="javascript:void(0)" class="waves-effect waves-dark">
									<span class="pcoded-micon">
										<i class="feather icon-box"></i>
									</span>
          <span class="pcoded-mtext">SMS</span>
        </a>
        <ul class="pcoded-submenu">
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Admit Card</span>
            </a>
          </li>
          <li class="">
            <a href="widget-statistic.html" class="waves-effect waves-dark">
              <span class="pcoded-mtext">Exam Settings</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "left-navbar",
        methods: {
          setComponent: function(value) {
            this.$emit('setComponent', value)
          }
        }
    }
</script>

<style scoped>

</style>
