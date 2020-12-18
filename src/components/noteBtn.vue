<template>
<td v-if="!dataItem['inEdit']">
    <v-tooltip bottom>
    <span>{{this.$t('flow.actions.edit')}}</span>
        <template v-slot:activator="{ on}">
            <v-btn
            outlined
            color="primary">
            <v-icon 
            color="primary"
            v-on="on"
            class="mx-2" 
            @click="editHandler"
            >  mdi-pencil 
            </v-icon> 
            {{$t('flow.actions.edit')}}
            </v-btn>
        </template>
    </v-tooltip>
</td>
<td v-else>
    <v-icon 
        left
        @click="addUpdateHandler"
        color="primary"
        >
        mdi-check
        </v-icon  >
    <v-icon
        right
        @click="cancelDiscardHandler"
        color="primary"
    >
        mdi-cancel
        </v-icon>
    </td>
</template>
<script>

export default {
    props: {
        field: String,
        dataItem: Object,
        format: String,
        className: String,
        columnIndex: Number,
        columnsCount: Number,
        rowType: String,
        level: Number,
        expanded: Boolean,
        editor: String
    },
    methods: {
        editHandler: function() {
            this.$emit('edit', {dataItem:this.dataItem});
        },
        addUpdateHandler: function() {
            this.$emit('save', {dataItem:this.dataItem});
        },
        cancelDiscardHandler: function() {
            this.$emit('cancel', {dataItem:this.dataItem});
        }
    }
}
</script>

<style scoped>

</style>