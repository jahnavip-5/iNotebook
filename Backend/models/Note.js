const mongoose=require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({
   // We need to hide user's notes from others. Hence there must be some connection b/w user and notes
   // this user type is just like foreign key in sql and is the user id
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   },
   title:{
    type: String,
    required: true
   },
   description:{
    type: String,
    required: true
   },
   tag:{
    type: String,
    default:'General'
   },
   date:{
    type:Date,
    default : Date.now
   }
});

module.exports=mongoose.model('notes',NotesSchema);