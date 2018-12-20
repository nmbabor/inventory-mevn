<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            Edit Roles
            <div class="card-btn pull-right">
              <router-link tag="a" to="/roles" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-block">
            <div class="j-wrapper j-wrapper-640">
              <div class="j-pro" id="j-pro">
                <div class="j-content">
                  <!-- start name -->
                  <div class="j-unit">
                    <label class="j-label">Role Name</label>
                    <div class="j-input">
                      <label class="j-icon-right" for="name">
                        <i class="fa fa-folder"></i>
                      </label>
                      <input type="text" required id="name" v-model="form.name" value="">
                      <span class="j-tooltip j-tooltip-right-top">Role Name</span>
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
                  <button @click="update" class="btn btn-primary">Save change</button>
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
  name: 'editRole',
  data () {
    return {
      form: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await RoleService.show({
        id: this.$route.params.id
      })
      this.form = response.data
      this.form.id = this.$route.params.id
    },
    async update () {
      await RoleService.update(this.form)
      this.$swal({
        type: 'success',
        title: 'Data Successfully Updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({ name: 'roles' })
    }
  }
}
</script>
<style></style>
