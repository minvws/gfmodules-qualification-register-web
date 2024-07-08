<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type {Application} from "@/models/application";
import type {Vendor} from "@/models/vendor";
import type {Qualification} from "@/models/qualification";
import {useApiQualificationsUrl} from "@/composables/useApiEndpoint";

const qualifications = ref<Array<Qualification>>([])

onMounted(() => {
  fetch(useApiQualificationsUrl())
    .then(response => response.json())
    .then(data => {
      qualifications.value = data
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
        <td>{{ qualification.healthcare_provider_name }}</td>
        <td><RouterLink :to="{ name: 'application', params: { id: qualification.application_id } }">{{ qualification.application_name }}</RouterLink></td>
        <td>{{ qualification.application_version }}</td>
        <td>{{ qualification.system_type }}</td>
        <td>{{ qualification.role }}</td>
        <td>{{ qualification.qualification_date }}</td>
        <td>{{ qualification.protocol_name }}</td>
        <td>{{ qualification.protocol_version }}</td>
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
