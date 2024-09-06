<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from "vue-router";
import type { HealthcareProviderQualifications } from '@/models/healthcareProviderQualifications';
import { type Page } from "@/models/page"
import { useApiHealthcareProviderQualificationsUrl } from "@/composables/useApiEndpoint";
import Pagination from '@/components/Pagination.vue';


const qualifications = ref<Page<HealthcareProviderQualifications>>()
const limit = ref<number>(10);
const offset = ref<number>(0);
onMounted(() => fetchHealthcareProviderQualifications(limit.value, offset.value));

const fetchHealthcareProviderQualifications = (limit: number, offset: number) => {
  fetch(useApiHealthcareProviderQualificationsUrl(limit, offset))
    .then(response => response.json())
    .then((data: Page<HealthcareProviderQualifications>) => {
    
      qualifications.value = {
        ...data,
      }
    })}
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
      <tr v-for="qualification in qualifications?.items">
        <td>
          <RouterLink :to="{ name: 'healthcare-provider', params: { id: qualification.healthcareProviderId } }">{{
            qualification.healthcareProvider }}</RouterLink>
        </td>
        <td>{{ qualification.protocol }}</td>
        <td>{{ qualification.protocolType }}</td>
        <td>{{ qualification.protocolVersion }}</td>
        <td>{{ qualification.qualificationDate }}</td>
      </tr>
    </table>
    <div>
      <Pagination v-if="qualifications" :limit="limit" :offset="offset"  :total-items="qualifications?.total" @update-data="fetchHealthcareProviderQualifications" />
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