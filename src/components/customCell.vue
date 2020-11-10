<template>
    <div>
        <div v-if='checkStatus()'>
            <v-btn
            color="primary"
            elevation="2"
            x-small 
            @click="postTemplate(id)" >
                {{msg}}
            </v-btn>
        </div>    
        <div v-else>
            <v-btn
            elevation="2"
            x-small
            @click="postTemplate(id)" >
                {{msg}}
            </v-btn>
        </div>
    </div>
</template>

<script>
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
const formVersionId='2778a5f3-1024-4c97-9e09-892319689f6a'

export default {
    props:{
        currentId:String,
        dataItem: Object,
        id: String,
    },

    data: function() {
        return {
            
            msg:"Select",
            cellStyle :{
            'width': '100px',
            'margin' :' -20px -50px',
            'position' : 'relative',
            'top' : '50%',
            'left' : '50%',
            'color' : 'white',
            'background-color': 'coral',
            },
            cellStyleSelected :{
            'width': '100px',
            'margin' :' -20px -50px',
            'position' : 'relative',
            'top' : '50%',
            'left' : '50%',
            'color' : 'white',
            'background-color': 'green',
            }
        };
    },
    watch:{
        currentId: function(){
            this.checkStatus();
        }
        },
    methods:{
        postTemplate:function(id){
        
        //postTemplate: (formVersionId, documentReportTemplateId, data, handler)
        console.log('postTemplate222 started');
        console.log(id);
        let documentReportTemplateId = id;
        let state = {   filter: 0,
                        group: 0,
                        skip: 0,
                        sort: 0,
                        take: 10 };
        const queryStr = toDataSourceRequestString(state);
        console.log('queryStr is '+queryStr);
        let vmChild = this;
        this.$API.api.main.formVersionDocumentReportTemplate.postTemplate(formVersionId,documentReportTemplateId,queryStr)
            .then(res => {
            vmChild.$emit('change',id);
            console.log("id: "+documentReportTemplateId+" posted!!!!");

            
        })
        .catch(function (error) {
                console.log(error);
        });
        console.log('postTemplate222 excuted' ); 
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
button {
            width: 100px;
            margin : -20px -50px;
            position : relative;
            top : 50%;
            left : 50%;
            /* background-color : coral */
}
</style>