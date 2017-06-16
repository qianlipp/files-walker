/**
 * Created by qianlipp on 2017/6/16.
 */
'use strict';

var fs = require("fs");
var path = require('path');

/**
 * 是否以指定字符结尾
 * @param srcStr
 * @param dstStr
 */
var isEndWith = function (srcStr, dstStr) {
    if (srcStr == null || dstStr == null) {
        return false;
    }
    return (srcStr.indexOf(dstStr) + dstStr.length) == srcStr.length;
};

/**
 * 路径是否存在
 * @param path
 * @returns {boolean}
 */
var pathExistsSync = function (path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * 找到所有文件
 * @param rootPath
 * @param callback 文件目录、文件名
 */
var find = function (rootPath, callback) {
    //如果路径不存在，不要往下走了
    if (!pathExistsSync(rootPath)) {
        return;
    }
    var stat = fs.lstatSync(rootPath);
    if (stat.isDirectory()) {
        //是文件夹，找他下面的列表继续遍历
        rootPath = isEndWith(rootPath, "/") ? rootPath : rootPath + "/";
        var items = fs.readdirSync(rootPath);
        for (var key in items) {
            find(rootPath + items[key]);
        }
    } else {
        //是文件了，准备回调
        callback(path.dirname(rootPath), path.basename(rootPath));
    }
};

/**
 * 筛选条件是否可以通过
 * @param options
 * @param path
 * @param filename
 */
var canThroughFilter = function (options, path, filename) {
    if (options == null || options == undefined){
        return true;
    }

};

/**
 * 有筛选条件的查找文件
 * @param rootPath
 * @param options
 * @param callback
 */
var findWithOptions = function (rootPath, options, callback) {
    find(rootPath, function (path, filename) {

    })
};


module.exports = {
    find: find,
    findWithOptions: findWithOptions
};