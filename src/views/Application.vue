<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import type {Application} from "@/models/application";
import {useApiApplicationUrl} from "@/composables/useApiEndpoint";

const route = useRoute()
const application = ref<Application|null>(null)

onMounted(() => {
  fetch(useApiApplicationUrl(route.params.id as string))
      .then(response => response.json())
      .then(data => {
        application.value = data
      })
})

</script>

<template>
  <div class="content">
    <h1>Applicatie: {{ application?.name }}</h1>
    <br>
    <dl>
      <div>
        <dt>ID</dt>
        <dd>{{ application?.id }}</dd>
      </div>

      <div>
        <dt>Applicatie naam</dt>
        <dd>{{ application?.name }}</dd>
      </div>

      <div>
        <dt>Leverancier</dt>
        <dd><RouterLink :to="{ name: 'vendor', params: { id: application?.vendor.id } }">{{ application?.vendor.tradeName }}</RouterLink></dd>
      </div>
      <div>
        <dt>Rollen</dt>
        <dd>
          <ul>
            <li v-for="role in application?.roles">
              <RouterLink :to="{ name: 'role', params: { id: role?.id } }">{{ role.name }}</RouterLink>
            </li>
          </ul>
        </dd>
      </div>
      <div>
        <dt>Systeem types</dt>
        <dd>
          <ul>
            <li v-for="type in application?.systemTypes">
              <RouterLink :to="{ name: 'system-type', params: { id: type?.id } }">{{ type.name }}</RouterLink>
            </li>
          </ul>
        </dd>
      </div>
      <div>
        <dt>Versies</dt>
        <dd>
          <ul>
            <li v-for="version in application?.versions">
              {{ version.version }}
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
