<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import type { HealthcareProvider } from '@/models/healthcareProvider';
import {useHealthcareProvider} from "@/composables/useApiEndpoint";

const route = useRoute()
const healthcareProvider = ref<HealthcareProvider|null>(null)

onMounted(() => {
  fetch(useHealthcareProvider(route.params.id as string))
      .then(response => response.json())
      .then(data => {
        healthcareProvider.value = data
      })
})
</script>

<template>
    <div class="content">
      <h1>Zorgaanbieder: {{ healthcareProvider?.tradeName }}</h1>
      <br>
      <dl>
        <div>
          <dt>ID</dt>
          <dd>{{ healthcareProvider?.id }}</dd>
        </div>
  
        <div>
          <dt>Handelsnaam</dt>
          <dd>{{ healthcareProvider?.tradeName }}</dd>
        </div>
  
        <div>
          <dt>Statutaire naam</dt>
          <dd>{{ healthcareProvider?.statutoryName }}</dd>
        </div>
        <div>
          <dt>Ura code</dt>
          <dd>{{ healthcareProvider?.uraCode }}</dd>
        </div>
        <div>
          <dt>AGB-code</dt>
          <dd>{{ healthcareProvider?.agbCode }}</dd>
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
  