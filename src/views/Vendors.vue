<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink} from "vue-router";
import type {Application} from "@/models/application";
import type {Vendor} from "@/models/vendor";

const vendors = ref<Array<Vendor>>([])

onMounted(() => {
  fetch('http://localhost:8506/administration/vendors')
    .then(response => response.json())
    .then(data => {
      vendors.value = data
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
        <td><RouterLink :to="{ name: 'vendor', params: { id: vendor.id } }">{{ vendor.trade_name }}</RouterLink></td>
        <td>{{ vendor.kvk_number }}</td>
        <td>{{ vendor.statutory_name }}</td>
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
