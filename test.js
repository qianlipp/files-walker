/**
 * Created by qianlipp on 2017/6/16.
 */

var index = require("./lib/index");

index.walkSync("/Users/vinceyu/projects/我的公开项目", function (path, name) {
    console.log(path + "__________" + name);
});