<!--
 * @Author: your name
 * @Date: 2020-09-10 16:38:25
 * @LastEditTime: 2020-09-19 15:43:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/components/primary_view/index.vue
-->

<template>
  <div class="primary-view" :class="[pageName ? pageName + '-page' : '']">
    <p v-if="title">
      {{title}}
      <span class="right-area">
        <slot name="desc"></slot>
      </span>
    </p>
    <div v-if="typeChange" class="type-change">
      <i
        @click="changeModule('pic')"
        title="缩略图"
        :class="[typeSelect === 'pic' ? 'icon-chart-active-icon' :'icon-chart-icon']"
      ></i>
      <i
        @click="changeModule('list')"
        title="列表"
        :class="[typeSelect === 'list' ? 'icon-list-active-icon' :'icon-list-icon']"
      ></i>
    </div>
    <div class="view-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrimaryView',
  props: {
    title: String,
    pageName: String,
    typeChange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      typeSelect: 'pic'
    };
  },
  components: {

  },
  mounted() {

  },
  methods: {
    changeModule(module) {
      this.typeSelect = module;
      this.$emit("changeModule", module);
    }
  }
}
</script>

<style lang='scss' scoped>
$primaryview-titleHeight: 20px;
.primary-view {
  padding: 16px;
  width: 100%;
  height: 100%;
  background: #fff;
  font-weight: bold;
  p {
    font-weight: bold;
    height: $primaryview-titleHeight;
    display: flex;
    justify-content: space-between;
  }
  .type-change {
    @include flexbox;
    @include flexJC(flex-end);
    i {
      display: block;
      width: 14px;
      height: 14px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
  .view-content {
    height: calc(100% - #{$primaryview-titleHeight});
    padding: 10px;
  }
}
</style>
