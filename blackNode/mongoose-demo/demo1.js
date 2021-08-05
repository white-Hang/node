const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//创建一个模型，说白了就是在设计数据库
//mongodb是动态的，非常灵活，只需要在代码中设计你的数据库
//mongoose这个包就可以让你的设计编写过程变的非常的方便
const Cat = mongoose.model('Cat', { name: String });

//实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });

//持久化保存kitty实例
kitty.save().then(() => console.log('meow'));