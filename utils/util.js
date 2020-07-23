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
           
            if(res.data.code==40005||res.data.code==40006){
             
              wx.navigateTo({
                url: '/pages/login/index',
                success:()=>{
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                  })
                }
              });
            }else{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }


          }else{
            resolve(res)
          }
         
        },
        fail:err=>{
          reject(err)
          console.log(err)
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
