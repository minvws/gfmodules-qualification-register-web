<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from "vue-router";
import type { VendorQualification } from '@/models/vendorQualification';
import { type Pagination as IPagination, type Page, paginationService } from '@/models/page';
import { useApiVendorQualificationsUrl } from '@/composables/useApiEndpoint';
import Pagination from '@/components/Pagination.vue';

const pageData = ref<IPagination<VendorQualification>>()
const limit = ref<number>(10);
const offset = ref<number>(0);
onMounted(() => fetchVendorQualification(limit.value, offset.value));

const fetchVendorQualification = (limit: number, offset: number) => {
  fetch(useApiVendorQualificationsUrl(limit, offset))
    .then(response => response.json())
    .then((data: Page<VendorQualification>) => {
      const totalPages = paginationService.totalPages(data.limit, data.total);
      const pageNumber = paginationService.pageNumber(limit, offset);
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
  fetchVendorQualification(limit.value, offset.value)

}

const previousPage = () => {
  offset.value = offset.value - limit.value;
  fetchVendorQualification(limit.value, offset.value);
}

const selectPage = (selectedPage: number) => {
  console.log(selectedPage)
  offset.value = selectedPage * limit.value;
  fetchVendorQualification(limit.value, offset.value);
}

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
      <tr v-for="qualification in pageData?.items" :key="qualification.qualificationId">
        <td>
          <RouterLink :to="{ name: 'vendor', params: { id: qualification.vendorId } }">{{ qualification.tradeName }}
          </RouterLink>
        </td>
        <td>
          <RouterLink :to="{ name: 'application', params: { id: qualification.applicationId } }">{{
            qualification.application }}</RouterLink>
        </td>
        <td>{{ qualification.applicationVersion }}</td>
        <td>
          <RouterLink :to="{ name: 'system-type', params: { id: qualification.systemTypeId } }">{{
            qualification.systemType }}</RouterLink>
        </td>
        <td>
          <RouterLink :to="{ name: 'role', params: { id: qualification.roleId } }">{{ qualification.role }}</RouterLink>
        </td>
        <td>{{ qualification.qualificationDate }}</td>
        <td>{{ qualification.protocol }}</td>
        <td>{{ qualification.protocolVersion }}</td>
      </tr>
    </table>
    <div>
      <Pagination :limit="pageData?.limit" :offset="pageData?.offset" :total-pages="pageData?.totalPages"
        :page-number="pageData?.pageNumber" @previous-page="previousPage" @next-page="nextPage"
         v-on:select-page="selectPage" :has-previous-page="pageData?.hasPreviousPage" :has-next-page="pageData?.hasNextPage" />
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