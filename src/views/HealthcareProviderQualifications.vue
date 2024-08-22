<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type { HealthcareProviderQualifications } from '@/models/healthcareProviderQualifications';
import type {Page} from "@/models/page"
import {useApiHealthcareProviderQualificationsUrl} from "@/composables/useApiEndpoint";

const healthcareProviderQualifications = ref<Array<HealthcareProviderQualifications>>([])

onMounted(() => {
  fetch(useApiHealthcareProviderQualificationsUrl())
    .then(response => response.json())
    .then((data: Page<HealthcareProviderQualifications>) => {
        healthcareProviderQualifications.value = data.items
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
          <th>Protocol</th>
          <th>Protocol Versie</th>
          <th>Applicatie</th>
          <th>Applicatie Versie</th>
          <th>Kwalificatie datum</th>
        </tr>
        <tr v-for="qualification in healthcareProviderQualifications">
          <td>{{ qualification.providerName }}</td>
          <td>{{ qualification.protocol }}</td>
          <td>{{ qualification.protocolVersion }}</td>
          <td>{{ qualification.applicationName }}</td>
          <td>{{ qualification.applicationVersion }}</td>
          <td>{{ qualification.qualificationDate }}</td>
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
  