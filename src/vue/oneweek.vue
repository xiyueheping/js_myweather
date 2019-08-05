<template>
<div id="oneweek-box">
<div style="margin-bottom:100px;">&nbsp;</div>
<table v-for="a in data3.data">
   <tr><td class="short">{{data3.city}}</td><td>{{a.day}}</td><td>{{a.date}}</td><td>{{a.wea}}</td><td>{{a.tem1+'~'+a.tem2}}</td><td class="short"><a href="/#/oneweek" @click="show(a.day)">详情</a></td></tr>
</table>

<!-- 每天天气详情弹出框 -->
<form ref="weather_detail" id="weather_detail" style="display:none">
    <h3>天气信息：</h3>
    <div class="center">{{day_detail==null?null:day_detail.day}} {{day_detail==null?null:day_detail.wea}} {{day_detail==null?null:day_detail.tem1}} ~ {{day_detail==null?null:day_detail.tem2}}</div>
    <div class="center">风向：{{day_detail==null?null:day_detail.win[0]}} 风速：{{day_detail==null?null:day_detail.win_speed}}</div>
    <div class="center">空气质量：{{day_detail==null?null:day_detail.air}} 空气湿度：{{day_detail==null?null:day_detail.humidity}} 空气等级：{{day_detail==null?null:day_detail.air_level}}</div>
    <div class="center">{{day_detail==null?null:day_detail.air_tips}}</div>
    <h3>生活指数：</h3>
    <div class="left">{{day_detail==null?null:day_detail.index[0].title+'：'+day_detail.index[0].level+'，'+day_detail.index[0].desc }}</div>
    <div class="left">{{day_detail==null?null:day_detail.index[2].title+'：'+day_detail.index[2].level+'，'+day_detail.index[2].desc }}</div>
    <div class="left">{{day_detail==null?null:day_detail.index[3].title+'：'+day_detail.index[3].level+'，'+day_detail.index[3].desc }}</div>
    <div class="left">{{day_detail==null?null:day_detail.index[4].title+'：'+day_detail.index[4].level+'，'+day_detail.index[4].desc }}</div>
    <div class="left">{{day_detail==null?null:day_detail.index[5].title+'：'+day_detail.index[5].level+'，'+day_detail.index[5].desc }}</div>
    <h3>小时预报：</h3>
    <div v-for="a in day_detail==null?null:day_detail.hours">
    <div class="center">{{a.day+'&nbsp;&nbsp;&nbsp;&nbsp;'+a.wea+'&nbsp;&nbsp;&nbsp;&nbsp;'+a.tem+'&nbsp;&nbsp;&nbsp;&nbsp;'+a.win+'&nbsp;&nbsp;&nbsp;&nbsp;'+a.win_speed}}</div>
    </div>
    <img id="btn_close" @click="close"  v-bind:src="'./images/edit_close.png'" >
</form>
<!-- 背景板 -->
<div id="window_bg" style="display:none"></div>
</div>
</template>
<script>
export default {
    props:['data3'],
    data:function(){
        return{
            day_detail:null
        }
    },
    methods:{
        show(day){
            for(var i = 0;i<this.data3.data.length;i++){
                if(day==this.data3.data[i].day){
                    this.day_detail = this.data3.data[i]
                }
            }
            $('#weather_detail').slideDown(300);
            $("#window_bg").fadeIn(300);
        },
        close(){
            $('#weather_detail').slideUp(300);
            $("#window_bg").fadeOut(300);
        }
    }
}
</script>
<style scoped >
/* 引入scoped后当前文件的样式代码只在当前文件生效，不会影响其他组件的样式 */
#oneweek-box{
    width: 100%;
    height: 600px;
    margin: 0 auto;
    background-color: #333333;
    /* padding-top: 100px; */
}
td{
    
    width: 150px;
    height: 40px;
    text-align: center;
}
.short{
    width: 75px;
}
tr{
    display: block;
    border: 1px solid rgba(255, 255, 255, 0.26);
    margin-top: 5px;
}

table{
    margin: 0 auto;
    /* margin-top: 100px; */
}
table a{
   color: green;
}
/* 每天天气详情框的样式 */
#weather_detail{
    box-shadow: 0 0 10px 0 rgba(113,113,113,.5);
    padding-top: 15px;
    color: black;
    background-color: #ffffff;
    height: 520px;
    width: 550px;
    z-index: 1000;
    margin: 0 auto;
    border-radius: 8px;
    margin-top: 20px;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
#btn_close{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
}
#weather_detail h3{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 3px;
    border-bottom: 1px solid  rgba(113,113,113,.5);
    /* border-top: 1px solid  rgba(113,113,113,.5); */
}
#weather_detail .center{
    margin-left: 120px;
}
#weather_detail .left{
    margin-left: 80px;
}
#window_bg{
    z-index: 800;
    opacity: 0.5;
    background-color: #000;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.time{
    text-align: center;
}
</style>