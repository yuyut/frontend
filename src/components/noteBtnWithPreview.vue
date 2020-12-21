<template>
<td v-if="!dataItem['inEdit']">
    <v-tooltip bottom>
    <span>{{this.$i18n.t('flow.actions.edit')}}</span>
        <template v-slot:activator="{ on}">
            <v-icon 
            v-on="on"
            class="me-3" 
            @click="editHandler"
            color="primary"
            >  mdi-pencil 
            </v-icon> 
        </template>
    </v-tooltip>
    <sb-layout-dialogWithTitle
        :title="$i18n.t('flow.formBuilder.preview')"
        :tooltip="$i18n.t('flow.formBuilder.preview')"
        :iconText="'mdi-eye'"
        :buttonSetting="btnSetting"
        @click="checkTemplate()"
        >
        <template v-slot:buttons>
            <v-icon
                @click.stop="formSave()"
                
                class="me-3" 
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
        </template>
        </sb-layout-dialogWithTitle>
</td>
<td v-else>
    <v-tooltip bottom>
    <span>確認</span>
    <template v-slot:activator="{ on}">
    <v-icon 
        left
        v-on="on"
        class="me-3" 
        @click="addUpdateHandler"
        color="primary"
        >
        mdi-check
        </v-icon  >
        </template>
    </v-tooltip>
     <v-tooltip bottom>
    <span>取消</span>
    <template v-slot:activator="{ on}">
    <v-icon
        v-on="on"
        right
        class="me-3" 
        @click="cancelDiscardHandler"
        color="primary"
    >
        mdi-cancel
        </v-icon>
        </template>
        </v-tooltip>
        <sb-layout-dialogWithTitle
        :title="$i18n.t('flow.formBuilder.preview')"
        :tooltip="$i18n.t('flow.formBuilder.preview')"
        :iconText="'mdi-eye'"
        :buttonSetting="btnSetting"
        @click="checkTemplate()"
        >
        <template v-slot:buttons>
            <v-icon
                @click.stop=" formSave()"
                class="me-3" 
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
        </template>
        </sb-layout-dialogWithTitle>
    </td>
</template>
<script>
import APICONFIG from '../plugins/ApiConfig'
export default {
    props: {
        formComponents:Array,
        showRender:Boolean,
        gotSchema:Boolean,
        dataItem: Object,
        defaultResult: Array,
    },
    data: function(){   
        return{
            currentId:null,
            btnSetting:{  icon: true, color:'primary' },
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
        checkTemplate: function(){
             this.$emit('checkTemplate', {dataItem:this.dataItem});
        },
        // checkTemplate(){
        // let vm = this;
        // this.currentId=this.dataItem.id;
        // this.$API.api.main.formResultTemplate.get(this.currentId)
        //     .then(res => {
        //         vm.defaultResult=res.data.content;
        //         vm.showRender = true;
        //     })
        // .catch(function (error) {
        //     console.log(error);
        // });      
        // },

        async formSave(){
        var result = await this.$refs.formRender.getSubmiton();
        var resultJson = await JSON.stringify(result);
        var resultJson2 = JSON.stringify(resultJson);
        this.$API.api.main.formResultTemplate.putContent(this.currentId, resultJson2, APICONFIG.getJsonConfig)
            .then(res => {
                })
            .catch(function (error) {
                console.log(error);
            });      
    },
    }
}
</script>
