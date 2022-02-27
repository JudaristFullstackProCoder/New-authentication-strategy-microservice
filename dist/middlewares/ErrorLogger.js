/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-22 19:18:10
 * @modify date 2022-02-22 19:18:10
 * @desc [Error logger middleware]
 */
export default function (err, req, res, next) {
    console.error(err.message);
    next(err);
}
