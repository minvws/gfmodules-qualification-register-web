<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink, useRoute} from "vue-router";
import type {Application} from "@/models/application";
import type {Vendor} from "@/models/vendor";
import {useApiVendorUrl} from "@/composables/useApiEndpoint";

const route = useRoute()
const vendor = ref<Vendor|null>(null)

onMounted(() => {
  fetch(useApiVendorUrl(route.params.id as string))
      .then(response => response.json())
      .then(data => {
        vendor.value = data
      })
})
</script>

<template>
  <div class="content">
    <h1>Leverancier: {{vendor?.trade_name}}</h1>
    <br>
    <dl>
      <div>
        <dt>ID</dt>
        <dd>{{ vendor?.id }}</dd>
      </div>
      <div>
        <dt>Handelsnaam</dt>
        <dd>{{ vendor?.trade_name }}</dd>
      </div>
      <div>
        <dt>Geregistreerde naam</dt>
        <dd>{{ vendor?.statutory_name }}</dd>
      </div>
      <div>
        <dt>Applicaties</dt>
        <dd>
          <ul>
            <li v-for="app in vendor?.applications">
              <RouterLink :to="{ name: 'application', params: { id: app.id } }">{{ app.name }}</RouterLink>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
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
