<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <router-link tag="a" to="/employees" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> View All</router-link>
            </div>
            <h4 class="card-title">Personal Data Sheet Of Employee </h4>
          </div>
          <div class="card-body saveEmployee">
            <form method="POST" @submit.prevent="validateBeforeSubmit" id="saveEmployee" accept-charset="UTF-8" class="form-horizontal author_form" enctype="multipart/form-data">
              <div class="row"><!--start banner & image row -->
                <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <!--<div class="text-center">-->
                    <!--<h3>Bangladesh National Cadet Corps</h3>-->
                    <!--<h4>Personal Data Sheet</h4>-->
                  <!--</div>-->
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 employee-photo">
                  <strong v-show="errors.has('photo')" class="help text-danger">{{ errors.first('photo') }}</strong>
                  <label class="upload_photo profile pull-right" for="photo" >
                    <!--  -->
                    <img id="image_load" v-if="photoUrl" :src="photoUrl" style="width: 86px;height: 86px">
                    <img src="../../../static/images/default/photo.png" style="width: 86px;height: 86px" v-else="">
                  </label>
                  <input type="file" id="photo" v-validate="'mimes:image/*|required'" data-vv-as="image" ref="photo" name="photo" @change="selectPhoto()" style="display:none">
                </div>
              </div><!--end banner & image row -->
              <div class="personal-data">
                <div class="row"> <!-- if regiment id exist start row-->
                  <div class="col-md-4">
                    <span class="text-danger"><b>*.</b></span>
                    <label class="control-label"><b>Division:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group" v-if="auth.regiment_id && auth.role=='regiment'">
                      <select class="form-control" v-model="employee.regiment_id" v-validate="'required'" name="regiment_id">
                        <option v-for="(regiment, index) in regiments"  v-bind:value="regiment._id" :key="index" disabled="disabled: true">{{regiment.name}}</option>
                      </select>
                      <span v-show="errors.has('regiment_id')" class="help error-dispaly  text-danger">{{ errors.first('regiment_id') }}</span>
                    </div>
                    <div class="form-group" v-else>
                      <select class="form-control" v-model="employee.regiment_id" v-validate="'required'" name="regiment_id"  >
                        <option value=""> -select division- </option>
                        <option v-for="(regiment, index) in regiments"  v-bind:value="regiment._id" :key="index">{{regiment.name}}</option>
                      </select>
                      <span v-show="errors.has('regiment_id')" class="help error-dispaly  text-danger">{{ errors.first('regiment_id') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>*.</b></span>
                    <label class="control-label"><b>HR Category:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.hr_category" v-validate="'required'" name="hr_category"  >
                        <option value=""> -select- </option>
                        <option v-for="(cat, index) in category" v-bind:value="cat" :key="index">{{cat}}</option>
                      </select>
                      <span v-show="errors.has('hr_category')" class="help error-dispaly  text-danger">{{ errors.first('hr_category') }}</span>
                    </div>
                  </div>
                </div>
                <div class="row"><!-- start row-->
                  <div class="col-md-4">
                      <span><b>1.</b></span>
                      <label class="control-label"><b>Name( Bangla )</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="name_bengali" v-model="employee.name_bengali" placeholder="Name in Bangla" v-validate="'required'" class="form-control" :class="{'input': true, 'text-danger': errors.has('name_bengali') }" />
                      <span v-show="errors.has('name_bengali')" class="help error-dispaly text-danger">{{ errors.first('name_bengali') }}</span>
                    </div>
                  </div>
                </div><!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                      <span><b>2.</b></span>
                      <label class="control-label"><b>Name( English )</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text"  name="name_english" v-model="employee.name_english"  placeholder="Name in English" v-validate="'required'" class="form-control"/>
                      <span v-show="errors.has('name_english')" class="help error-dispaly  text-danger">{{ errors.first('name_english') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                      <span><b>3.</b></span>
                    <label class="control-label"><b>Personal Number</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" name="personal_id" v-model="employee.personal_id"   placeholder="Personal Number" v-validate="'required'" class="form-control"/>
                      <span  class="help error-dispaly text-danger" v-if="serviceIdExist != ''">{{ serviceIdExist }}</span>
                      <span v-show="errors.has('personal_id')" class="help error-dispaly  text-danger">{{ errors.first('personal_id') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                      <span><b>4.</b></span>
                      <label class="control-label"><b>Gender</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.gender" v-validate="'required'" name="gender">
                        <option value="Male"> Male</option>
                        <option value="Female"> Female</option>
                      </select>
                      <span v-show="errors.has('gender')" class="help  error-dispaly text-danger">{{ errors.first('gender') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                      <span><b>5.</b></span>
                    <label class="control-label"><b>National ID Number(NID):</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text"  name="nid" v-model="employee.nid"  placeholder="Nid" v-validate="'required'" class="form-control"/>
                      <span  class="help error-dispaly text-danger" v-if="nidExist != ''">{{ nidExist }}</span>
                      <span v-show="errors.has('nid')" class="help error-dispaly  text-danger">{{ errors.first('nid') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                      <span><b>6.</b></span>
                      <label class="control-label"><b>Rank:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.rank" @change="onchangeSave()" v-validate="'required'" name="rank"  >
                        <option v-for="(rank, index) in ranks" v-bind:value="rank.rank" :key="index">{{rank.rank}}</option>
                      </select>
                      <span v-show="errors.has('rank')" class="help error-dispaly  text-danger">{{ errors.first('rank') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                      <span><b>7.</b></span>
                      <label class="control-label"><b>Date of Birth:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="dob" v-model="employee.dob" v-validate="'required'" placeholder="Date of Birth"></datetime>
                      <span v-show="errors.has('dob')" class="help error-dispaly  text-danger">{{ errors.first('dob') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>8.</b></span>
                    <label class="control-label"><b>Place of Birth:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.place_of_birth" @change="onchangeSave()" v-validate="'required'" name="place_of_birth">
                        <option v-for="(district,index) in districts" v-bind:value="district.district" :key="index">{{district.district}} </option>
                      </select>
                      <span v-show="errors.has('place_of_birth')" class="help error-dispaly  text-danger">{{ errors.first('place_of_birth') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>9.</b></span>
                    <label class="control-label"> <b>Date of Joining in BNCC:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" v-validate="'required'" name="doj_in_bncc"  v-model="employee.doj_in_bncc"  placeholder="Date of Joining in BNCC" ></datetime>
                      <span v-show="errors.has('doj_in_bncc')" class="help error-dispaly  text-danger">{{ errors.first('doj_in_bncc') }}</span>
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
                      <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" v-validate="'required'" name="doj_in_po"  v-model="employee.doj_in_po"  placeholder="Date of Joining in Present Office"></datetime>
                      <span v-show="errors.has('doj_in_po')" class="help  error-dispaly text-danger">{{ errors.first('doj_in_po') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>11.</b></span>
                    <label class="control-label"><b>Date of Promotion (If Applicable):</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group form-group-sm">
                      <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" v-validate="'required'" name="do_promotion"  v-model="employee.do_promotion" placeholder="Date of Promotion"></datetime>
                      <span v-show="errors.has('do_promotion')" class="help error-dispaly  text-danger">{{ errors.first('do_promotion') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>12.</b></span>
                    <label class="control-label"> <b>Designation / Appointment:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" @change="onchangeSave()" name="designation" v-model="employee.designation" v-validate="'required'" placeholder="Designation / Appointment" class="form-control" />
                      <span v-show="errors.has('designation')" class="help  error-dispaly text-danger">{{ errors.first('designation') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>13.</b></span>
                    <label class="control-label"> <b>Salary Grade:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.salary_grade" @change="onchangeSave()" v-validate="'required'" name="salary_grade" >
                        <option v-for="(salaryGrade, index) in salaryGrades" v-bind:value="salaryGrade.salary_grade" :key="index" > {{salaryGrade.salary_grade}}</option>
                      </select>
                      <span v-show="errors.has('salary_grade')" class="help  error-dispaly text-danger">{{ errors.first('salary_grade') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>14.</b></span>
                    <label class="control-label"><b> Salary Step:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.salary_step" @change="onchangeSave()" v-validate="'required'" name="salary_step" >
                        <option v-for="(salaryStep, index) in salarySteps" v-bind:value="salaryStep.salary_step" :key="index">{{salaryStep.salary_step}}</option>
                      </select>
                      <span v-show="errors.has('salary_step')" class="help error-dispaly  text-danger">{{ errors.first('salary_step') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>15.</b></span>
                    <label class="control-label"><b> Blood Group:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.blood_group" @change="onchangeSave()" v-validate="'required'" name="blood_group" >
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
                    <span><b>16.</b></span>
                    <label class="control-label"> <b>Visible Identification Mark(s):</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" @change="onchangeSave()" name="visible_mark" v-model="employee.visible_mark"  placeholder="Visible Identification Mark(s)" class="form-control"/>
                      <span v-show="errors.has('visible_mark')" class="help error-dispaly  text-danger">{{ errors.first('visible_mark') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->

                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>17.</b></span>
                    <label class="control-label"><b>Religion:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.religion" @change="onchangeSave()" name="religion" v-validate="'required'">
                        <option value="Islam"> Islam</option>
                        <option value="Hidoo"> Hidoo</option>
                        <option value="Boddo"> Boddo</option>
                        <option value="Krishtian"> Kristian</option>
                        <option value="Other"> Other</option>
                      </select>
                      <span v-show="errors.has('religion')" class="help error-dispaly  text-danger">{{ errors.first('religion') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>18.</b></span>
                    <label class="control-label"> <b>Address:</b></label>
                  </div>
                  <div class="col-md-12">
                   <div class="row">
                     <div class="col-md-4">
                       <span><b>a.</b></span>
                       <label class="control-label"> <b>Present Address:</b></label>
                     </div>
                     <div class="col-md-8">
                       <div class="form-group">
                       <textarea @change="onchangeSave()" name="present_address" v-model="employee.address[0].present_address" v-validate="'required'" placeholder="Present Address" rows="3" class="form-control ">
                         </textarea>
                         <span v-show="errors.has('present_address')" class="help error-dispaly  text-danger">{{ errors.first('present_address') }}</span>
                       </div>
                     </div>
                   </div>
                   <div class="row">
                     <div class="col-md-4">
                       <span><b>b.</b></span>
                       <label class="control-label"><b>Permanent Address:</b> </label>
                     </div>
                     <div class="col-md-8">
                       <div class="form-group">
                         <textarea @change="onchangeSave()" name="permanent_address" v-model="employee.address[0].permanent_address" v-validate="'required'" placeholder="Permanent Address" rows="3" class="form-control ">
                         </textarea>
                         <span v-show="errors.has('permanent_address')" class="help error-dispaly  text-danger">{{ errors.first('permanent_address') }}</span>
                       </div>
                     </div>
                   </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>19.</b></span>
                    <label class="control-label"> <b>Medical History Details (If Any)</b>:</label>
                  </div>
                  <div class="col-md-12">
                   <div class="row">
                     <div class="col-md-4">
                       <span><b>a.</b></span>
                       <label class="control-label"><b>Any Major Illness (Present / Past):</b></label>
                     </div>
                     <div class="col-md-8">
                       <div class="form-group">
                         <input type="text" @change="onchangeSave()" name="major_illness" v-model="employee.major_illness" placeholder="Major Illness" class="form-control"/>

                     </div>
                     </div>
                   </div>
                   <div class="row">
                     <div class="col-md-4">
                       <span><b>b.</b></span>
                       <label class="control-label"><b>Any Chronic Disease:</b></label>
                     </div>
                     <div class="col-md-8">
                       <div class="form-group">
                         <input type="text" @change="onchangeSave()" name="chronic_disease" v-model="employee.chronic_disease" placeholder="Any Chronic Disease" class="form-control"/>
                       </div>
                     </div>
                   </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>20.</b></span>
                    <label class="control-label"><b> Passport Details (If Any):</b></label>
                  </div>
                  <div class="col-md-12">
                   <div class="row"><!-- start sub row -->
                     <div class="col-md-4">
                       <span><b>a.</b></span>
                       <label class="control-label"><b> Passport Number:</b></label>
                     </div>
                     <div class="col-md-8">
                       <div class="form-group">
                       <input type="text" @change="onchangeSave()" name="passport_no" v-model="employee.passport_details[0].passport_no" placeholder="Passport Number" class="form-control"/>
                         <span v-show="errors.has('passport_no')" class="help text-danger">{{ errors.first('passport_no') }}</span>
                       </div>
                     </div>
                   </div><!-- end sub row -->
                   <div class="row"><!-- start sub row-->
                     <div class="col-md-4">
                       <span><b>b.</b></span>
                       <label class="control-label"><b>Date of Issue:</b></label>
                     </div>
                     <div class="col-md-2">
                       <div class="form-group">
                         <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="date_of_issue"  v-model="employee.passport_details[0].date_of_issue" placeholder="Date of Issue"></datetime>
                         <span v-show="errors.has('date_of_issue')" class="help text-danger">{{ errors.first('date_of_issue') }}</span>
                       </div>
                     </div>
                     <div class="col-md-2 col-sm-3">
                       <span><b>c.</b></span>
                       <label class="control-label"><b>Place of Issue:</b></label>
                     </div>
                     <div class="col-md-2 col-md-4">
                       <div class="form-group">
                         <input type="text" @change="onchangeSave()" name="place_of_issue" v-model="employee.passport_details[0].place_of_issue" placeholder="Place of Issue" class="form-control"/>
                         <span v-show="errors.has('place_of_issue')" class="help text-danger">{{ errors.first('place_of_issue') }}</span>
                       </div>
                     </div>

                   </div><!-- end sub row-->
                   <div class="row"><!-- start sub row-->
                     <div class="col-md-4">
                       <span><b>d.</b></span>
                       <label class="control-label"><b>Date of Expire:</b></label>
                     </div>
                     <div class="col-md-2">
                       <div class="form-group">
                         <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="date_of_expire"  v-model="employee.passport_details[0].date_of_expire" placeholder="Date of Expire"></datetime>
                         <span v-show="errors.has('date_of_expire')" class="help text-danger">{{ errors.first('date_of_expire') }}</span>
                       </div>
                     </div>
                     <div class="col-md-2">
                       <span><b>e.</b></span>
                       <label class="control-label"><b>Issuing Auth:</b></label>
                     </div>
                     <div class="col-md-2  col-md-4">
                       <div class="form-group">
                         <input type="text" @change="onchangeSave()" name="issuing_auth" v-model="employee.passport_details[0].issuing_auth" placeholder="Issuing Auth" class="form-control"/>
                         <span v-show="errors.has('issuing_auth')" class="help text-danger">{{ errors.first('issuing_auth') }}</span>
                       </div>
                     </div>
                   </div><!-- end sub row-->
                    <div class="row"><!-- start sub row -->
                      <div class="col-md-4">
                        <span><b>f.</b></span>
                        <label class="control-label"><b>Type of Passport:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <select class="form-control" @change="onchangeSave()" name="type_of_passport" v-model="employee.passport_details[0].type_of_passport">
                            <option value="Personal"><b>Personal</b></option>
                            <option value="Official"><b>Official</b></option>
                          </select>
                          <span v-show="errors.has('type_of_passport')" class="help text-danger">{{ errors.first('type_of_passport') }}</span>
                        </div>
                      </div>
                    </div><!-- end sub row -->
                    <div class="row"><!-- start sub row -->
                      <div class="col-md-4">
                        <span><b>g.</b></span>
                        <label class="control-label"><b>Reason(s) for Obtaining:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="text" @change="onchangeSave()" name="reason_of_obtaining" v-model="employee.passport_details[0].reason_of_obtaining" placeholder="Reason(s) for Obtaining:" class="form-control"/>
                          <span v-show="errors.has('reason_of_obtaining')" class="help text-danger">{{ errors.first('reason_of_obtaining') }}</span>
                        </div>
                      </div>
                    </div><!-- end sub row -->
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>21.</b></span>
                    <label class="control-label"><b>Tin / e-tin Number:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" @change="onchangeSave()" name="tin_number" v-model="employee.tin_number"  placeholder="Designation / Appointment" class="form-control"/>
                      <span v-show="errors.has('tin_number')" class="help text-danger">{{ errors.first('tin_number') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>22.</b></span>
                    <label class="control-label"><b>Driving Licence Number:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" @change="onchangeSave()" name="driving_licence_no" v-model="employee.driving_licence_no" placeholder="Driving Licence Number" class="form-control"/>
                      <span v-show="errors.has('driving_licence_no')" class="help text-danger">{{ errors.first('driving_licence_no') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>23.</b></span>
                    <label class="control-label"> <b>Countries Visited:</b></label>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="country table-responsive">
                      <table class="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                          <th>Sl</th>
                          <th>Name of Country</th>
                          <th width="40%"><span class="text-center">From</span> <span class="pull-right">To</span></th>
                          <th>Reasone (s) For Visiting</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- ======= first country ======= -->
                        <tr class="country-visit">
                          <td>1</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="visited_country" v-model="employee.visited_countries[0].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_from"  v-model="employee.visited_countries[0].visited_date_from" placeholder="From date" ></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_to"  v-model="employee.visited_countries[0].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="reasone_of_visit" v-model="employee.visited_countries[0].reasone_of_visit" placeholder="Reason"/></td>
                        </tr>
                        <!-- ======= Second country ======= -->
                        <tr class="country-visit">
                          <td>2</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="visited_country" v-model="employee.visited_countries[1].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_from"  v-model="employee.visited_countries[1].visited_date_from" placeholder="From date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_to"  v-model="employee.visited_countries[1].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="reasone_of_visit" v-model="employee.visited_countries[1].reasone_of_visit" placeholder="Reason" /></td>
                        </tr>
                        <!-- ======= third country ======= -->
                        <tr class="country-visit">
                          <td>3</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="visited_country" v-model="employee.visited_countries[2].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_from"  v-model="employee.visited_countries[2].visited_date_from" placeholder="From date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_to"  v-model="employee.visited_countries[2].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="reasone_of_visit" v-model="employee.visited_countries[2].reasone_of_visit" placeholder="Reason" /></td>
                        </tr>
                        <!-- ======= fourth country ======= -->
                        <tr class="country-visit">
                          <td>4</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="visited_country" v-model="employee.visited_countries[3].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_from"  v-model="employee.visited_countries[3].visited_date_from" placeholder="From date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="visited_date_to"  v-model="employee.visited_countries[3].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input type="text" class="form-control" @change="onchangeSave()" name="reasone_of_visit" v-model="employee.visited_countries[3].reasone_of_visit" placeholder="Reason" /></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>24.</b></span>
                    <label class="control-label"><b>Educational Qualification:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" @change="onchangeSave()" name="edu_qualification" v-model="employee.edu_qualification" v-validate="'required'" placeholder="Educational Qualification:" class="form-control"/>
                      <span v-show="errors.has('edu_qualification')" class="help text-danger">{{ errors.first('edu_qualification') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>25.</b></span>
                    <label class="control-label"><b>Telephone Number(s):</b></label>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>a.</b></span>
                        <label class="control-label"><b>Personal:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="text" @change="onchangeSave()" name="personal_telephone" v-model="employee.personal_telephone" v-validate="'required'" placeholder="Personal Telephone" class="form-control"/>
                          <span v-show="errors.has('personal_telephone')" class="help text-danger">{{ errors.first('personal_telephone') }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>b.</b></span>
                        <label class="control-label"><b>Official:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="text" @change="onchangeSave()" name="official_telephone" v-model="employee.official_telephone" v-validate="'required'" placeholder="Official Telephone" class="form-control"/>
                          <span v-show="errors.has('official_telephone')" class="help text-danger">{{ errors.first('official_telephone') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>26.</b></span>
                    <label class="control-label"><b>Mobile Number(s):</b></label>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>a.</b></span>
                        <label class="control-label"><b>Personal:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="number" @change="onchangeSave()" name="personal_mobile" v-model="employee.personal_mobile" v-validate="'required'" min="0" placeholder="Personal Number" class="form-control"/>
                          <span v-show="errors.has('personal_mobile')" class="help text-danger">{{ errors.first('personal_mobile') }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>b.</b></span>
                        <label class="control-label"><b>Official:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="number" @change="onchangeSave()" name="official_mobile" v-model="employee.official_mobile" v-validate="'required'" min="0" placeholder="Official Number" class="form-control"/>
                          <span v-show="errors.has('official_mobile')" class="help text-danger">{{ errors.first('official_mobile') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>27.</b></span>
                    <label class="control-label"><b>Electronic Identity</b></label>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <span>a.</span>
                        <label class="control-label"><b>Email Id:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="email" @change="onchangeSave()" name="email" v-model="employee.email" v-validate="'required'" placeholder="Email Id" class="form-control"/>
                          <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>b.</b></span>
                        <label class="control-label"><b>Facebook Id:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="text" @change="onchangeSave()" name="facebook" v-model="employee.facebook" placeholder="Facebook Id" class="form-control"/>

                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <span><b>c.</b></span>
                        <label class="control-label"><b>Any Other:</b></label>
                      </div>
                      <div class="col-md-8">
                        <div class="form-group">
                          <input type="text" @change="onchangeSave()" name="other_electornic_id" v-model="employee.other_electornic_id" placeholder="Any Other Id" class="form-control"/>
                          <span v-show="errors.has('other_electornic_id')" class="help text-danger">{{ errors.first('other_electornic_id') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>28.</b></span>
                    <label class="control-label"><b>Family Details:</b></label>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>b.</b></span>
                    <label class="control-label"><b>Father:</b></label>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="country table-responsive">
                      <table class="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                          <th>Name</th>
                          <th width="30%">Profession</th>
                          <th>Mobile No:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="country-visit">
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="father_name" v-model="employee.father_name" v-validate="'required'"  placeholder="Father Name" />
                            <span v-show="errors.has('father_name')" class="help text-danger">{{ errors.first('father_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="father_profession" v-model="employee.father_profession" v-validate="'required'"  placeholder="Father Profession" />
                            <span v-show="errors.has('father_profession')" class="help text-danger">{{ errors.first('father_profession') }}</span>
                          </td>
                          <td>
                            <input type="number" min="0"  class="form-control" @change="onchangeSave()"  name="father_mobile" v-model="employee.father_mobile" v-validate="'required'" placeholder="Father Mobile No" />
                            <span v-show="errors.has('father_mobile')" class="help text-danger">{{ errors.first('father_mobile') }}</span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>b.</b></span>
                    <label class="control-label"><b>Mother:</b></label>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="country table-responsive">
                      <table class="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                          <th>Name</th>
                          <th width="30%">Profession</th>
                          <th>Mobile No:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="country-visit">
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="mother_name" v-model="employee.mother_name" v-validate="'required'" placeholder="Mother Name" />
                            <span v-show="errors.has('mother_name')" class="help text-danger">{{ errors.first('mother_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="mother_profession" v-model="employee.mother_profession" v-validate="'required'" placeholder="Mother Profession" />
                            <span v-show="errors.has('mother_profession')" class="help text-danger">{{ errors.first('mother_profession') }}</span>
                          </td>
                          <td>
                            <input type="number" min="0" class="form-control"  @change="onchangeSave()" name="mother_mobile" v-model="employee.mother_mobile" v-validate="'required'" placeholder="Mother Mobile No" />
                            <span v-show="errors.has('mother_mobile')" class="help text-danger">{{ errors.first('mother_mobile') }}</span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>c.</b></span>
                    <label class="control-label"><b>Spouse (s):</b></label>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="country table-responsive">
                      <table class="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                          <th>Sl</th>
                          <th>Name</th>
                          <th width="30%">Profession</th>
                          <th>Mobile No:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="country-visit">
                          <td>1</td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="spouse1_name" v-model="employee.spouses[0].spouse1_name" v-validate="'required'" placeholder="First Spouse Name" />
                            <span v-show="errors.has('spouse1_name')" class="help text-danger">{{ errors.first('spouse1_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="spouse1_profession" v-model="employee.spouses[0].spouse1_profession" v-validate="'required'" placeholder="First Spouse Profession" />
                            <span v-show="errors.has('spouse1_profession')" class="help text-danger">{{ errors.first('spouse1_profession') }}</span>
                          </td>
                          <td>
                            <input type="number" min="0" onscroll="null" class="form-control" @change="onchangeSave()"  name="spouse1_mobile" v-model="employee.spouses[0].spouse1_mobile" v-validate="'required'"  placeholder="First Spouse Mobile No" /></td>
                            <span v-show="errors.has('spouse1_mobile')" class="help text-danger">{{ errors.first('spouse1_mobile') }}</span>
                        </tr>
                        <tr class="country-visit">
                          <td>2</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()"  name="spouse2_name" v-model="employee.spouses[1].spouse2_name" v-validate="'required'"  placeholder="Second Spouse Name" />
                            <span v-show="errors.has('spouse2_name')" class="help text-danger">{{ errors.first('spouse2_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="spouse2_profession" v-model="employee.spouses[1].spouse2_profession" v-validate="'required'"  placeholder="Second Spouse Profession" />
                            <span v-show="errors.has('spouse2_profession')" class="help text-danger">{{ errors.first('spouse2_profession') }}</span>
                          </td>
                          <td><input type="number" min="0" onscroll="null" class="form-control" @change="onchangeSave()"  name="spouse2_mobile" v-model="employee.spouses[1].spouse2_mobile" v-validate="'required'"  placeholder="Second Spouse Mobile No" />
                            <span v-show="errors.has('spouse2_mobile')" class="help text-danger">{{ errors.first('spouse2_mobile') }}</span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>d.</b></span>
                    <label class="control-label"><b>Children:</b></label>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="country table-responsive">
                      <table class="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                          <th>Sl</th>
                          <th>Name</th>
                          <th width="30%">Profession</th>
                          <th>Date of Birth</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="country-visit">
                          <td>1</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()"  name="children1_name" v-model="employee.childrenes[0].children1_name" placeholder="First Children Name" /></td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="children1_profession" v-model="employee.childrenes[0].children1_profession" placeholder="First Children Profession" />
                          </td>
                          <td>
                            <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="children1_dob" v-model="employee.childrenes[0].children1_dob" placeholder="First Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>2</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()"  name="children2_name" v-model="employee.childrenes[1].children2_name" placeholder="Second Children Name" /></td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="children2_profession" v-model="employee.childrenes[1].children2_profession" placeholder="Second Children Profession" />
                          </td>
                          <td>
                            <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="children2_dob" v-model="employee.childrenes[1].children2_dob" placeholder="Second Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>3</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()"  name="children3_name" v-model="employee.childrenes[2].children3_name" placeholder="Third Children Name" /></td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="children3_profession" v-model="employee.childrenes[2].children3_profession" placeholder="Third Children Profession" />
                          </td>
                          <td>
                            <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="children3_dob" v-model="employee.childrenes[2].children3_dob" placeholder="Third Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>4</td>
                          <td><input type="text" class="form-control"  @change="onchangeSave()" name="children4_name" v-model="employee.childrenes[3].children4_name" placeholder="Fourth Children Name" /></td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="children4_profession" v-model="employee.childrenes[3].children4_profession" placeholder="Fourth Children Profession" />
                          </td>
                          <td>
                            <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  @change="onchangeSave()" name="children4_dob"  v-model="employee.childrenes[3].children4_dob" placeholder="Forth Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>5</td>
                          <td><input type="text" class="form-control"  @change="onchangeSave()" name="children5_name" v-model="employee.childrenes[4].children5_name" placeholder="Fifth Children Name" /></td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="children5_profession" v-model="employee.childrenes[4].children5_profession" placeholder="Fifth Children Profession" />
                          </td>
                          <td>
                            <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="children5_dob"  v-model="employee.childrenes[4].children5_dob" placeholder="Fifth Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>6</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()"  name="children6_name" v-model="employee.childrenes[5].children6_name" placeholder="Six Children Name" /></td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="children6_profession" v-model="employee.childrenes[5].children6_profession" placeholder="Six Children Profession" />
                          </td>
                          <td>
                            <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="children6_dob"  v-model="employee.childrenes[5].children6_dob" placeholder="Sic Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>7</td>
                          <td><input type="text" class="form-control" @change="onchangeSave()"  name="children7_name" v-model="employee.childrenes[6].children7_name" placeholder="Seven Children Name" /></td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="children7_profession" v-model="employee.childrenes[6].children7_profession" placeholder="Seven Children Profession" />
                          </td>
                          <td>
                            <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="children7_dob"  v-model="employee.childrenes[6].children7_dob" placeholder="Seven Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>29.</b></span>
                    <label class="control-label"><b>Nominee:</b></label>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="country table-responsive">
                      <table class="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                          <th>Sl</th>
                          <th>Name</th>
                          <th>Religion</th>
                          <th>NID No:</th>
                          <th>Percentage (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="country-visit">
                          <td>1</td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="nominee1_name" v-model="employee.nominees[0].nominee1_name" v-validate="'required'"  placeholder="Nominee Name" />
                            <span v-show="errors.has('nominee1_name')" class="help text-danger">{{ errors.first('nominee1_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee1_religion" v-model="employee.nominees[0].nominee1_religion"  v-validate="'required'"  placeholder="Religion" />
                            <span v-show="errors.has('nominee1_religion')" class="help text-danger">{{ errors.first('nominee1_religion') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee1_nid" v-model="employee.nominees[0].nominee1_nid" v-validate="'required'"  placeholder="National Id"/>
                            <span v-show="errors.has('nominee1_nid')" class="help text-danger">{{ errors.first('nominee1_nid') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee1_percentage" v-model="employee.nominees[0].nominee1_percentage"  v-validate="'required'"  placeholder="Nominee Percentage" />
                            <span v-show="errors.has('nominee1_percentage')" class="help text-danger">{{ errors.first('nominee1_percentage') }}</span>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>2</td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="nominee2_name" v-model="employee.nominees[1].nominee2_name"  v-validate="'required'"  placeholder="Nominee Name" />
                            <span v-show="errors.has('nominee2_name')" class="help text-danger">{{ errors.first('nominee2_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="nominee2_religion" v-model="employee.nominees[1].nominee2_religion"  v-validate="'required'"  placeholder="Religion" />
                            <span v-show="errors.has('nominee2_religion')" class="help text-danger">{{ errors.first('nominee2_religion') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee2_nid" v-model="employee.nominees[1].nominee2_nid" v-validate="'required'"  placeholder="National Id"/>
                            <span v-show="errors.has('nominee2_nid')" class="help text-danger">{{ errors.first('nominee2_nid') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="nominee2_percentage" v-model="employee.nominees[1].nominee2_percentage"  v-validate="'required'" placeholder="Nominee Percentage" />
                            <span v-show="errors.has('nominee2_percentage')" class="help text-danger">{{ errors.first('nominee2_percentage') }}</span>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>3</td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="nominee3_name" v-model="employee.nominees[2].nominee3_name"  v-validate="'required'"  placeholder="Nominee Name" />
                            <span v-show="errors.has('nominee3_name')" class="help text-danger">{{ errors.first('nominee3_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee3_religion" v-model="employee.nominees[2].nominee3_religion"  v-validate="'required'"  placeholder="Religion" />
                            <span v-show="errors.has('nominee3_religion')" class="help text-danger">{{ errors.first('nominee3_religion') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee3_nid" v-model="employee.nominees[2].nominee3_nid"  v-validate="'required'"  placeholder="National Id"/>
                            <span v-show="errors.has('nominee3_nid')" class="help text-danger">{{ errors.first('nominee3_nid') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee3_percentage" v-model="employee.nominees[2].nominee3_percentage"  v-validate="'required'"  placeholder="Nominee Percentage" />
                            <span v-show="errors.has('nominee3_percentage')" class="help text-danger">{{ errors.first('nominee3_percentage') }}</span>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>4</td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee4_name" v-model="employee.nominees[3].nominee4_name"  v-validate="'required'"  placeholder="Nominee Name" />
                            <span v-show="errors.has('nominee4_name')" class="help text-danger">{{ errors.first('nominee4_name') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="nominee4_religion" v-model="employee.nominees[3].nominee4_religion"  v-validate="'required'"  placeholder="Religion" />
                            <span v-show="errors.has('nominee4_religion')" class="help text-danger">{{ errors.first('nominee4_religion') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control"  @change="onchangeSave()" name="nominee4_nid" v-model="employee.nominees[3].nominee4_nid" v-validate="'required'"  placeholder="National Id"/>
                            <span v-show="errors.has('nominee4_nid')" class="help text-danger">{{ errors.first('nominee4_nid') }}</span>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="nominee4_percentage" v-model="employee.nominees[3].nominee4_percentage" v-validate="'required'"  placeholder="Nominee Percentage" />
                            <span v-show="errors.has('nominee4_percentage')" class="help text-danger">{{ errors.first('nominee4_percentage') }}</span>
                          </td>
                        </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-12">
                    <span><b>30.</b></span>
                    <label class="control-label"><b>Service Record:</b></label>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="country table-responsive">
                      <table class="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                          <th width="30%"><span class="text-center">From</span> <span class="pull-right">To</span></th>
                          <th>Location (Regt/HQs)</th>
                          <th>Appoinment</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- service 1-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  @change="onchangeSave()" name="service1_date_from"  v-model="employee.service_record[0].service1_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service1_date_to"  v-model="employee.service_record[0].service1_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" @change="onchangeSave()"  name="regiment1" v-model="employee.service_record[0].location1" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="ervice_appoinment" v-model="employee.service_record[0].service1_appoinment" /></td>
                        </tr>
                        <!-- service 2-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()" name="service2_date_from"  v-model="employee.service_record[1].service2_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service2_date_to"  v-model="employee.service_record[1].service2_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control"  @change="onchangeSave()" name="regiment1" v-model="employee.service_record[1].location2" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="ervice_appoinment" v-model="employee.service_record[1].service2_appoinment" /></td>
                        </tr>
                        <!-- service 3-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service3_date_from"  v-model="employee.service_record[2].service3_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service3_date_to"  v-model="employee.service_record[2].service3_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" @change="onchangeSave()"  name="regiment1" v-model="employee.service_record[2].location3" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="ervice_appoinment" v-model="employee.service_record[2].service3_appoinment" /></td>
                        </tr>
                        <!-- service 4-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service4_date_from"  v-model="employee.service_record[3].service4_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service4_date_to"  v-model="employee.service_record[3].service4_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control"  @change="onchangeSave()" name="regiment1" v-model="employee.service_record[3].location4" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="ervice_appoinment" v-model="employee.service_record[3].service4_appoinment" /></td>
                        </tr>
                        <!-- service 5-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service5_date_from"  v-model="employee.service_record[4].service5_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service5_date_to"  v-model="employee.service_record[4].service5_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control"  @change="onchangeSave()" name="regiment1" v-model="employee.service_record[4].location5" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="ervice_appoinment" v-model="employee.service_record[4].service5_appoinment" /></td>
                        </tr>
                        <!-- service 6-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control"  @change="onchangeSave()" name="service6_date_from"  v-model="employee.service_record[5].service6_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" @change="onchangeSave()"  name="service6_date_to"  v-model="employee.service_record[5].service6_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" @change="onchangeSave()"  name="regiment1" v-model="employee.service_record[5].location6" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" @change="onchangeSave()"  name="ervice_appoinment" v-model="employee.service_record[5].service6_appoinment" /></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>31.</b></span>
                    <label class="control-label"><b>Special Skill</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" class="form-control" v-model="employee.special_skill" @change="onchangeSave()"  name="specila_skill" v-validate="'required'" placeholder="Enter Special Skill (optional)" />
                      <span v-show="errors.has('specila_skill')" class="help text-danger">{{ errors.first('specila_skill') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>32.</b></span>
                    <label class="control-label"><b>Punishment(Under Rule)</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <textarea @change="onchangeSave()"  name="punishment" v-model="employee.punishment" placeholder="Enter Punishment(optional)" rows="3" class="form-control ">
                      </textarea>
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
                    <input type="hidden" name="id" v-model="employee.id" />
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
import EmployeeService from '@/services/EmployeeService'
import DepartmentService from '@/services/DepartmentService'
import RankService from '@/services/RankService'
import DistrictsService from '@/services/DistrictsService'
import SalaryGradeService from '@/services/SalaryGradeService'
import SalaryStepService from '@/services/SalaryStepService'
import RegimentService from '@/services/RegimentService'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'employee',
  data () {
    return {
      serviceIdExist: '',
      nidExist: '',
      employee: {
        regiment_id: '',
        id: '',
        address:[{present_address: '', permanent_address: ''}],
        passport_details: [
          {
            passport_no: '',date_of_issue: '', place_of_issue: '', date_of_expire: '', issuing_auth: '', type_of_passport: '', reason_of_obtaining: ''
          }
        ],
        visited_countries: [
          {
            visited_country: '',visited_date_from: '',visited_date_to: '', reasone_of_visit: ''
          },
          {
            visited_country: '',visited_date_from: '',visited_date_to: '',reasone_of_visit: ''
          },
          {
            visited_country: '', visited_date_from: '', visited_date_to: '', reasone_of_visit: ''
          },
          {
            visited_country: '', visited_date_from: '',visited_date_to: '',reasone_of_visit: ''
          }
        ],
        spouses: [
          {
            spouse1_name: '',spouse1_profession: '', spouse1_mobile: ''

          },
          {
            spouse2_name: '',spouse2_profession: '',spouse2_mobile: ''
          }
        ],
        childrenes: [
          {
            children1_name: '',children1_profession: '', children1_dob: '',
          },
          {
            children2_name: '',children2_profession: '',  children2_dob: '',
          },
          {
            children3_name: '',children3_profession: '', children3_dob: '',
          },
          {
            children4_name: '',  children4_profession: '', children4_dob: '',
          },
          {
            children5_name: '', children5_profession: '', children5_dob: '',
          },
          {
            children6_name: '',  children6_profession: '',children6_dob: '',
          },
          {
            children7_name: '', children7_profession: '', children7_dob: '',
          }
        ],
        nominees: [
          {
            nominee1_name: '',nominee1_religion: '', nominee1_nid: '',nominee1_percentage: ''
          },
          {
            nominee2_name: '',nominee2_religion: '', nominee2_nid: '',nominee2_percentage: ''
          },
          {
            nominee3_name: '',nominee3_religion: '', nominee3_nid: '',nominee3_percentage: ''
          },
          {
            nominee4_name: '',nominee4_religion: '', nominee4_nid: '',nominee4_percentage: ''
          }
        ],
        service_record: [
          {
            service1_date_from: '', service1_date_to: '', location1: '',service1_appoinment: ''
          },
          {
            service2_date_from: '', service2_date_to: '', location2: '',service2_appoinment: ''
          },
          {
            service3_date_from: '', service3_date_to: '', location3: '',service3_appoinment: ''
          },
          {
            service4_date_from: '', service4_date_to: '', location4: '',service4_appoinment: ''
          },
          {
            service5_date_from: '', service5_date_to: '', location5: '',service5_appoinment: ''
          },
          {
            service6_date_from: '', service6_date_to: '', location6: '',service6_appoinment: ''
          },
        ],
        hr_category: ''
      },
      regiments:'',
      ranks: '',
      districts: '',
      salaryGrades: '',
      salarySteps: '',
      photoUrl: '',
      auth: '',
      category: ['Army','Navy','Air','Civil']
    }
  },
  mounted () {
    this.auth = VueJwtDecode.decode(localStorage.getItem("token"))
    if(this.auth.regiment_id && this.auth.regiment_id!==''){
      this.employee.regiment_id=this.auth.regiment_id
    }else{
      this.employee.regiment_id = ''
    }
    this.getDropDownData()
  },
  methods: {
    onchangeSave(){
      if(this.employee.personal_id.length>0 && this.employee.nid.length>0){
        EmployeeService.empDataSave(this.employee)
          .then(data=>{
            //this.employee = data.data
            //console.log(data)
            this.employee.id=data.data._id
          })
          .catch(err => {
            console.log(this.serviceIdExist = err.response.data.serviceIdExist)
            console.log(this.nidExist = err.response.data.nidExist)
          })
      }
    },
    async getDropDownData () {
      const regiments = await EmployeeService.activeRegiments()
      this.regiments = regiments.data
      const ranks = await RankService.activeRanks()
      this.ranks = ranks.data
      const districts = await DistrictsService.activeDistricts()
      this.districts=districts.data
      const salaryGrades = await SalaryGradeService.activeSalaryGrades()
      this.salaryGrades=salaryGrades.data
      const salarySteps = await SalaryStepService.activeSalarySteps()
      this.salarySteps=salarySteps.data
//      const regiments = await RegimentService.activeRegiments()
//      this.regiments=regiments.data
    },
    selectPhoto () {
      //  this line only display selected photo to display user
      this.photoUrl = URL.createObjectURL(this.$refs.photo.files[0])

      //  this line only attact photo data to employee array
//      this.employee.photo = this.$refs.photo.files[0]
    },
    async validateBeforeSubmit() {
      this.$validator.validateAll()
        .then((resp)=>{
          if (!resp){
            return
          }
          EmployeeService.store(this.employee)
            .then(success => {
              if(this.$refs.photo.files[0]){ // if user select img then img upload

                let formData = new FormData()
                formData.append('photo', this.$refs.photo.files[0])
                formData.append('id', success.data._id)
                EmployeeService.employeePhotoUpload(formData)
                  .then(photoUload=>{
                    this.$swal({
                      type: 'success',
                      title: 'Registration Successfully Done',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    this.$router.push({ name: 'employeesList' })
                  })
                  .catch(photoErr=>{
                    console.log(photoErr)
                  })
              }else { // if user no select img
                this.$swal({
                  type: 'success',
                  title: 'Registration Successfully Done Without Photo',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.$router.push({ name: 'employeesList' })
              }
            }).catch(err => {
            console.log(this.serviceIdExist = err.response.data.serviceIdExist)
            console.log(this.nidExist = err.response.data.nidExist)
          })
        }) // if validation error --------
        .catch(function(e) {
          console.log(e)
        })

    }
  }
}
</script>
<style></style>
