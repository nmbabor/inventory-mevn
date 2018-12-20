<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            Add New Sub Menu of {{menu.name}}
            <div class="card-btn pull-right">
              <router-link tag="a" v-bind:to="{ name: 'subMenu', params: { id: menu._id } }" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All Sub Menu</router-link>
            </div>
          </div>
          <div class="card-block">
            <div class="j-wrapper j-wrapper-640">
              <div class="j-pro" id="j-pro">
                <div class="j-content">
                  <!-- start name -->
                  <div class="j-unit">
                    <label class="j-label">Name</label>
                    <div class="j-input">
                      <label class="j-icon-right" for="name">
                        <i class="fa fa-folder"></i>
                      </label>
                      <input type="text" required id="name" v-model="form.name" value="">
                      <span class="j-tooltip j-tooltip-right-top">Sub Menu Name</span>
                    </div>
                  </div>
                  <!-- end name -->
                  <!-- start email phone -->
                  <div class="j-row">
                    <div class="j-span6 j-unit">
                      <label class="j-label">URL</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="url">
                          <i class="fa fa-link"></i>
                        </label>
                        <input type="text" placeholder="/" required id="url" v-model="form.url" value="">
                        <span class="j-tooltip j-tooltip-right-top">URL</span>
                      </div>
                    </div>
                    <div class="j-span6 j-unit">
                      <label class="j-label">Serial Number</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="serial_num">
                          <i class="fa fa-sort-numeric-asc"></i>
                        </label>
                        <input type="number" required id="serial_num" v-model="form.serial_num">
                        <span class="j-tooltip j-tooltip-right-top">Serial Number</span>
                      </div>
                    </div>
                  </div>

                  <div class="j-unit">
                    <label class="j-label">Permissions</label>
                    <div class="j-input">
                      <label class="j-icon-right" >
                        <i class="icofont icofont-location-pin"></i>
                      </label>
                      <v-select multiple placeholder="Select Option" v-model="form.slug" :options="permissions"></v-select>
                      <span class="j-tooltip j-tooltip-right-top">Permissions</span>
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
import SubMenuService from '@/services/SubMenuService'
import ModuleService from '@/services/ModuleService'
import vSelect from 'vue-select'
export default {
  name: 'SubMenuCreate',
  data () {
    return {
      form: {
        name: '',
        url: '',
        serial_num: '',
        slug: ''
      },
      menu: [],
      permissions: []
    }
  },
  mounted () {
    this.serial()
  },
  components: {
    'v-select': vSelect
  },
  methods: {
    async serial () {
      let id = this.$route.params.menu_id
      const response = await SubMenuService.serial(id)
      this.form.serial_num = response.data.serial
      const result = await SubMenuService.menu(id)
      this.form.menu_id = id
      this.menu = result.data.data
      const perm = await ModuleService.permission()
      this.permissions = perm.data
    },
    async store () {
      await SubMenuService.store(this.form)
      this.$swal({
        type: 'success',
        title: 'Data Successfully Added',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({path: '/sub-menu/' + this.$route.params.menu_id})
    }
  }
}
</script>
<style></style>
