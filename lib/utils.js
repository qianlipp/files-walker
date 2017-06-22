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
 * 是否以指定字符结尾
 * @param srcStr
 * @param dstStr
 */
var isStartWith = function (srcStr, dstStr) {
    if (srcStr == null || dstStr == null) {
        return false;
    }
    return (srcStr.indexOf(dstStr) == 0);
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
            find(rootPath + items[key], callback);
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
    //没有选项，返回true
    if (options == null || options == undefined) {
        return true;
    }
    //包含判定
    if (options.contain != undefined) {
        if ((path + filename).indexOf(options.contain) == -1) {
            return false;
        }
    }
    //不包含判定
    if (options.not_contain != undefined) {
        if ((path + filename).indexOf(options.not_contain) > -1) {
            return false;
        }
    }
    //以xxx开始
    if (options.start_with != undefined) {
        if (!isStartWith(path + filename, options.start_with)) {
            return false;
        }
    }
    //不是以xxx开始
    if (options.not_start_with != undefined) {
        if (isStartWith(path + filename, options.not_start_with)) {
            return false;
        }
    }
    //以xxx结尾
    if (options.end_with != undefined) {
        if (!isEndWith(path + filename, options.end_with)) {
            return false;
        }
    }
    //不是以xxx结尾
    if (options.not_end_with != undefined) {
        if (isEndWith(path + filename, options.not_end_with)) {
            return false;
        }
    }
    //自定义过滤器
    if (options.filter != undefined) {
        return options.filter(path, filename);
    }
    return true;
};

/**
 * 有筛选条件的查找文件
 * @param rootPath
 * @param options
 * @param callback
 */
var findWithOptions = function (rootPath, options, callback) {
    find(rootPath, function (path, filename) {
        if (canThroughFilter(options, path, filename)) {
            callback(path, filename);
        }
    })
};


module.exports = {
    find: find,
    findWithOptions: findWithOptions
};