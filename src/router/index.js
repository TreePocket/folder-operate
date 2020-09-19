/*
 * @Author: your name
 * @Date: 2020-09-18 09:14:11
 * @LastEditTime: 2020-09-19 15:14:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/router/index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";
import { localData } from "../plugins/storage";
import { Message } from "element-ui";

Vue.use(VueRouter);

//解决路由重复点击报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: (resolve) => require(["../layouts/Home.vue"], resolve),
    meta: {
      keepAlive: true, // 需要被缓存
    },
    children: [

    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//       router.replace(targetPath);
//   }
// })

export default router;

// 路由拦截 判断登录信息是否存在
// const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  next();
  // let userInfo = localData("get", "userInfo");
  // if (userInfo && userInfo.username) {
  //   //判断token有没有过期
  //   if (to.path != "/login") {
  //     let value = new Date().getTime() - userInfo.timestamp;
  //     if (value >= 2 * 3600 * 1000) {
  //       localData("clean", "userInfo");
  //       next("/login");
  //       Message({
  //         message: "登录过期，请重新登录",
  //         type: "info",
  //       });
  //     } else {
  //       next();
  //     }
  //   } else {
  //     next();
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // }
});
