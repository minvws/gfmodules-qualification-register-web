<script setup lang="ts">
import { computed } from 'vue';
import { paginationService } from '@/models/page';

interface Props {
    limit?: number,
    offset?: number,
    totalPages?: number,
    pageNumber?: number,
}
const props = defineProps<Props>()

const highlightButton = (index: number) => {
    if (index === props.pageNumber) return "is-current";
}

</script>

<template>
    <div class="container">
        <ul class="ul">
            <li>
                <button type="button"><<</button>
            </li>
            <li v-for="i in totalPages" :key="i">
                <button :class="highlightButton(i)">{{ i }}</button>
            </li>
            <li>
                <button type="button">>></button>
            </li>
        </ul>
    </div>
</template>

<style>
.container {
    
    margin-top: 16px;
}
.ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style-type: none;
}
.is-current {
    background-color: red;
}
</style>