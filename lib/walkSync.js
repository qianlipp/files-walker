/**
 * Created by qianlipp on 2017/6/16.
 */
'use strict';

var utils = require("./utils");

/**
 * 同步遍历文件夹下所有文件
 * @param rootDir
 * @param callback
 * @param options
 * {
 *      contain:"",
 *      not_contain:"",
 *      start_with:"",
 *      not_start_with:"",
 *      end_with:"",
 *      not_end_with:"",
 *      filter:function(){
 *      }
 * }
 */
module.exports = function walkSync(rootDir, callback, options) {
    var options = (arguments.length > 2 && arguments[2] !== undefined) ? arguments[2] : null;
    utils.findWithOptions(rootDir, options, callback);
};
