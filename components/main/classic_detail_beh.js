let classic_detail_beh =Behavior({
    properties:{
        ids:{
            type:Number
        },
        title:{
            type:String
        },
        sub_title:{
            type:String
        },
        intro:{
            type:String
        },
        image:{
            type:String
        },
        author:{
            type:String
        },
        content:{
            type:String
        },
        type:{
            type:Number
        }


    },
    data:{

    },
    attached(){
        console.log("测试")
    },
    methods:{

    }
})

export {classic_detail_beh}