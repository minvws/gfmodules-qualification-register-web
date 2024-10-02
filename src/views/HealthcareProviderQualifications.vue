<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { HealthcareProviderQualifications } from '@/models/healthcareProviderQualifications'
import { type Page } from '@/models/page'
import { useApiHealthcareProviderQualificationsUrl } from '@/composables/useApiEndpoint'
import Pagination from '@/components/Pagination.vue'
import { parsePaginationPage } from '@/utils/pagination'

const route = useRoute()
const qualifications = ref<Page<HealthcareProviderQualifications>>()

const limit = ref<number>(10)
const page = computed<number>(() => {
  return parsePaginationPage(route.query.page) ?? 1
})
const offset = computed<number>(() => {
  return Math.max(page.value - 1, 0) * limit.value
})

const fetchHealthcareProviderQualifications = (offset: number) => {
  fetch(useApiHealthcareProviderQualificationsUrl(limit.value, offset))
    .then(response => response.json())
    .then((data: Page<HealthcareProviderQualifications>) => {
      qualifications.value = {
        ...data,
      }
    })
}

watch(offset, async (newOffset) => {
  fetchHealthcareProviderQualifications(newOffset)
}, { immediate: true })
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
      <Pagination v-if="qualifications" :limit="limit" :offset="offset"  :total-items="qualifications?.total" />
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
