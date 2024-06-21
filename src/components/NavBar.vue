<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="topnav">
    <RouterLink :to="{ name: 'applications' }">Applicaties</RouterLink>
    <RouterLink :to="{ name: 'vendors' }">Leveranciers</RouterLink>
    <RouterLink :to="{ name: 'system-types' }">Systeem types</RouterLink>
    <RouterLink :to="{ name: 'roles' }">Rollen</RouterLink>
    <RouterLink :to="{ name: 'about' }">about</RouterLink>
  </div>
</template>

<style>
</style>
