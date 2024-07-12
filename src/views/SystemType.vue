<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink, useRoute} from "vue-router";
import type {ApplicationSystemType} from "@/models/systemType";
import {useApiSystemTypeUrl} from "@/composables/useApiEndpoint";

const route = useRoute()
const systemType = ref<ApplicationSystemType|null>(null)

onMounted(() => {
  fetch(useApiSystemTypeUrl(route.params.id as string))
      .then(response => response.json())
      .then(data => {
        systemType.value = data
      })
})
</script>

<template>
  <div class="content">
    <h1>Systeem type: {{systemType?.name}}</h1>
    <br>
    <dl>
      <div>
        <dt>ID</dt>
        <dd>{{ systemType?.id }}</dd>
      </div>
      <div>
        <dt>Naam</dt>
        <dd>{{ systemType?.name }}</dd>
      </div>
      <div>
        <dt>Beschrijving</dt>
        <dd>{{ systemType?.description }}</dd>
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
