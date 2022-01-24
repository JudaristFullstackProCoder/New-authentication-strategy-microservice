import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema ({
 token : {
     type: Schema.Types.String,
     required: [true, 'user auth token is required'],
     trim:true
 },
 email : {
     type : Schema.Types.String,
     required: [true, "user email is required"],
     validate : {
         validator : function (email:string) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
         },
         message : "user email is not valid"
     },
     trim:true
 },
 name : {
     type : Schema.Types.String,
     required : [true , "user name is required"],
     trim:true
 },
 password : {
     type : Schema.Types.String,
     required : [true , "user password is required"],
     trim:true
 }
});

export default mongoose.model("users", userSchema);
