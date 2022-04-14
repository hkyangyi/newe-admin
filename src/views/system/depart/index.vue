<template>
  <a-row type="flex" :gutter="10">
    <a-col :xl="12" :lg="24" :md="24" style="margin-bottom: 10px;"></a-col>
    <a-col :xl="12" :lg="24" :md="24" style="margin-bottom: 10px;"> </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SystemDepart',
    components: {},
    setup() {
      return {};
    },
  });
</script>

<style lang="less">
  @import "./index.less";
</style>
