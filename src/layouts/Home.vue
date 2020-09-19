<!--
 * @Author: your name
 * @Date: 2020-09-16 16:02:26
 * @LastEditTime: 2020-09-19 16:20:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/layouts/Home.vue
-->
<template>
  <div class="wrap">
    <primary-view>
      <primary-table :tips="tips">
        <i
          slot="btn-slot"
          v-show="fileStack.count !== 1"
          class="btn icon-btn-back right"
          @click="backToParent()"
        ></i>
        <i slot="btn-slot" class="btn icon-btn-delete right" @click="deleteAction()"></i>
        <i slot="btn-slot" class="btn icon-btn-add right" @click="addAction()"></i>
        <div class="folder-list clearfix">
          <folder-item
            class="left"
            @click.native="itemClick(index)"
            @dblclick.native="jumpInto(index,item)"
            v-for="(item,index) in fileList"
            :fileData="item"
            :key="item.id"
            :title="item.name"
            :isChecked="item.isChecked"
          ></folder-item>
        </div>
      </primary-table>
    </primary-view>

    <el-dialog :visible.sync="folderDialog" width="400px" center :before-close="handleFolderClose">
      <div slot="title" class="dialog-title">
        <strong>添加目录</strong>
      </div>
      <el-form ref="folderForm" :model="folderForm" label-width="100px">
        <el-form-item label prop="id" style="display:none">
          <el-input v-model="folderForm.id"></el-input>
        </el-form-item>
        <el-form-item label prop="parentId" style="display:none">
          <el-input v-model="folderForm.parentId"></el-input>
        </el-form-item>
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="folderForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-row :gutter="20">
          <div class="form-footer">
            <el-button class="form-btn save-btn" type="primary" @click="saveFolder">保存</el-button>
            <el-button class="form-btn cancel-btn" @click="handleFolderClose">取消</el-button>
          </div>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PrimaryView, PrimaryTable } from "@/components/";
