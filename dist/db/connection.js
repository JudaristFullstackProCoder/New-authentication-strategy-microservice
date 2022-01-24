import { __awaiter } from "tslib";
import mongoose from "mongoose";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
};
export default function main(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mongoose.connect(url, options);
    });
}
