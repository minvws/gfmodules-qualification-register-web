<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink, useRoute} from "vue-router";
import type {Application} from "@/models/application";
import type {Vendor} from "@/models/vendor";
import type {ApplicationRole} from "@/models/role";

const route = useRoute()
const role = ref<ApplicationRole|null>(null)

onMounted(() => {
  fetch('http://localhost:8507/roles/' + route.params.id)
      .then(response => response.json())
      .then(data => {
        role.value = data
      })
})
</script>

<template>
  <div class="content">
    <h1>Rol: {{role?.name}}</h1>
    <br>
    <dl>
      <div>
        <dt>ID</dt>
        <dd>{{ role?.id }}</dd>
      </div>
      <div>
        <dt>Naam</dt>
        <dd>{{ role?.name }}</dd>
      </div>
      <div>
        <dt>Beschrijving</dt>
        <dd>{{ role?.description }}</dd>
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
