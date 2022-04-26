<template>
  <Spin :spinning="loading">
    <template v-if="treeData.length > 0">
      <BasicTree
        ref="basicTree"
        checkable
        :fieldNames="{ title: 'name', key: 'id', children: 'children' }"
        :treeData="treeData"
        :checkedKeys="checkedKeys"
        :selectedKeys="selectedKeys"
        :expandedKeys="expandedKeys"
        :checkStrictly="checkStrictly"
        style="height: 500px; overflow: auto"
        @check="onCheck"
        @expand="onExpand"
      >
        <template #title="{ name, key }">
          <span>{{ name }} {{ key }}</span>
        </template>
      </BasicTree>
    </template>
    <Empty v-else description="无可配置部门权限" />
    <div class="j-box-bottom-button offset-20" style="margin-top: 30px">
      <div class="j-box-bottom-button-float">
        <a-dropdown :trigger="['click']" placement="topCenter">
          <template #overlay>
            <a-menu>
              <a-menu-item key="3" @click="toggleCheckALL(true)">全部勾选</a-menu-item>
              <a-menu-item key="4" @click="toggleCheckALL(false)">取消全选</a-menu-item>
              <a-menu-item key="5" @click="toggleExpandAll(true)">展开所有</a-menu-item>
              <a-menu-item key="6" @click="toggleExpandAll(false)">收起所有</a-menu-item>
            </a-menu>
          </template>
          <a-button style="float: left" preIcon="ant-design:up-outlined">树操作</a-button>
        </a-dropdown>
        <a-button type="primary" preIcon="ant-design:save-filled" @click="onSubmit()">
          保存
        </a-button>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree/index';
  import { queryRoleTreeList } from './depart.api';
  import { Spin, Empty, Tree, Dropdown, Menu } from 'ant-design-vue';
  export default defineComponent({
    name: 'DepartRules',
    components: {
      BasicTree,
      Spin,
      Empty,
      [Tree.name]: Tree,
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
    },
    props: {
      data: { type: Object, default: () => ({}) },
      rootTreeData: { type: Array, default: () => [] },
    },
    emits: ['success'],
    setup(props, { emit }) {
      console.log(props, emit);
      const loading = ref<boolean>(false);
      const treeData = ref<TreeItem[]>([]);
      async function loadData() {
        console.log(1111111111111111111111111);
        let td = await queryRoleTreeList({});
        treeData.value = td;
        console.log(treeData);
        await nextTick();
        toggleExpandAll(true);
      }

      loadData();

      const basicTree = ref();
      const expandedKeys = ref<Array<any>>([]);
      const selectedKeys = ref<Array<any>>([]);
      const checkedKeys = ref<Array<any>>([]);
      const checkStrictly = ref(true);

      // tree勾选复选框事件
      function onCheck(event) {
        if (!Array.isArray(event)) {
          checkedKeys.value = event.checked;
        } else {
          checkedKeys.value = event;
        }
      }

      // tree展开事件
      function onExpand($expandedKeys) {
        expandedKeys.value = $expandedKeys;
      }

      // 切换父子关联
      async function toggleCheckStrictly(flag) {
        checkStrictly.value = flag;
        await nextTick();
        checkedKeys.value = basicTree.value.getCheckedKeys();
      }

      // 切换展开收起
      async function toggleExpandAll(flag) {
        basicTree.value.expandAll(flag);
        await nextTick();
        expandedKeys.value = basicTree.value.getExpandedKeys();
      }

      // 切换全选
      async function toggleCheckALL(flag) {
        basicTree.value.checkAll(flag);
        await nextTick();
        checkedKeys.value = basicTree.value.getCheckedKeys();
        console.log(checkedKeys);
      }

      async function onSubmit() {
        console.log('submit');
      }

      return {
        loading,
        treeData,
        basicTree,
        toggleExpandAll,
        toggleCheckALL,
        onCheck,
        onExpand,
        toggleCheckStrictly,
        expandedKeys,
        checkedKeys,
        selectedKeys,
        checkStrictly,
        onSubmit,
      };
    },
  });
</script>
