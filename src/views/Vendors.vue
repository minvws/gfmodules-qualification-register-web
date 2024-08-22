<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type {Vendor} from "@/models/vendor";
import  type {Page} from "@/models/page";
import {useApiVendorsUrl} from "@/composables/useApiEndpoint";

const vendors = ref<Array<Vendor>>([])

onMounted(() => {
  fetch(useApiVendorsUrl())
    .then(response => response.json())
    .then((data: Page<Vendor>) => {
      vendors.value = data.items
    })
})
</script>

<template>
  <div class="content">
    <h1>Leveranciers</h1>
    <br>
    <table>
      <tr>
        <th>Handelsnaam</th>
        <th>KVK</th>
        <th>Geregistreerde naam</th>
      </tr>
      <tr v-for="vendor in vendors">
        <td><RouterLink :to="{ name: 'vendor', params: { id: vendor.id } }">{{ vendor.tradeName }}</RouterLink></td>
        <td>{{ vendor.kvkNumber }}</td>
        <td>{{ vendor.statutoryName }}</td>
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
