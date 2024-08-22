<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type {Qualification} from "@/models/qualification";
import type {Page} from "@/models/page"
import {useApiQualificationsUrl} from "@/composables/useApiEndpoint";

const qualifications = ref<Array<Qualification>>([])

onMounted(() => {
  fetch(useApiQualificationsUrl())
    .then(response => response.json())
    .then((data: Page<Qualification>) => {
      qualifications.value = data.items
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
      <tr v-for="qualification in qualifications">
        <td>{{ qualification.healthcareProviderName }}</td>
        <td><RouterLink :to="{ name: 'application', params: { id: qualification.applicationId } }">{{ qualification.applicationName }}</RouterLink></td>
        <td>{{ qualification.applicationVersion }}</td>
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
