<!--
 * @Author: your name
 * @Date: 2020-09-19 15:24:02
 * @LastEditTime: 2020-09-19 15:43:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/components/primary_table/index.vue
-->

<template>
  <div class="wrap">
    <div class="table-view-head clearfix" v-if="searchShow">
      <span v-if="title">{{ title }}</span>
      <span class="tips" v-if="tips">{{ tipsText }}</span>
      <div class="right search-area">
        <slot name="btn-slot">
          <i class="btn icon-btn-add right" @click="addAction()"></i>
        </slot>
        <div class="input-search right">
          <el-input placeholder="请输入内容" v-model="searchName">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="table-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "PrimaryTable",
  props: {
    title: String,
    tips: String,
    searchShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchName: "",
      tipsText: "",
    };
  },
  watch: {
    tips: function (val) {
      this.tipsText = val;
    },
  },
  components: {},
  mounted() {
    if (this.tips) this.tipsText = this.tips;
  },
  methods: {
    addAction() {
      this.$emit("addAction");
    },
  },
};
</script>

<style lang="scss" scoped>
$tableHeadHeight: 52px;
.wrap {
  padding: 10px 10px 0 10px;
  .table-view-head {
    height: $tableHeadHeight;
    .icon-btn-add {
      width: 80px;
      height: 36px;
    }
    span {
      font-weight: bold;
    }
    .tips {
      font-weight: normal;
      font-size: 14px;
      line-height: $tableHeadHeight;
    }
    .search-area {
      width: fit-content;
    }
  }
  .table-content {
    height: calc(100% - #{$tableHeadHeight});
    .pagination-area {
      padding-top: 20px;
    }
  }
}
</style>
<style lang="scss">
$inputHeightHeight: 36px;
.table-view-head .el-input__inner {
  height: $inputHeightHeight;
  line-height: $inputHeightHeight;
}
</style>
