<template>
<div>
    <v-card class="form-card">
        <v-card-title>
        <v-icon
        left
        class:="pr-3"
        >
        mdi-file-document-multiple-outline
        </v-icon>
        授權公司列表>修改授權公司資料
        </v-card-title>
        <form @submit.prevent="submit">

            <v-select
            v-model="select"
            :items="items"
            :error-messages="errors"
            label="使用者上限"
            data-vv-name="select"
            required
            ></v-select>

        <v-checkbox
            v-model="checkbox"
            :error-messages="errors"
            value="1"
            label="啟用授權"
            type="checkbox"
            required
            ></v-checkbox>
        <v-divider></v-divider>
        <br/>
        授權模組
        <v-checkbox
            v-for="option in options" :key="option"
            :v-model="option.ckecked"
            :error-messages="errors"
            value="1"
            :label="option.title"
            type="checkbox"
            required
            ></v-checkbox>

            <div class="form-bottom">
            <v-btn
            class="mr-4"
            type="submit"
            >
            submit
            </v-btn>
            <v-btn @click="clear">
            clear
            </v-btn>
            </div>
        </form>
    </v-card>
</div>
</template>


<script>
export default {

    data: function(){
        return{
            name: '',
            phoneNumber: '',
            email: '',
            select: null,
            items: [
                '1',
                '2',
                '3',
                '4',
            ],
            options: [
                {title:'平面定位模組', checked:false},
                {title:'模型系統模組', checked:false},
                {title:'標註模組', checked:false},
                {title:'議題模組', checked:false},
                {title:'4D模擬模組', checked:false},
                {title:'預存視點模組', checked:false},
            ],
            checkbox: null,
        }
    },
  methods:{
    submit () {
        this.$refs.observer.validate()
        },
    clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
        },
    },
    time(date){
        let time = moment(date).format('YYYY/MM/DD hh:mm:ss');
        return time;
        },
    editHandler: function() {
            this.$emit('edit', {dataItem:this.dataItem});
    },
    beforeCreate() {
        
    },
    created(){   

    },
    beforeMount(){

    },
    mounted(){     
        
    },
    computed:{
      
    }

}

</script>

<style>
.form-card{
    padding:12px;
    width:60%;
    margin:auto;
    text-align: left;
}
.form-bottom{
    text-align: right;
}
</style>
