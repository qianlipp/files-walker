/**
 * Created by qianlipp on 2017/6/16.
 */
'use strict';

/**
 * 同步遍历文件夹下所有文件
 * @param rootDir
 * @param callback
 * @param options
 * {
 *      contain:"",
 *      not-contain:"",
 *      start-with:"",
 *      not-start-with:"",
 *      end-with:"",
 *      not-end-with:"",
 *      filter:function(){
 *      }
 * }
 */
module.exports = function walkSync(rootDir, callback, options) {
    var options = (arguments.length > 1 && arguments[1] !== undefined) ? arguments[1] : null;


    console.log("hello!");


};
