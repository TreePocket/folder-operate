/*
 * @Author: your name
 * @Date: 2020-09-16 16:11:40
 * @LastEditTime: 2020-09-19 15:10:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/config/config.js
 */

const hzhService = 'http://192.168.2.129:8090/auth-service';
// const fmlService = 'http://192.168.2.40:8090/auth-service';
const Service = '/api/auth-service/';
const config = {
    baseUrl: process.env.NODE_ENV === 'production' ? Service : hzhService,
    fileUploadUrl: process.env.NODE_ENV === 'production' ? Service : (hzhService + '/upload')
}
export default config