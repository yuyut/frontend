<template>
<td v-if="!dataItem['inEdit']">
    <v-tooltip bottom>
    <span>{{$t('flow.actions.edit')}}</span>
        <template v-slot:activator="{ on}">
            <v-btn
            v-on="on"
            @click="editHandler"
            outlined
            color="primary">
            <v-icon 
            color="primary"
            class="me-2" 
            >  mdi-pencil 
            </v-icon> 
            {{$t('flow.actions.edit')}}
            </v-btn>
        </template>
    </v-tooltip>
</td>
<td v-else>
    <span>
    <v-tooltip bottom>
    <span>確認</span>
    <template v-slot:activator="{ on}">
    <v-icon 
        v-on="on"
        left
        @click="addUpdateHandler"
        color="primary"
        >
        mdi-check
        </v-icon  >
        </template>
        </v-tooltip>
    <v-icon
        right
        @click="cancelDiscardHandler"
        color="primary"
    >
        mdi-cancel
        </v-icon>
    </span>
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