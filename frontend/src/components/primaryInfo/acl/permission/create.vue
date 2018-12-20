<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            Add New Permission
            <div class="card-btn pull-right">
              <router-link tag="a" to="/permissions" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-block">
            <div class="j-wrapper j-wrapper-640">
              <div class="j-pro" id="j-pro">
                <div class="j-content">
                  <!-- start name -->
                  <div class="j-row">
                    <div class="j-unit j-span6">
                      <label class="j-label">Permission Name</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="name">
                          <i class="fa fa-folder"></i>
                        </label>
                        <input type="text" required id="name" v-model="form.name" value="">
                        <span class="j-tooltip j-tooltip-right-top">Permission Name</span>
                      </div>
                    </div>
                    <div class="j-span6 j-unit">
                      <label class="j-label">Type</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="method">
                          <i class="fa fa-caret-down"></i>
                        </label>
                        <select id="method" class="select" v-model="form.type" required>
                          <option value="1" >  Resource </option>
                          <option value="0"> Normal </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- end name -->
                  <!-- start email phone -->
                  <div class="j-row">
                    <div class="j-span6 j-unit">
                      <label class="j-label">Slug</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="url">
                          <i class="fa fa-link"></i>
                        </label>
                        <input type="text" placeholder="/" required id="url" v-model="form.slug" value="">
                        <span class="j-tooltip j-tooltip-right-top">Slug</span>
                      </div>
                    </div>
                    <div class="j-span6 j-unit">
                      <label class="j-label">Status</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="status">
                          <i class="fa fa-caret-down"></i>
                        </label>
                        <select id="status" v-model="form.status" required>
                          <option value="1" >  Active </option>
                          <option value="2"> Inactive </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end /.content -->
                <div class="j-footer">
                  <button @click="store" class="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PermissionService from '@/services/PermissionService'
export default {
  name: 'PermissionCreate',
  data () {
    return {
      form: {
        name: '',
        slug: '',
        type: 1,
        status: 1
      }
    }
  },
  mounted () {

  },
  methods: {

    async store () {
      await PermissionService.store(this.form)
      this.$swal({
        type: 'success',
        title: 'Data Successfully Added',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({path: '/permissions'})
    }
  }
}
</script>
<style></style>
