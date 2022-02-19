import { check } from "email-existence";
export default function verifyEmail(email) {
    return check.check(email, function (res, error) {
        if (error) {
            return false;
        }
        return res;
    });
}
