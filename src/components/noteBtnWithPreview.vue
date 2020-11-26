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
    <sb-layout-dialog-withTitle 
        :title="$i18n.t('flow.formBuilder.preview')"
        :tooltip="$i18n.t('flow.formBuilder.preview')"
        :iconText="'mdi-eye'"
        :buttonSetting="{  icon: true, color:'primary' }"
        @click="checkTemplate(); printdefaultResult()"
        >
        <template v-slot:buttons>
            <v-icon
                @click.stop="formSave()"
                class="mx-2" 
                color="primary">
                    mdi-content-save
            </v-icon>
        </template>
        <template v-slot:content>
             <sb-formio-render v-if="(showRender && gotSchema)"
            ref="formRender"
            dataType="formComponents"
            :formComponents="formComponents"
            :defaultResult="defaultResult"/>
        </template></sb-layout-dialog-withTitle>
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
        <sb-layout-dialog-withTitle
        :title="$i18n.t('flow.formBuilder.preview')"
        :tooltip="$i18n.t('flow.formBuilder.preview')"
        :iconText="'mdi-eye'"
        :buttonSetting="{  icon: true, color:'primary' }"
        @click="checkTemplate(); printdefaultResult()"
        >
        <template v-slot:buttons>
            <v-icon
                @click.stop=" formSave()"
                class="mx-2" 
                color="primary">
                    mdi-content-save
            </v-icon>
        </template>
        <template v-slot:content>
            <sb-formio-render  v-if="(showRender && gotSchema)"
            ref="formRender"
            dataType="formComponents"
            :formComponents="formComponents"
            :defaultResult="defaultResult"/>
        </template></sb-layout-dialog-withTitle>
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
import APICONFIG from '../plugins/ApiConfig'
export default {
    props: {
        formComponents:Array,
        showRender:Boolean,
        gotSchema:Boolean,
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
        editor: String,
        currentTemplateResult: Object,
    },
    data: function(){   
        return{
            defaultResult:{},
            currentId,
        }
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
        // checkTemplate: function(){
        //      this.$emit('checkTemplate', {dataItem:this.dataItem});
        // },
        checkTemplate(){
        let vm = this;
        this.currentId=this.dataItem.id;
        this.$API.api.main.formResultTemplate.get(this.currentId)
            .then(res => {
                vm.defaultResult=res.data.content;
                vm.showRender = true;
            })
        .catch(function (error) {
            console.log(error);
        });      
        },
        printdefaultResult(){
            console.log(this.defaultResult);
            console.log(this.showRender && this.gotSchema);
            console.log("formComponents"+this.formComponents);
        },
        async formSave(){
        var result = await this.$refs.formRender.getSubmiton();
        var resultJson = await JSON.stringify(result);
        var resultJson2 = JSON.stringify(resultJson);
        console.log(this.currentId);
        this.$API.api.main.formResultTemplate.putContent(this.currentId, resultJson2, APICONFIG.getJsonConfig)
            .then(res => {
                    console.log("success", res );
                })
            .catch(function (error) {
                console.log(error);
            });      
    },
    }
}
</script>
