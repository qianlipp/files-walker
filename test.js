/**
 * Created by qianlipp on 2017/6/16.
 */

var index = require("./lib/index");

index.walkSync("/Users/vinceyu/projects/我的公开项目", function (path, name) {
    console.log(path + "__________" + name);
}, {
    contain: "symbol",
    not_contain: "@core-js",
    start_with: "/Users/vi",
    not_start_with: "/",
    end_with: "",
    not_end_with: "",
    filter: function () {
    }
});