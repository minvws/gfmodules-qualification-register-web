<script setup lang="ts">
import{ paginationService } from '@/models/page';
import { computed, ref, type Ref } from 'vue';

interface Props {
    limit: number,
    offset: number,
    totalItems: number,
}
const props = defineProps<Props>();
const offset = ref<number>(props.offset);
const limit = ref<number>(props.limit)
const totalPages = computed<number>(() => (paginationService.totalPages(props.limit, props.totalItems)));
const pageNumber = ref<number>(paginationService.pageNumber(props.limit, props.offset));
const hasPrevousPage = computed<boolean>(() => (paginationService.hasPreviousPage(pageNumber.value)));
const hasNextPage = computed<boolean>(() => (paginationService.hasNextPage(pageNumber.value, totalPages.value)));

const emit = defineEmits(['updateData']);

const updatePagination  = (limit: Ref<number>, offset: Ref<number>): void => {
    pageNumber.value = paginationService.pageNumber(limit.value, offset.value);
    emit("updateData", limit.value, offset.value);
}

const handleNextPage = () => {
    offset.value = offset.value + limit.value;
    updatePagination(limit, offset)
}

const handePreviousPage = () => {
    offset.value = offset.value - limit.value;
    updatePagination(limit, offset)
}

const handlePageSelection = (selectedPage: number) => {
    offset.value = selectedPage * limit.value;
    updatePagination(limit, offset)
}

const isCurrent = (selectedPage: number) => selectedPage === pageNumber.value ? true : undefined;
const label = (pageNumber: number) => "Ga naar pagina " + pageNumber as string;

</script>

<template>
    <nav class="pagination" aria-label="Paginering">
        <button class="adjacent previous" @click="handePreviousPage"
            :disabled="!hasPrevousPage">Vorige</button>
        <ul>
            <li v-for="(n, i) in totalPages" :key="i">
                <a href="#"
                @click="handlePageSelection(i)" 
                :aria-current="isCurrent(n)"
                :aria-label=label(n) >{{ n }}</a>
            </li>
        </ul>
        <button @click="handleNextPage" aria-label="Ga naar de volgende pagina" class="adjacent next"
            :disabled="!hasNextPage">Volgende</button>
    </nav>
</template>