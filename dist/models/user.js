/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-22 19:19:23
 * @modify date 2022-02-22 19:19:23
 * @desc [User Model]
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    token: {
        type: Schema.Types.String,
        required: [true, 'user auth token is required'],
        trim: true
    },
    email: {
        type: Schema.Types.String,
        required: [true, "user email is required"],
        validate: {
            validator: function (email) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: "user email is not valid"
        },
        trim: true
    },
    name: {
        type: Schema.Types.String,
        required: [true, "user name is required"],
        trim: true
    },
    password: {
        type: Schema.Types.String,
        required: [true, "user password is required"],
        trim: true
    },
    isValidate: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});
export default mongoose.model("users", userSchema);
