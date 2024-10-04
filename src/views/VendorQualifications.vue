<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { VendorQualification } from '@/models/vendorQualification'
import { type Page } from '@/models/page'
import { useApiVendorQualificationsUrl } from '@/composables/useApiEndpoint'
import Pagination from '@/components/Pagination.vue'
import { parsePaginationPage } from '@/utils/pagination'


const route = useRoute()
const qualifications = ref<Page<VendorQualification>>()

const limit = ref<number>(10)
const page = computed<number>(() => {
  return parsePaginationPage(route.query.page) ?? 1
})
const offset = computed<number>(() => {
  return Math.max(page.value - 1, 0) * limit.value
})

const fetchVendorQualification = (offset: number) => {
  fetch(useApiVendorQualificationsUrl(limit.value, offset))
    .then(response => response.json())
    .then((data: Page<VendorQualification>) => {
      qualifications.value = {
        ...data,
      }
    })
}

watch(offset, async (newOffset) => {
  fetchVendorQualification(newOffset)
}, { immediate: true })
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
      <tr v-for="qualification in qualifications?.items" :key="qualification.qualificationId">
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
      <Pagination v-if="qualifications" :limit="limit" :offset="offset" :total-items="qualifications?.total" />
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
