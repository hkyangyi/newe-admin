<template>
  <div>
    <PageWrapper>
      <div class="flex">
        <div class="w-2/5 bg-white p-4">
          <DepartLeftTree ref="leftTree" @select="onTreeSelect" @rootTreeData="onRootTreeData" />
        </div>
        <div class="w-3/5 bg-white ml-4 p-4">
          <div style="height: 100%; background-color: white">
            <a-tabs v-show="departData != null" defaultActiveKey="base-info">
              <a-tab-pane tab="基本信息" key="base-info" forceRender style="position: relative">
                <DepartFormModel :data="departData" :rootTreeData="rootTreeData" @success="onSuccess" />
              </a-tab-pane>
              <a-tab-pane tab="部门权限" key="role-info">
                <DepartRules />
              </a-tab-pane>
            </a-tabs>
            <div v-show="departData == null" style="padding-top: 40px">
              <Empty description="尚未选择部门" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import DepartLeftTree from './DepartLeftTree.vue';
  import DepartFormModel from './DepartFormModel.vue';
  import DepartRules from './DepartRules.vue';
  import { Tabs, Empty } from 'ant-design-vue';

  export default defineComponent({
    name: 'SystemDepart',
    components: {
      PageWrapper,
      DepartLeftTree,
      DepartFormModel,
      DepartRules,
      Empty,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      // 给子组件定义一个ref变量
      const leftTree = ref();

      // 当前选中的部门信息
      const departData = ref(null);
      const rootTreeData = ref<any[]>([]);

      // 左侧树选择后触发
      function onTreeSelect(data) {
        console.log(data);
        departData.value = data;
      }

      // 左侧树rootTreeData触发
      function onRootTreeData(data) {
        console.log(data);
        rootTreeData.value = data;
      }

      function onSuccess() {
        leftTree.value.loadRootTreeData();
      }

      return {
        leftTree,
        departData,
        rootTreeData,
        onTreeSelect,
        onRootTreeData,
        onSuccess,
      };
    },
  });
</script>

<style lang="less">
  // @import "./index.less";
</style>
