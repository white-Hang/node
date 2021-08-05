const mongoose = require("mongoose")
const Schema = mongoose.Schema
//链加数据库
//指定链接的数据库不用存在，当你插入第一条数据之后就会被自动创建出来
mongoose.connect('mongodb://localhost:27017/test');

//设计集合结构（表结构）
//字段名称就是表结构中的属性名称
//约束的目的是为了保证数据的完整性，不要有脏数据
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    }
  });

  //3.将文档结构发布为模型
  //第一个参数：User最终会变成users的集合名称
  //第二个参数：架构Schema
  //返回值：模型架构函数

  const User = mongoose.model('User', userSchema);

  //4.当我们有了模型构造函数以后，就可以使用这个构造函数对users中对数据为所欲为了

  const admin = new User({
      username:"zs",
      password:"123456",
      email:"admin@admin.com"
  })

  //新增数据
  admin.save().then(res=>{
      console.log(res,'success')
  }).catch(res=>{
      console.log('error')
  })


  //查询数据

//   User.find().then(res=>{
//       console.log(res,'res')
//   })

//   User.find({username:"zs"}).then(res=>{
//       console.log(res,'res')
//   })


//删除数据

// User.remove({username:"zs"}).then(res=>{
//     console.log(res,'删除成功')
// })

//更新数据
User.findByIdAndUpdate("60fd6b5408f6a739b9dd22a9",{
    password:"123"
}).then(res=>{
    console.log(res,'更新成功')
})




