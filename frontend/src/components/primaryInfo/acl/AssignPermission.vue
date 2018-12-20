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
            <input type="hidden" name="role_id" value="1">
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <legend> Permission  </legend>
                  <div id="treeview_container" class="hummingbird-treeview well h-scroll-large">
                    <ul id="treeview" class="hummingbird-base row">
                      <li class="col-md-6" v-for="(res, index) in permissions" :key="index"><i class="fa fa-arrow-right"></i> <label> <input :id="['node' + index]" data-id="custom-1" type="checkbox" @click="resClick(res.slug,'node' + index)" :value="res.slug" v-model="resources"> {{res.name}} </label>
                        <ul class="sub-permission" >
                          <li v-for="(meth, ind) in res.methods" :key="ind"><label> <input :class="['node' + index]" :id="['node' + index + '-' + ind]" :value="meth" type="checkbox" @click="methClick(res.slug, meth, 'node' + index + '-' + ind)" v-model="methods[res.slug]">  {{meth}} </label></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                {{methods}}
                <br>
                <button type="submit" @click="store()" class="btn btn-success">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PermissionRoleService from '@/services/PermissionRoleService'
import $ from 'jquery'
export default {
  name: 'AssignPermission',
  data () {
    return {
      allData: [],
      methods: '',
      resources: [],
      newData: [],
      permissions: [],
      acl: {
        role: '',
        permissions: ''
      }
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
      this.acl.role = response.data.group
      let perm = []
      let res = []
      this.allData.permissions.forEach(function (data, i) {
        let abc = []
        res.push(data.resource)
        abc.push(data.resource[data.methods])
        // abc[data.resource].push(data.methods)
        perm.push(abc)
      })
      this.methods = perm
      this.resources = res
    },
    async store () {
      this.acl.permissions = this.methods
      this.methods.forEach(function (meth, i) {
        meth.forEach(function (met, ii) {
          console.log(met)
        })
      })
      await PermissionRoleService.store(this.acl).then(res => {
        console.log(res.data)
      })
      this.$swal({
        type: 'success',
        title: 'Data Successfully Added',
        showConfirmButton: false,
        timer: 1500
      })
    },
    resClick (resource, id) {
      let perm = {
        resource: resource,
        methods: []
      }
      if ($('#' + id).is(':checked')) {
        $('.' + id).each(function () {
          perm.methods.push($(this).val())
        })
        this.methods[resource] = perm.methods
      } else {
        this.methods[resource] = []
      }
    },
    methClick (resource, meth, id) {
      if ($('#' + id).is(':checked')) {
        this.methods[resource].push(meth)
        let flug = 0
        this.acl.permissions.forEach(nm => {
          if (nm.resource === resource) {
            flug = 1
            nm.methods.push(meth)
          }
        })
        if (flug === 0) {
          let perm = {
            resource: resource,
            methods: [meth]
          }
          this.acl.permissions.push(perm)
        }
      } else {
        this.acl.permissions.forEach(nm => {
          if (nm.resource === resource) {
            var i = nm.methods.indexOf(meth)
            nm.methods.splice(i, 1)
          }
        })
      }
    }
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
        let i = 0
        for (i = 0; i < newData[slug].length; i++) {
          if (newData[slug][i] === meth) {
            return true
          }
        }
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
