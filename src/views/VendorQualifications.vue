<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type { VendorQualifications } from '@/models/vendorQualifications';
import type { Page } from '@/models/page';
import { useApiVendorQualificationsUrl } from '@/composables/useApiEndpoint';

const vendorQualifications = ref<Array<VendorQualifications>>([])

onMounted(() => {
  fetch(useApiVendorQualificationsUrl())
    .then(response => response.json())
    .then((data: Page<VendorQualifications>) => {
      vendorQualifications.value = data.items
    })
})
</script>

<template>
    <div class="content">
      <h1>Kwalificaties</h1>
      <br>
      <table>
        <tr>
          <th>Zorgaanbieder</th>
          <th>Applicatie</th>
          <th>Applicatie versie</th>
          <th>Systeem type</th>
          <th>role</th>
          <th>Kwalificatie datum</th>
          <th>protocol</th>
          <th>protocol versie</th>
        </tr>
        <tr v-for="qualification in vendorQualifications">
            <td><RouterLink :to="{ name: 'vendor', params: { id: qualification.vendorId } }">{{ qualification.vendorName }}</RouterLink></td>
            <td>{{ qualification.applicationName }}</td>
            <td>{{ qualification.version }}</td>
            <td>{{ qualification.systemType }}</td>
            <td>{{ qualification.role }}</td>
            <td>{{ qualification.qualificationDate }}</td>
            <td>{{ qualification.protocolName }}</td>
            <td>{{ qualification.protocolVersion }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <style>
  .content {
    position: absolute;
    top: 120px;
    left: 50%;
    margin-left: -750px;
    width: 1500px;
    height: 200px;
    text-align: center;
  }
  table {
    margin-left: auto;
    margin-right: auto;
  }
  </style>
  