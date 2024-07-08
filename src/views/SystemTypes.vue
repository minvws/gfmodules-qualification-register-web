<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type {Application} from "@/models/application";
import type {Vendor} from "@/models/vendor";
import type {ApplicationSystemType} from "@/models/systemType";
import {useApiSystemTypesUrl} from "@/composables/useApiEndpoint";

const systemTypes = ref<Array<ApplicationSystemType>>([])

onMounted(() => {
  fetch(useApiSystemTypesUrl())
    .then(response => response.json())
    .then(data => {
      systemTypes.value = data
    })
})
</script>

<template>
  <div class="content">
    <h1>Systeem Types</h1>
    <br>
    <table>
      <tr>
        <th>Systeem Type</th>
        <th>Beschrijving</th>
      </tr>
      <tr v-for="systemType in systemTypes">
        <td><RouterLink :to="{ name: 'system-type', params: { id: systemType.id } }">{{ systemType.name }}</RouterLink></td>
        <td>{{ systemType.description }}</td>
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
