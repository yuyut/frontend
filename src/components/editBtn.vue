<template>

<v-btn 
@click="editHandler"
:color="btnColor"
>  {{title}}
</v-btn> 

</template>
<script>

export default {
    props: {
        dataItem: Object,
        title: String,
        btnColor: String,
    },
    methods: {
        editHandler: function() {
            this.$emit('edit', {dataItem:this.dataItem});
        },
    }
}
</script>
