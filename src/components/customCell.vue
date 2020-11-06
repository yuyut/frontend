<template>
    <button @click="changeColor">
        Select
    </button>
</template>

<script>
export default {
    props:{
        status:String,
        dataItem: Object,
    },

    data: function() {
return {
        styleObjectB:{
            
            'width':'100px',
            'margin': '-20px -50px',
            'position':'relative',
            'top':'50%',
            'left':'50%',
            'background-color': 'coral',
        },
        styleObjectA: {

            'width':'100px',
            'margin': '-20px -50px',
            'position':'relative',
            'top':'50%',
            'left':'50%'
        },
    };
},
    methods:{
        changeColor: function(){
            this.$emit('change',this.dataItem);
        }
    }
}
</script>