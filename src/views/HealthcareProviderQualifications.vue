<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type { HealthcareProviderQualifications } from '@/models/healthcareProviderQualifications';
import {type Pagination as IPagination, paginationService, type Page} from "@/models/page"
import {useApiHealthcareProviderQualificationsUrl} from "@/composables/useApiEndpoint";
import Pagination  from '@/components/Pagination.vue';

const healthcareProviderQualifications = ref<Array<HealthcareProviderQualifications>>([])
const pageData = ref<IPagination | null>()
onMounted(() => {
  fetch(useApiHealthcareProviderQualificationsUrl())
    .then(response => response.json())
    .then((data: Page<HealthcareProviderQualifications>) => {
        healthcareProviderQualifications.value = data.items;
        
        const totalPages = paginationService.totalPages(data.limit, data.offset);
        const pageNumber = paginationService.pageNumber(data.limit, data.offset)
        const hasPrevousPage = paginationService.hasPreviousPage(pageNumber);
        const hasNextPage = paginationService.hasNextPage(pageNumber, totalPages);
  
        pageData.value = {
          ...data,
          totalPages: totalPages,
          pageNumber: pageNumber,
          hasNextPage: hasNextPage,
          hasPrevousPage: hasPrevousPage
        }
    }).then(() => {
      console.log(pageData.value)
    })
})

</script>

<template>
    <div class="content">
      <h1>Zorgaanbieder Kwalificaties</h1>
      <br>
      <table>
        <tr>
          <th>Zorgaanbieder</th>
          <th>Protocol</th>
          <th>Protocol Type</th>
          <th>Protocol Versie</th>
          <th>Kwalificatie datum</th>
        </tr>
        <tr v-for="qualification in healthcareProviderQualifications">
          <td><RouterLink :to="{ name: 'healthcare-provider', params: {id : qualification.healthcareProviderId} }">{{ qualification.healthcareProvider }}</RouterLink></td>
          <td>{{ qualification.protocol }}</td>
          <td>{{ qualification.protocolType  }}</td>
          <td>{{ qualification.protocolVersion }}</td>
          <td>{{ qualification.qualificationDate  }}</td>
        </tr>
      </table>
      <div>
        <Pagination />
      </div>
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
  