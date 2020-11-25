<template>
<td v-if="!dataItem['inEdit']">
    <v-tooltip bottom>
    <span>{{this.$i18n.t('flow.actions.edit')}}</span>
        <template v-slot:activator="{ on}">
            <v-icon 
            v-on="on"
            class="mx-2" 
            @click="editHandler"
            color="primary"
            >  mdi-pencil
            </v-icon> 
        </template>
    </v-tooltip>
    <sb-formio-layout-resultDialog 
    @click="checkTemplat()"
    :tooltip="$i18n.t('flow.formBuilder.preview')"
    color="primary"
    :buttonSetting="{  icon: true, iconText: 'mdi-eye' }">
    <template v-slot:buttons>
        <v-icon
            class="mx-2" 
            color="primary">
                mdi-content-save
        </v-icon>
    </template>
    <template v-slot:content>
        <sb-formio-render v-if="showRender"
        ref="formRender"
        dataType="formComponents"
        :formComponents="schema"
        :defaultResult="currentTemplateResult"/>
    </template>
    </sb-formio-layout-resultDialog>
</td>
<td v-else>
    <v-icon 
        left
        class="mx-2" 
        @click="addUpdateHandler"
        color="primary"
        >
        mdi-check
        </v-icon  >
    <v-icon
        right
        class="mx-2" 
        @click="cancelDiscardHandler"
        color="primary"
    >
        mdi-cancel
        </v-icon>
        <sb-formio-layout-resultDialog 
        @click="checkTemplat()"
        :tooltip="$i18n.t('flow.formBuilder.preview')"
        color="primary"
        :buttonSetting="{  icon: true, iconText: 'mdi-eye' }">
        <template v-slot:buttons>
            <v-icon
                class="mx-2" 
                color="primary">
                    mdi-content-save
            </v-icon>
        </template>
        <template v-slot:content>
            <sb-formio-render v-if="showRender"
            ref="formRender"
            dataType="formComponents"
            :formComponents="schema"
            :defaultResult="currentTemplateResult"/>
        </template>
        </sb-formio-layout-resultDialog>
    <!-- <v-tooltip bottom>
    <span>{{this.$i18n.t('flow.formBuilder.preview')}}</span>
    <template v-slot:activator="{ on }">
        <v-icon
            v-on="on"
            class="mx-2" 
            v-model="dialog" 
            @click.stop="$emit('update:dialog', dialog = true);  checkTemplat()"
            color="primary">
                mdi-eye
            </v-icon>
    </template>
    </v-tooltip> -->
    </td>
</template>
<script>

export default {
    props: {
        defaultResult:Object,
        formComponents:Object,
        showRender:Boolean,
        dialog:Boolean,
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
        },
        checkTemplate: function(){
             this.$emit('checkTemplate', {dataItem:this.dataItem});
        },
    }
}
</script>
