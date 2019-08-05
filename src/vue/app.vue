<template>
<div id="app-box">
<router-view  v-bind:data1="today_data" v-bind:data2="citymanage_data" v-bind:data3="oneweek_data"></router-view>

<div id="weather-title">{{weather_title}}</div>
<div id="app-box-nav">
    <router-link class="link-today" to="/today">当前天气</router-link>
    <router-link class="link-citymanage" to="/citymanage">切换城市</router-link>
    <router-link class="link-oneweek" to="/oneweek">最近一周</router-link>
</div>
</div>
</template>
<script>
export default {
     data:function(){
     return {
         weather_data:null,
         city_list:null,
         thiscity:'',
         historycity:null
     }
     },
      computed: {
    // 计算属性
    weather_title:function(){
       if(this.weather_data==null){
          return null;
      }
      else{
        return this.weather_data.data[0].date +' '+ this.weather_data.data[0].week +' '+ this.weather_data.city
      }
    },
    today_data: function () {
      if(this.weather_data==null){
          return null;
      }
      else{
        return {
             city:this.weather_data.city,
             update_time:this.weather_data.update_time,
             wea:this.weather_data.data[0].wea,
             wea_img:this.weather_data.data[0].wea_img,
             wendu:this.weather_data.data[0].tem1 + '~' + this.weather_data.data[0].tem2,
             week:this.weather_data.data[0].week,
             date:this.weather_data.data[0].date,
             win:this.weather_data.data[0].win[0],
             win_speed:this.weather_data.data[0].win_speed,
             air:this.weather_data.data[0].air,
             air_level:this.weather_data.data[0].air_level,
             air_tips:this.weather_data.data[0].air_tips,
             humidity:this.weather_data.data[0].humidity,
             index:this.weather_data.data[0].index,
             hours:this.weather_data.data[0].hours
        }
      }
     },
    oneweek_data:function(){
       if(this.weather_data==null){
          return null;
      }
      else{
        return this.weather_data
      }
    },
    citymanage_data:function(){
      if(this.weather_data==null||this.city_list==null){
          return null;
      }
      else{
        return{
            time:this.weather_data.data[0].date+' '+this.weather_data.data[0].week,
            city_list:this.city_list,
            thiscity:this.thiscity,
            historycity:this.historycity
        }
      }
    }
     },
      methods:{
     //从后台获取天气数据
     getweatherdata(thiscity){
        
        axios.get('https://www.tianqiapi.com/api/', {
        params: {
          city: thiscity
        }
      })
      .then( (response)=> {
        console.log('------气象数据请求成功')
        console.log(response.data);
        this.weather_data = response.data;
        //如果当前组件的当前城市为空说明此网页第一次加载，将天气api定位的城市保存到本地以及当前组件
        if(this.thiscity==''){
            this.thiscity = this.weather_data.city;
            window.localStorage.setItem('weather_thiscity',this.thiscity)
        }
      })
      .catch( (error)=> {
        console.log(error);
      });
     },
    //从本地文件获取所有城市信息
    getallcity(){
       axios.get('http://localhost:9000/city.json', {
        params: {
          city: ''
        }
      })
      .then( (response)=> {
        console.log('------所有城市请求成功')
        console.log(response.data);
        this.city_list = response.data;
      })
      .catch( (error)=> {
        console.log(error);
      });
    },
    //从本地读取保存的当前城市到app组件
    getthiscity(){
       //如果本地没有数据直接return，后面再处理
       if(window.localStorage.getItem('weather_thiscity')===null){
          return;
       }
       //如果存在数据，把本地城市信息直接保存到当前组件中，等到加载天气信息使用
       else{
         this.thiscity = window.localStorage.getItem('weather_thiscity');
       }
    },
    //从本地读取搜索记录到当前组件
    gethistorycity(){
       //如果本地历史记录不存在，就赋值一个空数组到本地，并把空数组赋值给当前组件
       if(window.localStorage.getItem('weather_historycity')===null){
          window.localStorage.setItem('weather_historycity',JSON.stringify([]));
          this.historycity = [];
       }
       else{
         this.historycity = JSON.parse(window.localStorage.getItem('weather_historycity'))
       }
    },
    //添加搜索记录 保证去重
    addhistorycity(city){
       //添加之前查看是否重复
       for(var i = 0;i<this.historycity.length;i++){
           if(city==this.historycity[i]){
              return;
           }
       }
       this.historycity.unshift(city);

       //限制历史记录在20个以内 如果超出20删除最后一个元素
       while(true){  
         if(this.historycity.length>20){
            this.historycity.splice(this.historycity.length-1,1);
         }
         else{
           break;
         }
       }
       
    },
    //改变当前城市，由切换城市组件调用
    changecity(city){
        //把新的城市保存到本地
        window.localStorage.setItem('weather_thiscity',city);
        //添加搜索记录 并把新的历史记录保存到本地
        this.addhistorycity(city);
        window.localStorage.setItem('weather_historycity',JSON.stringify(this.historycity));

        //从本地读取新的城市到app组件
        this.getthiscity();
        //从本地读取新的历史记录到app组件
        this.gethistorycity();
        //根据新的城市名重新读取天气数据
        this.getweatherdata(city);
    }
  },
  //  vue实例创建完毕的生命周期函数
  created: function() {
    this.getthiscity();
    //从本地读取新的历史记录到app组件
    this.gethistorycity();
    this.getweatherdata(this.thiscity);
    this.getallcity();
  }
}
</script>
<style>
/* 全局样式 */
*{
    margin: 0px;
    padding: 0px;
}
#app-box{
    width: 1000px;
    height: 650px;
    margin: 0 auto;
    background-color: #333333;
    position: relative;
    color: #ffffff;
}
#weather-title{
  position:absolute;
  left: 15px;
  top:15px;
}
/* 导航栏样式 */
#app-box-nav{
    /* background: #494949; */
    width: 100px;
    height: 200px;
    font-size: 16px;
    position:absolute;
    right: 10px;
    top:20px;
}

/*默认导航链接样式*/
.link-today{
   text-decoration: none;
   color: #ffffff;
   display: block;
   text-align: center;
   margin-top: 5px;
}
.link-citymanage{
   text-decoration: none;
   color: #ffffff;
   display: block;
   text-align: center;
   margin-top: 5px;
}
.link-oneweek{
   text-decoration: none;
   color: #ffffff;
   display: block;
   text-align: center;
   margin-top: 5px;
}
/*激活状态的导航链接样式*/
.router-link-active{
    /* font-weight: bold; */
    color:red;
}
</style>