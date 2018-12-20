<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            <div class="card-btn pull-right">
              <button class="btn btn-sm btn-warning" v-print="'#printThis'"><i class="fa fa-print"></i> Print</button>
              <router-link tag="a" to="/employees" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> View All</router-link>
            </div>
            <h4 class="card-title">Personal Data Sheet Of Employee </h4>
          </div>
          <div class="card-body saveEmployee" id="printThis">
            <form method="POST" id="saveEmployee" accept-charset="UTF-8" class="form-horizontal author_form" enctype="multipart/form-data">
              <div class="row"><!--start banner & image row -->
                <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div class="text-center">
                    <h3>Bangladesh National Cadet Corps</h3>
                    <h4>Personal Data Sheet</h4>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 employee-photo" >
                  <strong v-show="errors.has('photo')" class="help text-danger">{{ errors.first('photo') }}</strong>
                  <label class="upload_photo profile pull-right"  >
                    <!--  -->
                    <img  v-if="photo" :src="baseUrl+photo" style="width: 86px;height: 86px">
                    <img src="../../../static/images/default/photo.png" style="width: 86px;height: 86px" v-else="">
                  </label>
                  <!--<input type="file" id="photo" data-vv-as="image" ref="photo" name="photo" @change="selectPhoto()" style="display:none">-->
                </div>
              </div><!--end banner & image row -->
              <div class="personal-data">
                <div class="row"> <!-- if regiment id exist start row-->
                  <div class="col-md-4">
                    <span class="text-danger"><b>*.</b></span>
                    <label class="control-label"><b>Division:</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <select class="form-control" v-model="employee.regiment_id" v-validate="'required'" name="regiment_id"  >
                        <option v-for="(regiment, index) in regiments"  v-bind:value="regiment._id" :key="index" >{{regiment.name}}</option>
                      </select>
                      <span v-show="errors.has('regiment_id')" class="help error-dispaly  text-danger">{{ errors.first('regiment_id') }}</span>
                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row" ><!-- start row-->
                  <div class="col-md-4" >
                    <span><b>1.</b></span>
                    <label class="control-label"><b>Name( Bangla )</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input readonly type="text" name="name_bengali" v-model="employee.name_bengali"  placeholder="Name in Bangla" class="form-control" :class="{'input': true, 'text-danger': errors.has('name_bengali') }" />
                    </div>
                  </div>
                </div><!-- end row-->
                <div class="row" > <!-- start row-->
                  <div class="col-md-4" >
                    <span><b>2.</b></span>
                    <label class="control-label"><b>Name( English )</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input readonly type="text" name="name_english" v-model="employee.name_english"  placeholder="Name in English" class="form-control"/>

                    </div>
                  </div>
                </div> <!-- end row-->
                <div class="row"> <!-- start row-->
                  <div class="col-md-4">
                    <span><b>3.</b></span>
                    <label class="control-label"><b>Personal Numbr</b></label>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <input readonly type="text" name="personal_id" v-model="employee.personal_id"    placeholder="Personal Number" class="form-control"/>
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
                      <select class="form-control" v-model="employee.gender"    name="gender">
                        <option value="Male"> Male</option>
                        <option value="Female"> Female</option>
                      </select>
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
                      <input readonly type="text" name="nid" v-model="employee.nid"    placeholder="Nid" class="form-control"/>
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
                      <select class="form-control" v-model="employee.rank" name="rank"   >
                        <option v-for="(rank, index) in ranks" v-bind:value="rank.rank" :key="index">{{rank.rank}}</option>
                      </select>
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
                      <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="dob" v-model="employee.dob"   placeholder="Date of Birth"></datetime>
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
                      <select class="form-control" v-model="employee.place_of_birth" name=place_of_birth >
                        <option v-for="(district,index) in districts" v-bind:value="district.district" :key="index">{{district.district}} </option>
                      </select>
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
                      <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="doj_in_bncc"  v-model="employee.doj_in_bncc"  placeholder="Date of Joining in BNCC"></datetime>
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
                      <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="doj_in_po"  v-model="employee.doj_in_po"   placeholder="Date of Joining in Present Office"></datetime>
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
                      <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="do_promotion"  v-model="employee.do_promotion"  placeholder="Date of Promotion"></datetime>

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
                      <input readonly type="text" name="designation" v-model="employee.designation"  placeholder="Designation / Appointment" class="form-control"/>
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
                      <select class="form-control" v-model="employee.salary_grade" name="salary_grade"  >
                        <option v-for="(salaryGrade, index) in salaryGrades" v-bind:value="salaryGrade.salary_grade" :key="index" > {{salaryGrade.salary_grade}}</option>
                      </select>

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
                      <select class="form-control" v-model="employee.salary_step" name="salary_step"  >
                        <option v-for="(salaryStep, index) in salarySteps" v-bind:value="salaryStep.salary_step" :key="index">{{salaryStep.salary_step}}</option>
                      </select>
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
                      <select class="form-control" v-model="employee.blood_group" name="blood_group"  >
                        <option value="A+"> A+ </option>
                        <option value="O+"> O+ </option>
                        <option value="B+"> B+ </option>
                        <option value="AB+"> AB+ </option>
                        <option value="A-"> A- </option>
                        <option value="O-"> O- </option>
                        <option value="B-"> B- </option>
                        <option value="AB-"> AB- </option>
                      </select>
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
                      <input readonly type="text" name="visible_mark" v-model="employee.visible_mark"   placeholder="Visible Identification Mark(s)" class="form-control"/>
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
                      <select class="form-control" v-model="employee.religion" name="religion"   >
                        <option value="Islam"> Islam</option>
                        <option value="Hidoo"> Hidoo</option>
                        <option value="Boddo"> Boddo</option>
                        <option value="Krishtian"> Kristian</option>
                        <option value="Other"> Other</option>
                      </select>
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
                       <textarea name="present_address" v-model="employee.address[0].present_address" placeholder="Present Address"    rows="3" class="form-control ">
                         </textarea>
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
                         <textarea name="permanent_address" v-model="employee.address[0].permanent_address"    placeholder="Permanent Address" rows="3" class="form-control ">
                         </textarea>
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
                          <input readonly type="text" name="major_illness" v-model="employee.major_illness" placeholder="Major Illness" class="form-control"/>
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
                          <input readonly type="text" name="chronic_disease" v-model="employee.chronic_disease" placeholder="Any Chronic Disease" class="form-control"/>
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
                          <input readonly type="text" name="passport_no" v-model="employee.passport_details[0].passport_no" placeholder="Passport Number" class="form-control"/>
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
                          <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="date_of_issue"  v-model="employee.passport_details[0].date_of_issue" placeholder="Date of Issue"></datetime>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-3">
                        <span><b>c.</b></span>
                        <label class="control-label"><b>Place of Issue:</b></label>
                      </div>
                      <div class="col-md-2 col-md-4">
                        <div class="form-group">
                          <input readonly type="text" name="place_of_issue" v-model="employee.passport_details[0].place_of_issue" placeholder="Place of Issue" class="form-control"/>
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
                          <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="date_of_expire"  v-model="employee.passport_details[0].date_of_expire" placeholder="Date of Expire"></datetime>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <span><b>e.</b></span>
                        <label class="control-label"><b>Issuing Auth:</b></label>
                      </div>
                      <div class="col-md-2  col-md-4">
                        <div class="form-group">
                          <input readonly type="text" name="issuing_auth" v-model="employee.passport_details[0].issuing_auth" placeholder="Issuing Auth" class="form-control"/>
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
                          <select class="form-control" readonly name="type_of_passport" v-model="employee.passport_details[0].type_of_passport">
                            <option value="Personal"><b>Personal</b></option>
                            <option value="Official"><b>Official</b></option>
                          </select>
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
                          <input readonly type="text" name="reason_of_obtaining" v-model="employee.passport_details[0].reason_of_obtaining" placeholder="Reason(s) for Obtaining:" class="form-control"/>
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
                      <input readonly type="text" name="tin_number" v-model="employee.tin_number"   placeholder="Designation / Appointment" class="form-control"/>
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
                      <input readonly type="text" name="driving_licence_no" v-model="employee.driving_licence_no" placeholder="Driving Licence Number" class="form-control"/>
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
                          <td><input readonly type="text" class="form-control" name="visited_country" v-model="employee.visited_countries[0].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_from"  v-model="employee.visited_countries[0].visited_date_from" placeholder="From date" ></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_to"  v-model="employee.visited_countries[0].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input readonly type="text" class="form-control" name="reasone_of_visit" v-model="employee.visited_countries[0].reasone_of_visit" placeholder="Reason"/></td>
                        </tr>
                        <!-- ======= Second country ======= -->
                        <tr class="country-visit">
                          <td>2</td>
                          <td><input readonly type="text" class="form-control" name="visited_country" v-model="employee.visited_countries[1].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_from"  v-model="employee.visited_countries[1].visited_date_from" placeholder="From date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_to"  v-model="employee.visited_countries[1].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input readonly type="text" class="form-control" name="reasone_of_visit" v-model="employee.visited_countries[1].reasone_of_visit" placeholder="Reason" /></td>
                        </tr>
                        <!-- ======= third country ======= -->
                        <tr class="country-visit">
                          <td>3</td>
                          <td><input readonly type="text" class="form-control" name="visited_country" v-model="employee.visited_countries[2].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_from"  v-model="employee.visited_countries[2].visited_date_from" placeholder="From date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_to"  v-model="employee.visited_countries[2].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input readonly type="text" class="form-control" name="reasone_of_visit" v-model="employee.visited_countries[2].reasone_of_visit" placeholder="Reason" /></td>
                        </tr>
                        <!-- ======= fourth country ======= -->
                        <tr class="country-visit">
                          <td>4</td>
                          <td><input readonly type="text" class="form-control" name="visited_country" v-model="employee.visited_countries[3].visited_country" placeholder="Country" /></td>
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_from"  v-model="employee.visited_countries[3].visited_date_from" placeholder="From date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="visited_date_to"  v-model="employee.visited_countries[3].visited_date_to" placeholder="To date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td><input readonly type="text" class="form-control" name="reasone_of_visit" v-model="employee.visited_countries[3].reasone_of_visit" placeholder="Reason" /></td>
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
                      <input readonly type="text" name="edu_qualification" v-model="employee.edu_qualification"  placeholder="Educational Qualification:" class="form-control"/>
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
                          <input readonly type="text" name="personal_telephone" v-model="employee.personal_telephone" placeholder="Personal Telephone" class="form-control"/>

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
                          <input readonly type="text" name="official_telephone" v-model="employee.official_telephone" placeholder="Official Telephone" class="form-control"/>
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
                          <input readonly type="text" name="personal_mobile" v-model="employee.personal_mobile"   placeholder="Personal Number" class="form-control"/>
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
                          <input readonly type="text" name="official_mobile" v-model="employee.official_mobile" placeholder="Official Number" class="form-control"/>
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
                          <input readonly type="text" name="email" v-model="employee.email"   placeholder="Email Id" class="form-control"/>
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
                          <input readonly type="text" name="facebook" v-model="employee.facebook" placeholder="Facebook Id" class="form-control"/>

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
                          <input readonly type="text" name="other_electornic_id" v-model="employee.other_electornic_id" placeholder="Any Other Id" class="form-control"/>
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
                            <input readonly type="text" class="form-control" name="father_name" v-model="employee.father_name"   placeholder="Father Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="father_profession" v-model="employee.father_profession"   placeholder="Father Profession" />
                          </td>
                          <td>
                            <input readonly type="number" min="0"  class="form-control" name="father_mobile" v-model="employee.father_mobile"   placeholder="Father Mobile No" />
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
                            <input readonly type="text" class="form-control" name="mother_name" v-model="employee.mother_name"  placeholder="Mother Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="mother_profession" v-model="employee.mother_profession"  placeholder="Mother Profession" />
                          </td>
                          <td>
                            <input readonly type="number" min="0" class="form-control" name="mother_mobile" v-model="employee.mother_mobile"  placeholder="Mother Mobile No" />
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
                            <input readonly type="text" class="form-control" name="spouse1_name" v-model="employee.spouses[0].spouse1_name"  placeholder="First Spouse Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="spouse1_profession" v-model="employee.spouses[0].spouse1_profession"  placeholder="First Spouse Profession" />
                          </td>
                          <td>
                            <input readonly type="number" min="0" onscroll="null" class="form-control" name="spouse1_mobile" v-model="employee.spouses[0].spouse1_mobile" placeholder="First Spouse Mobile No" /></td>
                        </tr>
                        <tr class="country-visit">
                          <td>2</td>
                          <td><input readonly type="text" class="form-control" name="spouse2_name" v-model="employee.spouses[1].spouse2_name"  placeholder="Second Spouse Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="spouse2_profession" v-model="employee.spouses[1].spouse2_profession"  placeholder="Second Spouse Profession" />
                          </td>
                          <td><input readonly type="number" min="0" onscroll="null" class="form-control" name="spouse2_mobile" v-model="employee.spouses[1].spouse2_mobile"  placeholder="Second Spouse Mobile No" />
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
                          <td><input readonly type="text" class="form-control" name="children1_name" v-model="employee.childrenes[0].children1_name" placeholder="First Children Name" /></td>
                          <td>
                            <input readonly type="text" class="form-control" name="children1_profession" v-model="employee.childrenes[0].children1_profession" placeholder="First Children Profession" />
                          </td>
                          <td>
                            <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="children1_dob" v-model="employee.childrenes[0].children1_dob" placeholder="First Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>2</td>
                          <td><input readonly type="text" class="form-control" name="children2_name" v-model="employee.childrenes[1].children2_name" placeholder="Second Children Name" /></td>
                          <td>
                            <input readonly type="text" class="form-control" name="children2_profession" v-model="employee.childrenes[1].children2_profession" placeholder="Second Children Profession" />
                          </td>
                          <td>
                            <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="children2_dob" v-model="employee.childrenes[1].children2_dob" placeholder="Second Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>3</td>
                          <td><input readonly type="text" class="form-control" name="children3_name" v-model="employee.childrenes[2].children3_name" placeholder="Third Children Name" /></td>
                          <td>
                            <input readonly type="text" class="form-control" name="children3_profession" v-model="employee.childrenes[2].children3_profession" placeholder="Third Children Profession" />
                          </td>
                          <td>
                            <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="children3_dob" v-model="employee.childrenes[2].children3_dob" placeholder="Third Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>4</td>
                          <td><input readonly type="text" class="form-control" name="children4_name" v-model="employee.childrenes[3].children4_name" placeholder="Fourth Children Name" /></td>
                          <td>
                            <input readonly type="text" class="form-control" name="children4_profession" v-model="employee.childrenes[3].children4_profession" placeholder="Fourth Children Profession" />
                          </td>
                          <td>
                            <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="children4_dob"  v-model="employee.childrenes[3].children4_dob" placeholder="Forth Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>5</td>
                          <td><input readonly type="text" class="form-control" name="children5_name" v-model="employee.childrenes[4].children5_name" placeholder="Fifth Children Name" /></td>
                          <td>
                            <input readonly type="text" class="form-control" name="children5_profession" v-model="employee.childrenes[4].children5_profession" placeholder="Fifth Children Profession" />
                          </td>
                          <td>
                            <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="children5_dob"  v-model="employee.childrenes[4].children5_dob" placeholder="Fifth Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>6</td>
                          <td><input readonly type="text" class="form-control" name="children6_name" v-model="employee.childrenes[5].children6_name" placeholder="Six Children Name" /></td>
                          <td>
                            <input readonly type="text" class="form-control" name="children6_profession" v-model="employee.childrenes[5].children6_profession" placeholder="Six Children Profession" />
                          </td>
                          <td>
                            <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="children6_dob"  v-model="employee.childrenes[5].children6_dob" placeholder="Sic Children Date of Birth"></datetime>
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>7</td>
                          <td><input readonly type="text" class="form-control" name="children7_name" v-model="employee.childrenes[6].children7_name" placeholder="Seven Children Name" /></td>
                          <td>
                            <input readonly type="text" class="form-control" name="children7_profession" v-model="employee.childrenes[6].children7_profession" placeholder="Seven Children Profession" />
                          </td>
                          <td>
                            <datetime readonly type="date" format="dd-MM-yyyy" input-class="form-control" name="children7_dob"  v-model="employee.childrenes[6].children7_dob" placeholder="Seven Children Date of Birth"></datetime>
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
                            <input readonly type="text" class="form-control" name="nominee1_name" v-model="employee.nominees[0].nominee1_name"  placeholder="Nominee Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee1_religion" v-model="employee.nominees[0].nominee1_religion"  placeholder="Religion" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee1_nid" v-model="employee.nominees[0].nominee1_nid"   placeholder="National Id"/>

                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee1_percentage" v-model="employee.nominees[0].nominee1_percentage"   placeholder="Nominee Percentage" />
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>2</td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee2_name" v-model="employee.nominees[1].nominee2_name"   placeholder="Nominee Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee2_religion" v-model="employee.nominees[1].nominee2_religion"   placeholder="Religion" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee2_nid" v-model="employee.nominees[1].nominee2_nid"   placeholder="National Id"/>
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee2_percentage" v-model="employee.nominees[1].nominee2_percentage"   placeholder="Nominee Percentage" />
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>3</td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee3_name" v-model="employee.nominees[2].nominee3_name" placeholder="Nominee Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee3_religion" v-model="employee.nominees[2].nominee3_religion" placeholder="Religion" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee3_nid" v-model="employee.nominees[2].nominee3_nid" placeholder="National Id"/>
                            <span v-show="errors.has('nominee3_nid')" class="help text-danger">{{ errors.first('nominee3_nid') }}</span>
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee3_percentage" v-model="employee.nominees[2].nominee3_percentage" placeholder="Nominee Percentage" />
                          </td>
                        </tr>
                        <tr class="country-visit">
                          <td>4</td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee4_name" v-model="employee.nominees[3].nominee4_name" placeholder="Nominee Name" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee4_religion" v-model="employee.nominees[3].nominee4_religion" placeholder="Religion" />
                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee4_nid" v-model="employee.nominees[3].nominee4_nid" placeholder="National Id"/>

                          </td>
                          <td>
                            <input readonly type="text" class="form-control" name="nominee4_percentage" v-model="employee.nominees[3].nominee4_percentage" placeholder="Nominee Percentage" />
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
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service1_date_from"  v-model="employee.service_record[0].service1_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service1_date_to"  v-model="employee.service_record[0].service1_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" name="regiment1" v-model="employee.service_record[0].location1" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" name="ervice_appoinment" v-model="employee.service_record[0].service1_appoinment" /></td>
                        </tr>
                        <!-- service 2-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service2_date_from"  v-model="employee.service_record[1].service2_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service2_date_to"  v-model="employee.service_record[1].service2_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" name="regiment1" v-model="employee.service_record[1].location2" >
                              <option v-for="(regiment, index) in regiments"  v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" name="ervice_appoinment" v-model="employee.service_record[1].service2_appoinment" /></td>
                        </tr>
                        <!-- service 3-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service3_date_from"  v-model="employee.service_record[2].service3_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service3_date_to"  v-model="employee.service_record[2].service3_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" name="regiment1" v-model="employee.service_record[2].location3" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" name="ervice_appoinment" v-model="employee.service_record[2].service3_appoinment" /></td>
                        </tr>
                        <!-- service 4-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service4_date_from"  v-model="employee.service_record[3].service4_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service4_date_to"  v-model="employee.service_record[3].service4_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" name="regiment1" v-model="employee.service_record[3].location4" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" name="ervice_appoinment" v-model="employee.service_record[3].service4_appoinment" /></td>
                        </tr>
                        <!-- service 5-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service5_date_from"  v-model="employee.service_record[4].service5_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service5_date_to"  v-model="employee.service_record[4].service5_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" name="regiment1" v-model="employee.service_record[4].location5" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" name="ervice_appoinment" v-model="employee.service_record[4].service5_appoinment" /></td>
                        </tr>
                        <!-- service 6-->
                        <tr class="country-visit">
                          <td>
                            <div class="row duration">
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service6_date_from"  v-model="employee.service_record[5].service6_date_from" placeholder="Date"></datetime>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <datetime type="date" format="dd-MM-yyyy" input-class="form-control" name="service6_date_to"  v-model="employee.service_record[5].service6_date_to" placeholder="Date"></datetime>
                              </div>
                            </div>
                          </td>
                          <td>
                            <select class="form-control" name="regiment1" v-model="employee.service_record[5].location6" >
                              <option v-for="(regiment, index) in regiments" v-bind:value="regiment.name" :key="index" >{{regiment.name}}</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" class="form-control" name="ervice_appoinment" v-model="employee.service_record[5].service6_appoinment" /></td>
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
                      <input type="text" class="form-control" v-model="employee.special_skill" name="specila_skill"  placeholder="Enter Special Skill (optional)" />
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
                      <textarea name="punishment" v-model="employee.punishment" placeholder="Enter Punishment(optional)" rows="3" class="form-control ">
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
  export default {
    name: 'employee',
    data () {
      return {
        serviceIdExist: '',
        nidExist: '',
        employee: {
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
          status: ''
        },
        ranks: '',
        districts: '',
        salaryGrades: '',
        salarySteps: '',
        regiments: '',
        photoUrl: '',
        photo: '',
        baseUrl: this.$baseUrl
      }
    },
    mounted () {
      this.getDropDownData()
      this.getEmployeeData()
    },
    methods: {
      async getEmployeeData () {
        const response = await EmployeeService.show({
          id: this.$route.params.id
        })
        this.employee = response.data
        this.photo=response.data.photo
        this.employee.id = this.$route.params.id

      },
      async getDropDownData () {
        const ranks = await RankService.activeRanks()
        this.ranks = ranks.data
        const districts = await DistrictsService.activeDistricts()
        this.districts=districts.data
        const salaryGrades = await SalaryGradeService.activeSalaryGrades()
        this.salaryGrades=salaryGrades.data
        const salarySteps = await SalaryStepService.activeSalarySteps()
        this.salarySteps=salarySteps.data
        const regiments = await RegimentService.activeRegiments()
        this.regiments=regiments.data
      }
    }
  }
</script>
<style media="print">
  @media print {
    .saveEmployee{
      margin-right: 10px;
    }
    .saveEmployee {
      border: none;
    }

    #printThis{
      width: 100%;
    }
    #saveEmployee>.personal-data .row{
      margin-right: 5px;
      margin-left: 5px;
      padding-top: 2px;
      padding-bottom: 2px;
      border: 1px solid;
      page-break-inside: avoid;
    }

    .col-md-4,.col-md-3{
      width: 30%;
    }
    .col-md-8,.col-md-9{
      width: 70%;
    }
    ::placeholder { /* Chrome/Opera/Safari */
      visibility: hidden;

    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: transparent;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: transparent;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: transparent;
    }
    .personal-data .form-control{

    }
  }


</style>

