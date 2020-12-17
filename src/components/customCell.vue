<template>
    <td class="cell">
   
            <v-btn class="divStyle"     
            v-if='checkStatus()'
            elevation="2"
            small 
            disabled
            @click="postTemplate(id)" >
                {{msg}}
            </v-btn>

            <v-btn      
            v-else
            color="primary"
            elevation="2"
            small
            @click="postTemplate(id)" >
                {{msg}}
            </v-btn>

    </td >
</template>

<script>
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 


export default {
    props:{
        currentId:String,
        id: String,
           formVersionId:{
            type:String,
        },
    },

    data: function() {
        return {
            
            msg:this.$i18n.t('form.actions.apply'),

        };
    },
    watch:{
        currentId: function(){
            this.checkStatus();
        }
        },
    methods:{
        postTemplate:function(id){
        let documentReportTemplateId = id;
        let state = {   filter: 0,
                        group: 0,
                        skip: 0,
                        sort: 0,
                        take: 10 };
        const queryStr = toDataSourceRequestString(state);
        let vmChild = this;
        this.$API.api.main.formVersionDocumentReportTemplate.postTemplate(this.formVersionId,documentReportTemplateId,queryStr)
            .then(res => {
            vmChild.$emit('change',id);

            
        })
        .catch(function (error) {
                console.log(error);
        });
    },
    checkStatus(){
        if(this.id==this.currentId)
            return true;
        if(this.id!==this.currentId){
            return false;
            }    
        }
    },
   computed:{
     
  }
}
    
</script>
<style>
.cell{
  margin-left: auto;
  margin-right: auto;
  padding: 10px;

}
</style>