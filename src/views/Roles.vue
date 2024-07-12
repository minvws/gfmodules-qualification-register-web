<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type {ApplicationRole} from "@/models/role";
import {useApiRolesUrl} from "@/composables/useApiEndpoint";

const roles = ref<Array<ApplicationRole>>([])

onMounted(() => {
  fetch(useApiRolesUrl())
    .then(response => response.json())
    .then(data => {
      roles.value = data
    })
})
</script>

<template>
  <div class="content">
    <h1>Rollen</h1>
    <br>
    <table>
      <tr>
        <th>Rol</th>
        <th>Beschrijving</th>
      </tr>
      <tr v-for="role in roles">
        <td><RouterLink :to="{ name: 'role', params: { id: role.id } }">{{ role.name }}</RouterLink></td>
        <td>{{ role.description }}</td>
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
