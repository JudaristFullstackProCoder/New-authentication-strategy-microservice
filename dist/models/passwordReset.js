/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-21 18:45:25
 * @modify date 2022-02-21 18:45:25
 * @desc [Model for password reset table]
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const passResetSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    code: {
        type: Schema.Types.String,
        required: true
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ["started", "pending", "done"],
        default: "started"
        /**
         * started : the user made a request to reset his password and a code was sent to him by email
         * pending : the user to enter the corresponding code allowing him to reset his password
         * done : The user to reset his password
         */
    }
});
export default mongoose.model("passwordreset", passResetSchema);
