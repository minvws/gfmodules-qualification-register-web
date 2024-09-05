<script setup lang="ts">
import { computed, onBeforeUpdate, onMounted, ref } from 'vue';

interface Props {
    limit?: number,
    offset?: number,
    totalPages?: number,
    pageNumber?: number,
    hasPreviousPage?: boolean,
    hasNextPage?: boolean,
}
const props = defineProps<Props>()
const emit = defineEmits(['nextPage', 'previousPage', 'selectPage']);
const currentPage = ref<number | undefined>(props.pageNumber);
onMounted(() => currentPage.value = props.pageNumber);
onBeforeUpdate(() => console.log(currentPage.value));

const handleNextPage = () => {
    emit("nextPage");
}

const handePreviousPage = () => {
    emit("previousPage");
}

const handlePageSelection = (selectedPage: number) => {
    emit("selectPage", selectedPage)
}

const isCurrent = (selectedPage: number) => selectedPage === props.pageNumber ? true : undefined;
const label = (pageNumber: number) => "Ga naar pagina " + pageNumber as string

</script>

<template>
    <nav class="pagination" aria-label="Paginering">
        <button class="adjacent previous" @click="handePreviousPage"
            :disabled="!props.hasPreviousPage">Vorige</button>
        <ul>
            <li v-for="(n, i) in totalPages" :key="i">
                <a href="#"
                @click="handlePageSelection(i)" 
                :aria-current="isCurrent(n)"
                :aria-label=label(n) >{{ n }}</a>
            </li>
        </ul>
        <button @click="handleNextPage" aria-label="Ga naar de volgende pagina" class="adjacent next"
            :disabled="!props.hasNextPage">Volgende</button>
    </nav>
</template>