<script setup lang="ts">
import {paginationService} from '@/models/page';
import {computed, ref, type Ref} from 'vue';
import {useRoute} from 'vue-router';

interface Props {
  limit: number,
  offset: number,
  totalItems: number,
}

const props = defineProps<Props>();
const totalPages = computed<number>(() => paginationService.totalPages(props.limit, props.totalItems));
const pageNumber = computed<number>(() => paginationService.pageNumber(props.limit, props.offset));

const route = useRoute();

const isCurrent = (selectedPage: number) => selectedPage === pageNumber.value ? true : undefined;
const label = (pageNumber: number) => "Ga naar pagina " + pageNumber as string;
const currentLabel = (pageNumber: number) => "Huidige pagina, pagina " + pageNumber as string;

const paginateRouteObject = (pageNumber: number) => {
  return {
    query: {
      ...route.query,
      ['page']: pageNumber,
    },
  };
}

const previousPageRouteObject = computed(() => {
  if (!paginationService.hasPreviousPage(pageNumber.value)) {
    return undefined
  }
  return paginateRouteObject(pageNumber.value - 1)
});
const nextPageRouteObject = computed(() => {
  if (!paginationService.hasNextPage(pageNumber.value, totalPages.value)) {
    return undefined
  }
  return paginateRouteObject(pageNumber.value + 1)
});

</script>

<template>
  <nav class="pagination" aria-label="Paginering">
    <RouterLink
      v-if="previousPageRouteObject"
      :to="previousPageRouteObject"
      class="adjacent previous">Vorige
    </RouterLink>
    <span v-else aria-label="Ga naar de vorige pagina" class="disabled">Vorige</span>
    <ul>
      <li v-for="(n, i) in totalPages" :key="i">
        <span
          v-if="isCurrent(n)"
          aria-current="true"
          :aria-label="currentLabel(n)">{{ n }}</span>
        <RouterLink
          v-else
          :to="paginateRouteObject(n)"
          :aria-label="label(n)"
          :aria-current="isCurrent(n)">{{ n }}
        </RouterLink>
      </li>
    </ul>
    <RouterLink
      v-if="nextPageRouteObject"
      :to="nextPageRouteObject"
      aria-label="Ga naar de volgende pagina"
      class="adjacent next">Volgende
    </RouterLink>
    <span v-else aria-label="Ga naar de volgende pagina" class="disabled">Volgende</span>
  </nav>
</template>
