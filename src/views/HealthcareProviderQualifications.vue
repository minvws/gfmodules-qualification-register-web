<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from "vue-router";
import type { HealthcareProviderQualifications } from '@/models/healthcareProviderQualifications';
import { type Pagination as IPagination, paginationService, type Page } from "@/models/page"
import { useApiHealthcareProviderQualificationsUrl } from "@/composables/useApiEndpoint";
import Pagination from '@/components/Pagination.vue';


const pageData = ref<IPagination<HealthcareProviderQualifications>>()
const limit = ref<number>(10);
const offset = ref<number>(0);
onMounted(() => fetchHealthcareProviderQualifications(limit.value, offset.value));

const fetchHealthcareProviderQualifications = (limit: number, offset: number) => {
  fetch(useApiHealthcareProviderQualificationsUrl(limit, offset))
    .then(response => response.json())
    .then((data: Page<HealthcareProviderQualifications>) => {
      const totalPages = paginationService.totalPages(data.limit, data.offset);
      const pageNumber = paginationService.pageNumber(data.limit, data.offset)
      const hasPrevousPage = paginationService.hasPreviousPage(pageNumber);
      const hasNextPage = paginationService.hasNextPage(pageNumber, totalPages);
      pageData.value = {
        ...data,
        totalPages: totalPages,
        pageNumber: pageNumber,
        hasPreviousPage: hasPrevousPage,
        hasNextPage: hasNextPage
      }
    })
}

const nextPage = () => {
  offset.value = offset.value + limit.value;
  fetchHealthcareProviderQualifications(limit.value, offset.value)

}

const previousPage = () => {
  offset.value = offset.value - limit.value;
  fetchHealthcareProviderQualifications(limit.value, offset.value);
}
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
      <tr v-for="qualification in pageData?.items">
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
      <Pagination :limit="pageData?.limit" :offset="pageData?.offset" :total-pages="pageData?.totalPages"
        :page-number="pageData?.pageNumber" @previous-page="previousPage" @next-page="nextPage" :has-previous-page="pageData?.hasPreviousPage" :has-next-page="pageData?.hasNextPage"/>
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