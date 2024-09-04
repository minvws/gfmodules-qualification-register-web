<script setup lang="ts">
interface Props {
    limit?: number,
    offset?: number,
    totalPages?: number,
    pageNumber?: number,
    hasPreviousPage?: boolean,
    hasNextPage?: boolean,
}
const props = defineProps<Props>()

const highlightButton = (index: number) => {
    if (index === props.pageNumber) return "is-current";
}

const emit = defineEmits(['nextPage', 'previousPage']);

const nextPageHandler = () => {
    emit("nextPage")
}

const previousPageHandler = () => {
    emit("previousPage");
}


</script>

<template>
    <div class="container">
        <ul class="ul">
            <li>
                <button type="button" @click="previousPageHandler" :disabled="!hasPreviousPage"><<</button>
            </li>
            <li v-for="i in totalPages" :key="i">
                <button :class="highlightButton(i)">{{ i }}</button>
            </li>
            <li>
                <button @click="nextPageHandler" type="button" :disabled="!hasNextPage">>></button>
            </li>
        </ul>
    </div>
</template>

<style>
.container {
    
    margin-top: 16px;
}
.ul {
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