import FolderItem from "./components/FolderItem";
export default {
  name: 'Home',
  props: {

  },
  data() {
    return {
      folderList: [
        {
          "id": "3341a2d9-88b8-4662-9291-c9a18e885a1c",
          "name": "小电影",
          "parentId": null,
          "fileIds": "28ad5f96-5231-4f8f-98b9-441ed801e506",
          "deleted": false,
          "createId": null,
          "updateId": null,
          "createTime": "2020-09-15T12:01:31.000+0000",
          "updateTime": "2020-09-15T12:01:31.000+0000",
          "fileList": [
            {
              "id": "28ad5f96-5231-4f8f-98b9-441ed801e506",
              "fileName": "微信图片_20200807170120.jpg",
              "fileUrl": "",
              "fileType": "jpg",
              "fileSize": 141.5,
              "deleted": false,
              "createId": "fcf34b56-a7a2-4719-9236-867495e74c31",
              "updateId": null,
              "createTime": "2020-09-15T08:16:02.000+0000",
              "updateTime": "2020-09-15T08:15:57.000+0000",
              "userName": "admin"
            }
          ],
          "children": [
            {
              "id": "7423a930-2e4c-487d-9dd8-c1271c185eb9",
              "name": "短视频",
              "parentId": "3341a2d9-88b8-4662-9291-c9a18e885a1c",
              "fileIds": null,
              "deleted": false,
              "createId": null,
              "updateId": null,
              "createTime": "2020-09-15T12:01:57.000+0000",
              "updateTime": "2020-09-15T12:01:57.000+0000",
              "fileList": null,
              "children": []
            }
          ]
        },
        {
          "id": "463e297a-7da6-40f8-9afe-4569801d650d",
          "name": "测试目录2",
          "parentId": null,
          "fileIds": null,
          "deleted": false,
          "createId": null,
          "updateId": null,
          "createTime": "2020-09-17T02:13:06.000+0000",
          "updateTime": "2020-09-17T02:13:06.000+0000",
          "fileList": null,
          "children": [
            {
              "id": "1ed5492e-7efd-489a-8831-68cefcdca04e",
              "name": "测试3",
              "parentId": "463e297a-7da6-40f8-9afe-4569801d650d",
              "fileIds": null,
              "deleted": false,
              "createId": null,
              "updateId": null,
              "createTime": "2020-09-17T06:25:17.000+0000",
              "updateTime": "2020-09-17T06:25:17.000+0000",
              "fileList": null,
              "children": []
            },
            {
              "id": "d45bf833-35d0-4387-8372-d0e3bca993be",
              "name": "测试5",
              "parentId": "463e297a-7da6-40f8-9afe-4569801d650d",
              "fileIds": null,
              "deleted": false,
              "createId": null,
              "updateId": null,
              "createTime": "2020-09-17T06:32:59.000+0000",
              "updateTime": "2020-09-17T06:32:59.000+0000",
              "fileList": null,
              "children": []
            }
          ]
        }],
      total: 1,
      tips: "当前未选中数据,勾选可进行批量操作",
      fileStack: {//文件栈
        count: 0,
        items: {}
      },
      fileArr: [],
      folderIdList: [],
      folderDialog: false,
      folderForm: {
        id: '',
        parentId: '',
        name: ''
      }
    };
  },
  components: {
    PrimaryView,
    PrimaryTable,
    FolderItem
  },
  computed: {
    fileList: {
      get: function () {
        return this.stackPeek()
      },
    }
  },
  mounted() {
    this._getSysAchievement();
  },
  methods: {
    itemClick(index) {
      const tempArr = this.stackPop();
      tempArr[index].isChecked = !tempArr[index].isChecked;
      this.stackPush(tempArr);
      // this.fileList[index].isChecked = !this.fileList[index].isChecked;
      let count = 0;
      this.fileList.map(item => {
        if (item.isChecked) {
          count++;
        }
      })
      this.tips = count > 0 ? `已选${count}条数据,可对${count}条数据进行批量操作` : '当前未选中数据,勾选可进行批量操作';
    },
    //双击文件夹进入
    jumpInto(index, item) {
      if (!item.type) {
        this.stackPush(this.fileList[index].children);
        this.folderIdList.push(item.id);
      }
    },
    //返回上一级
    backToParent() {
      this.stackPop();
      this.folderIdList.pop();
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    handleFolderClose() {
      this.folderDialog = false;
      this.$refs.folderForm.resetFields();
    },
    //新建文件夹操作
    async addAction() {
      this.folderDialog = true;
    },
    async saveFolder() {

      this.folderForm.parentId = this.folderIdList[this.folderIdList.length - 1];
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      //这里新生成的id用时间戳代替一下 实际情况调用新增接口让后端返
      const foldId = new Date().getTime() + '';
      const opt = {
        name: this.folderForm.name,
        id: foldId,
        children: []
      }
      this.updateItemById(this.fileStack.items[0], this.folderIdList[this.folderIdList.length - 1], opt, 'add');
      this.handleFolderClose();

    },
    deleteAction() {
      let deleteIds = [];
      this.fileList.map(item => {
        if (item.isChecked) {
          deleteIds.push(item.id);
        }
      })
      if (deleteIds.length > 0) {
        this.$confirm("此操作将删除选中目录及其子目录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const ids = deleteIds.join(",");
          this.$message({
            type: 'success',
            message: "删除成功"
          })
          const opt = {
            id: ids,
          }
          this.updateItemById(this.fileStack.items[0], this.folderIdList[this.folderIdList.length - 1], opt, 'delete');
          const value = this.fileList.filter(i => i.id !== ids);
          this.$nextTick(() => {
            this.stackPop();
            this.stackPush(value)
          })
        })
      } else {
        this.$message.info('请选中要删除的文件夹')
      }

    },
    //更新栈信息 type add新增 delete删除
    updateItemById(arr, parentId, item, type) {
      //如果是最顶层 
      console.log(item.id)
      if (parentId == null) {
        if (type === 'add') {
          arr.push(item);
        } else if (type === 'delete') {
          arr = arr.filter(i => i.id !== item.id)
        }
        return true
      }
      //非顶层时
      if (arr.length === 0) return false
      for (let i = 0; i < arr.length; i++) {
        //查找文件夹
        if (arr[i].id === parentId) {
          if (type === 'add') {
            arr[i].children.push(item);
          } else if (type === 'delete') {
            arr[i].children = arr[i].children.filter(i => i.id !== item.id)
          }
          return true;
        }
        //递归子文件夹
        if (arr[i].children && arr[i].children.length > 0) {
          if (this.updateItemById(arr[i].children, parentId, item, type)) return true
        }
      }
    },
    handleSelectionChange(val) {
      this.tips = val.length > 0 ? `已选${val.length}条数据，可对${val.length}条数据进行批量操作` : "当前未选中数据,勾选可进行批量操作";
    },
    //入栈
    stackPush(element) {
      this.fileStack.items[this.fileStack.count] = element;
      this.fileStack.count++;
    },
    //出栈
    stackPop() {
      if (this.fileStack.count === 0) {
        return false;
      }
      this.fileStack.count--;
      const result = this.fileStack.items[this.fileStack.count];
      delete this.fileStack.items[this.fileStack.count]
      return result;
    },
    //返回栈顶元素
    stackPeek() {
      if (this.fileStack.count === 0) {
        return [];
      }
      return this.fileStack.items[this.fileStack.count - 1];
    },
    async _getSysAchievement() {
      this.fileArr = this.folderList;
      this.formatArr(this.fileArr);
      if (this.fileArr.length > 0) {
        this.stackPush(this.fileArr);
      }
      this.folderIdList = [null];
    },
    //递归格式化文件数组
    formatArr(arr) {
      if (arr.length === 0) return;
      for (let i = 0; i < arr.length; i++) {
        let concatArr = [];
        if (arr[i].fileList && arr[i].fileList != null && arr[i].fileList.length > 0) {
          arr[i].fileList.map(item => {
            item.type = "file";
          })
          concatArr = arr[i].children.concat(arr[i].fileList)
        } else {
          concatArr = arr[i].children
        }
        this.formatArr(arr[i].children);
        arr[i].children = concatArr;
        arr.map(item => {
          item.isChecked = false;
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.file-manage {
  padding: 16px;
  ::v-deep .table-content {
    @include flexbox;
    @include flexflow(column, wrap);
    overflow: auto;
    .folder-list {
      @include flex(1);
      overflow: auto;
    }
  }
}
</style>