import {UserModel} from "../models/user"
// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

var formatTime=function(time_str,str,type=1){
  var time = new Date(time_str);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();

  var result = ""
  switch (type) {
      case 2:
          result = y+str+add0(m)+str+add0(d);
          break;
      case 3:
          result = y+str+add0(m)+str+add0(d) +" "+add0(h)+":"+add0(mm);
          break;
      case 4:
        result = add0(m)+str+add0(d) +" "+add0(h)+":"+add0(mm);
        break;
      default:
          result = y+str+add0(m)+str+add0(d) +" "+add0(h)+":"+add0(mm)+":"+add0(s);
          break;
  }
  return result;

}
var add0=function(m){
  return m<10?'0'+m:m 
}

const promisic = function(func){
  return function(params={}){
    return new Promise((resolve,reject)=>{
      const args = Object.assign(params,{
        success:res=>{
         resolve(res)
        },
        fail:err=>{
          reject(err)
         
        }
      })
      func(args)
    })
  }
}

const promisic2 = function(func){
  return function(params={}){
    return new Promise((resolve,reject)=>{
      const args = Object.assign(params,{
        success:res=>{
          resolve(res)
        },
        fail:err=>{
          reject(err)
        }
      })
      func(args)
    })
  }
}

// paging传参方式
class Paging{
  constructor(page,size,key,keyword){
    this.page = page;
    this.size = size;
    this.key = key;
    this.keyword = keyword;
  }
}

export{
  promisic,promisic2,Paging,formatTime
}
