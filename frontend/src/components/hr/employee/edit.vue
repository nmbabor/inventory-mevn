<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/employee" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
            <h4 class="card-title">Employee Information</h4>
          </div>
          <div class="card-body saveEmployee">
            <form method="POST" @submit.prevent="validateBeforeSubmit" id="saveEmployee" accept-charset="UTF-8" class="form-horizontal author_form" enctype="multipart/form-data">
              <div class="row"><!--start banner & image row -->
                <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 employee-photo">
                  <strong v-show="errors.has('photo')" class="help text-danger">{{ errors.first('photo') }}</strong>
                  <label class="upload_photo profile pull-right" for="photo" >
                    <!--  -->
                    <img id="image_load" v-if="photoUrl" :src="photoUrl" style="width: 86px;height: 86px">
                    <img src="/static/images/default/photo.png" style="width: 86px;height: 86px" v-else="">
                  </label>
                  <input type="file" id="photo" v-validate="'mimes:image/*'" data-vv-as="image" ref="photo" name="photo" @change="selectPhoto()" style="display:none">
                </div>
              </div><!--end banner & image row -->
              <div class="personal-data">
                <div class="row" v-if="auth.role==='superadmin'"> <!-- if regiment id exist start row-->
                  <div class="col-md-4">
                    <span class="text-danger"><b>*.</b></span>
                    <label class="control-label"><b>Company:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group" >
                      <select class="form-control" v-model="employee.company_id" @change="branch" v-validate="'required'" name="company_id"  >
                        <option value=""> -select company- </option>
                        <option v-for="(comp, index) in company"  v-bind:value="comp._id" :key="index">{{comp.company_name}}</option>
                      </select>
                      <span v-show="errors.has('company_id')" class="help error-dispaly  text-danger">{{ errors.first('company_id') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row" v-if="auth.role==='superadmin' || auth.role==='company' "> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>*.</b></span>
                    <label class="control-label"><b>Branch:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.branch_id" v-validate="'required'" name="branch_id"  >
                        <option value=""> -select branch- </option>
                        <option v-for="(branch, index) in branches" v-bind:value="branch._id" :key="index">{{branch.name}}</option>
                      </select>
                      <span v-show="errors.has('branch_id')" class="help error-dispaly  text-danger">{{ errors.first('branch_id') }}</span>
                    </div>
                  </div>
                </div>
                <div class="row"><!-- start row-->
                  <div class="col-md-4">
                    <span><b>1.</b></span>
                    <label class="control-label"><b>Name</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="name" v-model="employee.name" placeholder="Name" v-validate="'required'" class="form-control" :class="{'input': true, 'text-danger': errors.has('name') }" />
                      <span v-show="errors.has('name')" class="help error-dispaly text-danger">{{ errors.first('name') }}</span>
                      <span v-if="validateErrors.name" class="help text-danger">{{validateErrors.name }}</span>
                    </div>
                  </div>
                </div><!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>2.</b></span>
                    <label class="control-label"><b>Email</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text"  name="email" v-model="employee.email"  placeholder="Email" v-validate="'required|email'" class="form-control"/>
                      <span v-show="errors.has('email')" class="help error-dispaly  text-danger">{{ errors.first('email') }}</span>
                      <span v-if="validateErrors.email" class="help text-danger">{{validateErrors.email }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>3.</b></span>
                    <label class="control-label"><b>Mobile Number</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="personal_id" v-model="employee.mobile"   placeholder="Mobile Number" v-validate="'required'" class="form-control"/>
                      <span v-show="errors.has('mobile')" class="help error-dispaly  text-danger">{{ errors.first('mobile') }}</span>
                      <span v-if="validateErrors.mobile" class="help text-danger">{{validateErrors.mobile }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>4.</b></span>
                    <label class="control-label"><b>Employee ID:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text"  name="employee_id" v-model="employee.employee_id"  placeholder="Employee ID" v-validate="'required'" class="form-control"/>
                      <span v-show="errors.has('employee_id')" class="help error-dispaly  text-danger">{{ errors.first('employee_id') }}</span>
                      <span v-if="validateErrors.employee_id" class="help text-danger">{{validateErrors.employee_id }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>5.</b></span>
                    <label class="control-label"><b>Gender</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.gender" v-validate="'required'" name="gender">
                        <option value=""> -select- </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <span v-show="errors.has('gender')" class="help  error-dispaly text-danger">{{ errors.first('gender') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->

                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>6.</b></span>
                    <label class="control-label"><b>National ID Number(NID):</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text"  name="nid" v-model="employee.nid"  placeholder="Nid" v-validate="'required'" class="form-control"/>
                      <span v-show="errors.has('nid')" class="help error-dispaly  text-danger">{{ errors.first('nid') }}</span>
                      <span v-if="validateErrors.nid" class="help text-danger">{{validateErrors.nid }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>7.</b></span>
                    <label class="control-label"><b>Section:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.section_id" v-validate="'required'" name="section_id"  >
                        <option value="">-select Section-</option>
                        <option v-for="(sec, index) in sections" v-bind:value="sec._id" :key="index">{{sec.name}}</option>
                      </select>
                      <span v-show="errors.has('section_id')" class="help error-dispaly  text-danger">{{ errors.first('section_id') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>8.</b></span>
                    <label class="control-label"><b>Designation:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.designation_id" v-validate="'required'" name="designation_id"  >
                        <option value="">-select designation-</option>
                        <option v-for="(desig, index) in designations" v-bind:value="desig._id" :key="index">{{desig.name}}</option>
                      </select>
                      <span v-show="errors.has('designation_id')" class="help error-dispaly  text-danger">{{ errors.first('designation_id') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>9.</b></span>
                    <label class="control-label"><b>Date of Birth:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="dob" v-model="employee.dob" v-validate="'required'" placeholder="Date of Birth"></datetime>
                      <span v-show="errors.has('dob')" class="help error-dispaly  text-danger">{{ errors.first('dob') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>10.</b></span>
                    <label class="control-label"> <b>Date of Joining in Present Office:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <datetime type="date" format="dd-MM-yyyy" input-class="form-control" v-validate="'required'" name="doj_in_po"  v-model="employee.doj_in_po"  placeholder="Date of Joining in Present Office"></datetime>
                      <span v-show="errors.has('doj_in_po')" class="help  error-dispaly text-danger">{{ errors.first('doj_in_po') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>11.</b></span>
                    <label class="control-label"><b> Blood Group:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.blood_group" v-validate="'required'" name="blood_group" >
                        <option value=""> -select blood- </option>
                        <option value="A+"> A+ </option>
                        <option value="O+"> O+ </option>
                        <option value="B+"> B+ </option>
                        <option value="AB+"> AB+ </option>
                        <option value="A-"> A- </option>
                        <option value="O-"> O- </option>
                        <option value="B-"> B- </option>
                        <option value="AB-"> AB- </option>
                      </select>
                      <span v-show="errors.has('blood_group')" class="help error-dispaly  text-danger">{{ errors.first('blood_group') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>12.</b></span>
                    <label class="control-label"> <b>Father's Name:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="visible_mark" v-model="employee.father_name"  placeholder="Father's Name" class="form-control"/>
                      <span v-show="errors.has('father_name')" class="help error-dispaly  text-danger">{{ errors.first('father_name') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>13.</b></span>
                    <label class="control-label"> <b>Mother's Name:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="visible_mark" v-model="employee.mother_name"  placeholder="Mother's Name" class="form-control"/>
                      <span v-show="errors.has('mother_name')" class="help error-dispaly  text-danger">{{ errors.first('mother_name') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row">
                  <div class="col-md-4">
                    <span><b>14.</b></span>
                    <label class="control-label"> <b>Address:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <textarea name="address" v-model="employee.address" v-validate="'required'" placeholder="Address" rows="3" class="form-control "></textarea>
                      <span v-show="errors.has('address')" class="help error-dispaly  text-danger">{{ errors.first('address') }}</span>
                    </div>
                  </div>
                </div>
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>15.</b></span>
                    <label class="control-label"><b>Religion:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.religion" name="religion" v-validate="'required'">
                        <option value="Islam">Islam</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Christian">Christian</option>
                        <option value="Other"> Other</option>
                      </select>
                      <span v-show="errors.has('religion')" class="help error-dispaly  text-danger">{{ errors.first('religion') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>16.</b></span>
                    <label class="control-label"> <b>Passport Number:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="passport_number" v-model="employee.passport_number"  placeholder="Passport Number" class="form-control"/>
                      <span v-show="errors.has('passport_number')" class="help error-dispaly  text-danger">{{ errors.first('passport_number') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>17.</b></span>
                    <label class="control-label"> <b>e-TIN Number:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="etin_number" v-model="employee.etin_number"  placeholder="e-TIN Number" class="form-control"/>
                      <span v-show="errors.has('etin_number')" class="help error-dispaly  text-danger">{{ errors.first('etin_number') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>16.</b></span>
                    <label class="control-label"> <b>Salary </b>:</label>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>a.</b></span>
                        <label class="control-label"><b>Basic Pay:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="number" min="0" name="basic_pay" v-model="employee.basic_pay" placeholder="Basic Pay" class="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>b.</b></span>
                        <label class="control-label"><b>House Rent:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="number" min="0" name="house_rent" v-model="employee.house_rent" placeholder="Any Chronic Disease" class="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>b.</b></span>
                        <label class="control-label"><b>Medical Allowance:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="number" min="0" name="medical_allowance" v-model="employee.medical_allowance" placeholder="Medical Allowance" class="form-control"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> <!-- end row-->
              </div> <!--end personal data -->
              <div class="row"> <!-- start row-->

                <div class="col-md-4">
                  <label class="control-label"> </label>
                </div>
                <div class="col-md-8">
                  <div class="j-footer">
                    <button type="submit" class="btn btn-primary pull-right">Submit</button>
                  </div>
                </div>
              </div> <!-- end row-->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EmployeeService from '@/services/hr/EmployeeService'
  export default {
    name: 'employee',
    data () {
      return {
        validateErrors: '',
        employee: {
          company_id: '',
          branch_id: '',
          designation_id: '',
          section_id: '',
          religion: 'Islam',
          address: '',
          gender: '',
          blood_group: '',
        },
        company:'',
        branches:'',
        designations:'',
        sections:'',
        photoUrl: '',
        auth: this.$auth,
      }
    },
    mounted () {
      this.getDropDownData()
    },
    methods: {
      async getDropDownData () {
        const allData = await EmployeeService.show(this.$route.params.id)
        this.employee = allData.data
        this.photoUrl = this.$baseUrl+this.employee.photo
        const company = await EmployeeService.company()
        this.company = company.data
        const designation = await EmployeeService.designation()
        this.designations = designation.data
        const section = await EmployeeService.section()
        this.sections = section.data
        this.branch()
      },
      selectPhoto () {
        this.employee.photo = this.$refs.photo.files[0]
        this.photoUrl = URL.createObjectURL(this.$refs.photo.files[0])
      },
      async validateBeforeSubmit() {
        this.$validator.validateAll()
          .then((resp)=>{
            if (!resp){
              return
            }
            let formData = new FormData()
            /* Add the form data we need to submit */
            for (let key in this.employee) {
              formData.append(key, this.employee[key])
            }
            EmployeeService.update(formData,this.$route.params.id)
              .then(success => {
                this.validateErrors=''
                this.$swal({
                  type: 'success',
                  title: 'Registration Successfully Done Without Photo',
                  showConfirmButton: false,
                  timer: 1500
                })
                //this.$router.push({ name: 'employeesList' })
              }).catch(err => {
              this.validateErrors=err.response.data
            })
          }) // if validation error --------
          .catch(function(e) {
            console.log(e)
          })

      },
      async branch(){
        let branches = await EmployeeService.branch(this.employee.company_id)
        this.branches = branches.data
      }
    }
  }
</script>
<style></style>
