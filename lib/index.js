/**
 * Created by qianlipp on 2017/6/16.
 */
'use strict';

//异步遍历
var walk = require('./walk.js');
//同步遍历
var walkSync = require('./walkSync.js');

module.exports = {
    walk: walk,
    walkSync: walkSync
};