<template>
  <div>
    <a-space style="width: 100%; margin-bottom: 8px">
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate">
        新增
      </a-button>
    </a-space>
    <a-tree
      v-if="treeData.length"
      show-line
      :treeData="treeData"
      :fieldNames="{ title: 'name', key: 'key', children: 'children' }"
      :selectedKeys="selectedKeys"
      :defaultExpandAll="true"
      @select="onSelect"
    >
      <template #title="{ name, key }">
        <span v-if="key === '0-0-1'" style="color: #1890ff">{{ name }}</span>
        <template v-else>{{ name }}</template>
      </template>
    </a-tree>
  </div>
  <DepartModel @register="registerModal" @success="onSuccess" :tData="tdata" />
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Tree, Space } from 'ant-design-vue';
  import { DepartTreeSync } from './depart.api';
  import DepartModel from './DepartModel.vue';
  import { useModal } from '/@/components/Modal';
  export default defineComponent({
    name: 'DepartTreeLeft',
    components: {
      DepartModel,
      [Tree.name]: Tree,
      [Space.name]: Space,
    },
    emits: ['select', 'rootTreeData'],
    setup(_, { emit }) {
      // 部门树列表数据
      const treeData = ref<any[]>([]);
      // 当前选中的项
      const selectedKeys = ref<any[]>([]);
      const expandedKeys = ref<any[]>([]);
      // 树组件重新加载
      const treeReloading = ref<boolean>(false);
      const tdata = ref<any[]>([]);
      async function loadRootTreeData() {
        let tree = await DepartTreeSync();
        console.log(tree);
        treeData.value = tree;
        console.log(treeData);
        tdata.value = tree;
        emit('rootTreeData', treeData.value);
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      function onSuccess() {
        loadRootTreeData();
      }

      const [registerModal, { openModal }] = useModal();

      function handleCreate() {
        console.log(treeData);
        openModal(true, {
          isUpdate: false,
        });
      }

      onMounted(() => {
        loadRootTreeData();
      });
      function setSelectedKey(key: string, data?: any) {
        console.log(data);
        selectedKeys.value = [key];
        if (data) {
          if (data.dataRef.children != null) {
            expandedKeys.value = [key];
          }
          emit('select', data);
        }
      }

      // 树选择事件
      function onSelect(selKeys, event) {
        console.log(selKeys, event);
        if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
          setSelectedKey(selKeys[0], event.selectedNodes[0].props);
        } else {
          // 这样可以防止用户取消选择
          setSelectedKey(selectedKeys.value[0]);
        }
      }

      return {
        registerModal,
        onSuccess,
        treeData,
        handleSelect,
        handleCreate,
        loadRootTreeData,
        treeReloading,
        setSelectedKey,
        onSelect,
        selectedKeys,
        tdata,
      };
    },
  });
</script>
