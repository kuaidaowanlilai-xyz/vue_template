
const indexJs={

}

indexJs.baseUrl = baseUrl//请求地址

indexJs.data=function(date){
    date=new Date(date);
    var time1,time2,time3,h,m,s;
    time1=date.getFullYear();
    time2=date.getMonth()+1;
    time3=date.getDate();
    if((time2+'').length<2){
        time2='0'+time2
    }
    if((time3+'').length<2){
        time3='0'+time3
    }
    return time1+'-'+time2+'-'+time3
}

//时间  年月日 星期
indexJs.nowTime=function(){
  var time=new Date();
  var year=time.getFullYear();
  var mounth=time.getMonth()+1;
  var day=time.getDate();
  var week=time.getDay();
  switch(week){
    case 0:
        week = '天'
        break
    case 1:
        week = '一'
        break
    case 2:
        week = '二'
        break
    case 3:
        week = '三'
        break
    case 4:
        week = '四'
        break
    case 5:
        week = '五'
        break
    case 6:
        week = '六'
        break
    default:
        console.log('时间错误')
}
  return year+'年'+mounth+'月'+day+'日 星期'+week
}


//中国标准时间转换为时间格式  2019-05-21 15:09:11;
indexJs.standardTimeConversion=function(date){
    date=new Date(date);
    var time1,time2,time3,h,m,s;
    time1=date.getFullYear();
    time2=date.getMonth()+1;
    time3=date.getDate();
    if((time2+'').length<2){
        time2='0'+time2
    }
    if((time3+'').length<2){
        time3='0'+time3
    }

    h=date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
    if((h+'').length<2){
        h='0'+h
    }
    if((m+'').length<2){
        m='0'+m
    }
    if((s+'').length<2){
        s='0'+s
    }
    return time1+'-'+time2+'-'+time3+' '+h+':'+m+':'+s
}

//将字符串转换为时间格式,适用各种浏览器,格式如2016-09-09T17:02:37.227"
indexJs.GetTimeByTimeStr=function(dateString) {
    var timeArr = dateString.split(" ");
    var d = timeArr[0].split("-");
    var t = timeArr[1].split(":");
    return new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
}


//按要求生成欠款编号/sme+年月日各取2位+4位随机数
indexJs.smeCoding=function(){
    var date = new Date()
    var time1,time2,time3;
    time1=date.getFullYear()+'';
    time2=date.getMonth()+1;
    time3=date.getDate();
    time1 = time1.substr(2, 2)
    if((time2+'').length<2){
        time2='0'+time2
    }
    if((time3+'').length<2){
        time3='0'+time3
    }
    var rand = Math.floor(Math.random() * 10000)
    return 'SME'+time1+time2+time3+rand
}


export default indexJs