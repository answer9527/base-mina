const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const promisic = function(func){
  return function(params={}){
    return new Promise((resolve,reject)=>{
      const args = Object.assign(params,{
        success:res=>{
          if(res.data.code){

            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
            // token无效时候强制跳转登录
            if(res.data.code==403){
              wx.navigateTo({
                url: '/pages/login/index',
                success: (result)=>{
                  
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            }
          }else{
            resolve(res)
          }
         
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
  promisic,promisic2,Paging
}
