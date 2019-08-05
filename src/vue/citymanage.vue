<template>
<div id="citymanage-box">
    <input autocomplete="off" id="search" type="text" v-model="search_data" @keyup="findcity" placeholder="输入城市、省份名称:">
    <!-- 展示城市信息的搜索结果 -->
    <div id="result_box" ref="result_box">
        <!-- 如果搜索成功界面 -->
        <div v-if="search_result.length>0">
            <h3 class="title">搜索结果</h3>
            <template v-for="a in search_result">
                <div class="searchcity" @click="change(a.city)">{{a.provence+':'+a.city}}</div>
            </template>
        </div>
        <!-- 搜索失败界面 -->
        <div v-else-if="search_result.length==0 && search_data!=''">
             <h3 class="title">搜索结果</h3>
             <div class="nocity">没有匹配的城市...</div>
        </div>
        <!-- 初始界面 -->
        <div v-else-if="search_result.length==0 && search_data==''">
             <h3 class="title">热门城市</h3>
             <template v-for="x in hot_city" >
                 <div class="hotcity" @click="change(x)">{{x}}</div>
             </template>
             <h3 class="title">历史搜索</h3>
             <template v-for="y in data2==null?null:data2.historycity" >
                 <div class="hotcity" @click="change(y)">{{y}}</div>
             </template>
        </div>
    </div>
    
    
</div>
</template>
<script>
export default {
    props:['data2'],
    data:function(){
        return{
            search_result:[],
            search_data:'',
            hot_city:['北京','上海','广州','深圳','武汉','成都','西安','重庆','郑州','天津','杭州','南京'],
            history_city:[],
        }
    },
    methods:{
        findcity(){
            if(this.search_data==''){
                this.search_result = [];
                return;
            }
            this.search_result = [];
            var count = 0;
            for(var i = 0;i<this.data2.city_list.length;i++){
               if(this.data2.city_list[i].city.indexOf(this.search_data)!=-1||this.data2.city_list[i].provence.indexOf(this.search_data)!=-1){
                   this.search_result.push(this.data2.city_list[i])
                   count ++;
                   if(count>=50){
                       break;
                   }
               }
            }
        },
        change(city){
            if(city==this.data2.thiscity){
                return;
            }
            var a = window.confirm('是否切换到城市：'+city);
            if(a===true){
              //调用父组件的切换城市方法
              this.$parent.changecity(city);
            }
        }
    }
}
</script>
<style scoped>
#citymanage-box{
    width: 100%;
    height: 600px;
    margin: 0 auto;
    background-color: #333333;
    padding-top: 40px;
}
#search{
    outline:none;
    outline:medium;
    width: 260px;
    color: #8a8a8a;
    height: 30px;
    border: 1px solid #fff;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    background:transparent;
    border-radius: 7px;
    padding: 4px 12px;
    display: block;
    margin: 0 auto;
    margin-top: 15px;
}
#result_box{
    border: 1.2px solid rgba(255, 255, 255, 0.26);
    width: 750px;
    height: 450px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 0px;
}
/* 热门城市 */
.hotcity{
    display: inline-block;
    margin-left: 15px;
    margin-top:15px;
    color: green;
    border: 1px solid green;
    padding-left: 5px;
    padding-right: 5px;
    min-width: 78px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
/* 没有匹配城市 */
.nocity{
    margin-left: 15px;
    margin-top:15px;
    color: green;
}
/* 搜索结果 */
.searchcity{
    display: inline-block;
    margin-left: 15px;
    margin-top:15px;
    color: green;
    border: 1px solid green;
    padding-left: 5px;
    padding-right: 5px;
    min-width: 78px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
.hotcity:hover{
    background: rgba(100, 144, 122, 0.2);
}
.searchcity:hover{
    background: rgba(100, 144, 122, 0.2);
}
.title{
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.26);
    padding: 5px;
}
</style>