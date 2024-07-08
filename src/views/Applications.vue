<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type {Application} from "@/models/application";
import {useApiApplicationsUrl} from "@/composables/useApiEndpoint";

const applications = ref<Array<Application>>([])

onMounted(() => {
  fetch(useApiApplicationsUrl())
    .then(response => response.json())
    .then(data => {
      applications.value = data
    })
})
</script>

<template>
  <div class="content">
    <h1>Applicaties</h1>
    <br>
    <table>
      <tr>
        <th>Naam</th>
        <th>Leverancier</th>
        <th>Systeem types</th>
        <th>Rollen</th>
        <th></th>
      </tr>
      <tr v-for="application in applications">
        <td><RouterLink :to="{ name: 'application', params: { id: application.id } }">{{ application.name }}</RouterLink></td>
        <td><RouterLink :to="{ name: 'vendor', params: { id: application.vendor.id } }">{{ application.vendor.trade_name }}</RouterLink></td>
        <td>{{application.system_types.map(s => s.name).toString()}}</td>
        <td>{{application.roles.map(r => r.name).toString()}}</td>
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
