/*
 * @Author: your name
 * @Date: 2020-09-15 10:16:24
 * @LastEditTime: 2020-09-19 15:42:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/utils/filter.js
 */

import Vue from 'vue'

Vue.filter('dateTimeFormat', function (value) {
    if (!value) return ''
    return new Date(value).format("yyyy-MM-dd hh:mm:ss")
})
