<template>
<div id="today-box">
    <div class="wea">{{data1==null?null:data1.wea}}<img v-bind:src="'./images/'+(data1==null?'yu':data1.wea_img)+'.png'" ></div>
    <div class="wendu">温度：{{data1==null?null:data1.wendu}}</div>
    <div class="win">风向：{{data1==null?null:data1.win}} | 风速：{{data1==null?null:data1.win_speed}}</div>
    <div class="air">空气质量：{{data1==null?null:data1.air}} | 空气等级：{{data1==null?null:data1.air_level}} | 空气湿度：{{data1==null?null:data1.humidity+'%'}}</div>
    <div class="tip">{{data1==null?null:data1.index[0].title+'：'}}{{data1==null?null:data1.index[0].desc}}</div>
    <div class="tip">{{data1==null?null:data1.index[3].title+'：'}}{{data1==null?null:data1.index[3].desc}}</div>
    <!-- 折线图 -->
    <div id="line"></div>
    <div class="update_time">气象更新时间：{{data1==null?null:data1.update_time}}</div>
</div>
</template>
<script>
export default {
    //data保存从app组件传过来的所有的天气数据
    props: ['data1'],
    methods:{
        draw(){//绘制折线图
               console.log('------开始执行draw函数')
               window.setTimeout(()=>{
                    console.log('------开始绘制折线图')
                    //在组件渲染完成后绘制折线图
                    var label = [];
                    var value = [];
                    for(var i = 0;i<this.data1.hours.length;i++){
                        label.push(this.data1.hours[i].day)
                        value.push(Number(this.data1.hours[i].tem.replace(/℃/g,"")))
                    }

                    var line = echarts.init(document.getElementById('line'),'dark');
              var option = {
              color:["green"],//线条颜色
              title: {
                    x: 'left', //标题位置
                    text: '', //           小时预报
                    textStyle: { //标题字体样式
                    fontSize: '16',
                    color: '#ffffff',
                    fontWeight: 'bolder'
                     }
              },
              tooltip: { //鼠标移动上去的提示数据
                   trigger: 'axis'
                       },
              xAxis:  { //横轴数据
                  type: 'category',
                  boundaryGap: false,
                  data: label,
                  axisLabel: {
                  interval:0
                        }
                      },
              yAxis: { //纵轴数据
                   show: true,
                   type: 'value',
                   axisLabel: { //数据单位
                   formatter: '{value} °C'
                              }
                     },
              series: [{
                      name:'温度',
                      type:'line',
                      data:value,
                      }]
                    }
             line.setOption(option) ;
              },300)
        }
    },
    mounted: function() {
             console.log('------today组件渲染完毕')
             this.draw();
        },
}
</script>
<style scoped >
/* 引入scoped后当前文件的样式代码只在当前文件生效，不会影响其他组件的样式 */
/* 组件全局样式 */
#today-box{
    padding-top: 40px;
    width: 100%;
    height: 600px;
    margin: 0 auto;
    background-color: #333333;
}

.city{
    text-align: center;
}
.wea{
    text-align: center;
    font-size: 40px;
}
.wea img{
    position: relative;
    top:10px
}
.wendu{
    text-align: center;
}
.win{
    text-align: center;
}
.air{
   text-align: center;
}
.tip{
    margin-top: 8px;
   text-align: center;
   background-color: rgba(255, 255, 255, 0.26);
}
.update_time{
   text-align: center;
}
#line{
    width:750px;height:350px;
    /* border: 1px solid red; */
    margin: 0 auto;
}
</style>