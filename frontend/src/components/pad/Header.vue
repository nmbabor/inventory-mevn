<template>
<div class="invoice_top " style="text-align:center;width: 100%;display:block;border-bottom:1px solid #ddd;padding: 10px 20px;background: #f1f1f1">

  <div class="view_logo" style="width: 100%;text-align: center;position: relative;top:10px;">
    <div class="pad_top_content" style="display: inline-block;text-align: left">
      <h3 style="margin: 0;margin-left: 20px;display: inline-block;"><img class="print-logo" :src="info.logo" style="width:180px;height:auto;"><!-- <strong> {{info.company_name}} </strong> --></h3>
      <p style="margin: 0;margin-left: 20px;font-size: 13px;"> {{info.address}} <br />
        Phone: {{info.mobile}}, Email: {{info.email}} </p>
    </div>
  </div>
</div>
</template>
<style>
  @media print {
    .table.min-padding-table td, .table.min-padding-table th {
      font-size: 13px;
      page-break-inside: avoid;
    }
    .no-print{display: none;}
    a[href]:after {
      content: none !important;
    }
  }
</style>
<script>
import FrontendService from '@/services/FrontendService'
export default {
  data() {
    return {
      info:{
        company_name: 'Leam ERP'
      }
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      let information = await FrontendService.info();
      this.info = information.data
      this.info.logo = this.$baseUrl+this.info.logo
    }
  }
}
</script>
