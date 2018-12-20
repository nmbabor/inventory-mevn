<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            Add New Role
            <div class="card-btn pull-right">
              <router-link tag="a" to="/roles" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-block">
            <div class="j-wrapper j-wrapper-640">
              <div class="j-pro" id="j-pro">
                <div class="j-content">
                  <div class="j-row">
                    <div class="j-span6 j-unit">
                      <label class="j-label">Role Name</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="name">
                          <i class="fa fa-folder"></i>
                        </label>
                        <input type="text" required id="name" v-model="form.name" value="">
                        <span class="j-tooltip j-tooltip-right-top">Role Name</span>
                      </div>
                    </div>
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
import RoleService from '@/services/RoleService'
export default {
  name: 'Module',
  data () {
    return {
      form: {
        name: '',
        slug: ''
      }
    }
  },
  mounted () {

  },
  methods: {

    async store () {
      await RoleService.store(this.form)
      this.$swal({
        type: 'success',
        title: 'Data Successfully Added',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({path: '/roles'})
    }
  }
}
</script>
<style></style>
