<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type { VendorQualification } from '@/models/vendorQualification';
import type { Page } from '@/models/page';
import { useApiVendorQualificationsUrl } from '@/composables/useApiEndpoint';

const vendorQualifications = ref<Array<VendorQualification>>([])

onMounted(() => {
  fetch(useApiVendorQualificationsUrl())
    .then(response => response.json())
    .then((data: Page<VendorQualification>) => {
      vendorQualifications.value = data.items
    })
})
</script>

<template>
    <div class="content">
      <h1>Leveranciers Kwalificaties</h1>
      <br>
      <table>
        <tr>
          <th>Leverancier</th>
          <th>Applicatie</th>
          <th>Applicatie versie</th>
          <th>Systeem type</th>
          <th>role</th>
          <th>Kwalificatie datum</th>
          <th>protocol</th>
          <th>protocol versie</th>
        </tr>
        <tr v-for="qualification in vendorQualifications">
            <td><RouterLink :to="{ name: 'vendor', params: { id: qualification.vendorId } }">{{ qualification.tradeName }}</RouterLink></td>
            <td><RouterLink :to="{name: 'application', params: { id: qualification.applicationId }}">{{ qualification.application }}</RouterLink></td>
            <td>{{ qualification.applicationVersion }}</td>
            <td><RouterLink :to="{ name: 'system-type', params: { id: qualification.systemTypeId } }">{{ qualification.systemType }}</RouterLink></td>
            <td><RouterLink :to="{ name: 'role', params: { id: qualification.roleId } }">{{ qualification.role }}</RouterLink></td>
            <td>{{ qualification.qualificationDate }}</td>
            <td>{{ qualification.protocol }}</td>
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
  