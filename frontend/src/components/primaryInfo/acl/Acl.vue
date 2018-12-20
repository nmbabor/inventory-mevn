<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-info">
            Permission assign to {{allData.group}}
            <div class="card-btn pull-right">
              <router-link tag="a" to="/roles" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> Roles </router-link>
            </div>
          </div>
          <div class="card-body">
            <form id="inputForm"  @submit.prevent="store">
            <input type="hidden" name="group" :value="allData.group">
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <legend> Permission  </legend>
                  <div id="treeview_container" class="hummingbird-treeview well h-scroll-large">
                    <ul id="treeview" class="hummingbird-base row">
                      <li class="col-md-4" v-for="(res, index) in permissions" :key="index">
                        <div class="li-class">
                          <i class="fa fa-arrow-right"></i> <label style="margin-bottom: 0"> <input :id="['node' + index]" data-id="custom-1" :checked="res.slug | ifInArray(allData.permissions)" type="checkbox" @click="resClick(res.slug,'node' + index)" :value="res.slug" name="resource"> {{res.name}} </label>
                          <ul class="sub-permission" >
                            <li v-for="(meth, ind) in res.methods" :key="ind"><label style="font-size: 10px"> <input :class="['node' + index]" :id="['node' + index + '-' + ind]" :value="meth" type="checkbox" :checked="meth | ifInArrayMeth(res.slug, allData.permissions)" :name="'methods_'+res.slug">{{meth}}</label></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <br>
                <button type="submit" class="btn btn-success">Submit</button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PermissionRoleService from '@/services/PermissionRoleService'
export default {
  name: 'AssignPermission',
  data () {
    return {
      allData: [],
      permissions: [],
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const response = await PermissionRoleService.show(this.$route.params.id)
      const permissions = await PermissionRoleService.permissions()
      this.allData = response.data
      this.permissions = permissions.data
    },
    async store () {
      let form = document.getElementById('inputForm');
      let formData = new FormData(form);
      await PermissionRoleService.store(formData).then(res => {
        this.$swal({
          type: 'success',
          title: 'Data Successfully Added',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    resClick (resource, id) {
      if ($('#' + id).is(':checked')) {
        $('.' + id).each(function () {
          $(this).prop('checked',true)
        })
      } else {
        $('.' + id).each(function () {
          $(this).prop('checked',false)
        })
      }
    },
  },
  filters: {
    ifInArray: function (value, newData) {
      if (newData[value]) {
        return true
      } else {
        return false
      }
    },
    ifInArrayMeth: function (meth, slug, newData) {
      if (newData[slug]) {
        return newData[slug].includes(meth);
      }
      return false
    }
  }
}
</script>
<style>
  .sub-permission{display: block;overflow: hidden}
  .sub-permission li{float: left; margin: 2px; border: 1px solid #ddd; padding: 0 5px;}
  .sub-permission li label{margin: 0;}
</style>
