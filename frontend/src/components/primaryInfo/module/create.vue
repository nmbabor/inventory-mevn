<template>
  <div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header card-info">
            Add New Module
            <div class="card-btn pull-right">
              <router-link tag="a" to="/module" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View All</router-link>
            </div>
          </div>
          <div class="card-block">
            <div class="j-wrapper j-wrapper-640">
              <div class="j-pro" id="j-pro">
                <div class="j-content">
                  <!-- start name -->
                  <div class="j-unit">
                    <label class="j-label">Module Name</label>
                    <div class="j-input">
                      <label class="j-icon-right" for="name">
                        <i class="fa fa-folder"></i>
                      </label>
                      <input type="text" required id="name" v-model="name" value="">
                      <span class="j-tooltip j-tooltip-right-top">Module Name</span>
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
                        <input type="text" placeholder="/" required id="url" v-model="url" value="">
                        <span class="j-tooltip j-tooltip-right-top">URL</span>
                      </div>
                    </div>
                    <div class="j-span6 j-unit">
                      <label class="j-label">Icon Class</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="icon_class">
                          <i class="fa fa-folder-o"></i>
                        </label>
                        <input type="text" id="icon_class" placeholder="Ex: fa fa-folder" v-model="icon_class">
                        <span class="j-tooltip j-tooltip-right-top">Icon Class</span>
                      </div>
                    </div>
                  </div>
                  <!-- start password  -->
                  <div class="j-row">
                    <div class="j-span6 j-unit">
                      <label class="j-label">Serial Number</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="serial_num">
                          <i class="fa fa-sort-numeric-asc"></i>
                        </label>
                        <input type="number" required id="serial_num" v-model="serial_num">
                        <span class="j-tooltip j-tooltip-right-top">Serial Number</span>
                      </div>
                    </div>
                    <div class="j-span6 j-unit">
                      <label class="j-label">Type</label>
                      <div class="j-input">
                        <label class="j-icon-right" for="type">
                          <i class="fa fa-caret-down"></i>
                        </label>
                        <select id="type" v-model="type" required>
                          <option value="1" > Module </option>
                          <option value="2"> Main Menu </option>

                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="j-unit">
                    <label class="j-label">Permissions</label>
                    <div class="j-input">
                      <label class="j-icon-right" >
                        <i class="icofont icofont-location-pin"></i>
                      </label>
                      <v-select multiple placeholder="Select Option" v-model="slug" :options="permissions"></v-select>
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
import ModuleService from '@/services/ModuleService'
import vSelect from 'vue-select'
export default {
  name: 'Module',
  data () {
    return {
      name: '',
      url: '',
      status: '',
      type: 1,
      serial_num: '',
      slug: '',
      icon_class: '',
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
      const response = await ModuleService.serial()
      this.serial_num = response.data.serial
      const perm = await ModuleService.permission()
      this.permissions = perm.data
    },
    async store () {
      await ModuleService.store({
        name: this.name,
        url: this.url,
        type: this.type,
        serial_num: this.serial_num,
        slug: this.slug,
        icon_class: this.icon_class
      })
      this.$swal({
        type: 'success',
        title: 'Data Successfully Added',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push({path: '/module'})
    }
  }
}
</script>
<style></style>
