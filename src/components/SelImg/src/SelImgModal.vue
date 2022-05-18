<template>
  <div>
    <BasicModal
      width="800px"
      title="选择图片"
      v-bind="$attrs"
      @register="register"
      :maskClosable="false"
      :keyboard="false"
      wrapClassName="upload-modal"
      :footer="null"
    >
      <div style="height: 537px">
        <a-row :gutter="10" style="height: 100%">
          <a-col :span="8">
            <a-upload-dragger
              name="file"
              accept=".jpg,.jpeg,.png"
              :multiple="true"
              :customRequest="SelImages"
              :showUploadList="false"
            >
              <div class="uplistbox">
                <div v-if="FileList.length == 0">点击选择图片或拖拽到该区域</div>
                <li v-for="(item, index) in FileList" :key="index">
                  <div class="title">
                    <span> {{ item.name }}</span>
                    <i>{{ item.message }}</i>
                  </div>
                  <a-progress :percent="item.step" :status="item.step == 1 ? 'success' : 'active'" />
                </li>
              </div>
            </a-upload-dragger>
          </a-col>
          <a-col :span="16">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane :key="1" tab="正在上传">
                <ul class="pic-box">
                  <li
                    v-for="(item, index) in FileList"
                    :key="index"
                    :class="item.status != 1 ? 'uploading' : ''"
                    @click="HandleSel(item)"
                  >
                    <a>
                      <img :src="item.url" alt="" class="img-thumbnail default-pic" width="100%" />
                    </a>
                    <p>{{ item.message }}</p>
                  </li>
                </ul>
              </a-tab-pane>
              <a-tab-pane :key="2" tab="所有图片" force-render>
                <a-spin tip="Loading..." :spinning="PageList.Loading">
                  <ul class="pic-box">
                    <li v-for="(item, index) in PageList.items" :key="index" @click="HandleSel(item)">
                      <a>
                        <img :src="item.url" alt="" class="img-thumbnail default-pic" width="100%" />
                      </a>
                    </li>
                  </ul>
                  <a-pagination
                    v-model:current="PageList.page"
                    :defaultPageSize="PageList.pagesize"
                    :total="PageList.total"
                    @change="GetPage"
                    show-less-items
                  />
                </a-spin>
              </a-tab-pane>
            </a-tabs>
          </a-col>
        </a-row>
      </div>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { Card, Row, Col, Upload, Progress, Tabs, Pagination, Spin } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Upimages, GetImages } from '/@/api/sys/upload';

  export default defineComponent({
    components: {
      BasicModal,
      [Row.name]: Row,
      [Col.name]: Col,
      [Card.name]: Card,
      [Upload.name]: Upload,
      [Upload.Dragger.name]: Upload.Dragger,
      [Progress.name]: Progress,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      [Pagination.name]: Pagination,
      [Spin.name]: Spin,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [register, { closeModal }] = useModalInner(async (data) => {
        console.log('111111111111', data);
      });

      const activeKey = ref<number>(2);
      const PageList = reactive({
        items: [],
        total: 0,
        page: 1,
        pagesize: 20,
        Loading: false,
      });

      const FileList = ref<any[]>([]);

      const SelImages = (field) => {
        activeKey.value = 1;
        console.log('选择文件', field);
        let i = FileList.value.length;
        var item = {
          name: field.file.name,
          uid: field.file.uid,
          status: 0,
          step: 0,
          url: window.URL.createObjectURL(field.file),
          path: '',
          message: '',
        };
        FileList.value.push(item);

        Upimages(field, (res) => {
          FileList.value[i].step = res;
          FileList.value[i].message = '正在上传:' + res + '%';
          console.log('上传精度', res);
        })
          .then((res) => {
            console.log(res);
            FileList.value[i].status = 1;
            FileList.value[i].url = res.url;
            FileList.value[i].message = '上传成功';
          })
          .catch((res) => {
            console.log(res);
            FileList.value[i].message = '上传失败';
            FileList.value[i].status = -1;
          });
      };

      async function Loadimg(page) {
        PageList.Loading = true;
        var params: Object = { pageSize: 20, page: page };
        GetImages(params).then((res) => {
          PageList.page = res.page;
          PageList.items = res.list;
          PageList.total = res.total;
          PageList.Loading = false;
        });
      }

      async function HandleSel(item) {
        console.log(item);
        emit('success', item.url);
        closeModal();
      }
      const GetPage = (page, _) => {
        PageList.Loading = true;
        Loadimg(page);
      };
      Loadimg(1);

      return {
        SelImages,
        register,
        PageList,
        activeKey,
        HandleSel,
        FileList,
        GetPage,
      };
    },
  });
</script>
<style lang="less">
  .upload-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }

    &-toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      &__btn {
        margin-left: 8px;
        text-align: right;
        flex: 1;
      }
    }
  }
  .ant-pagination {
    text-align: center;
  }
  /* line 315, ../sass/style.scss */
  .pic-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    padding-right: 15px;
    margin: 0;
    box-sizing: border-box;
    height: 413px;
      overflow: auto;
    align-content: flex-start;
  }
  /* line 320, ../sass/style.scss */
  .pic-box li {
    list-style: none;
    width: 20%;
    padding: 3px;
    position: relative;
        height: 103px;
      display: table-cell;
      vertical-align: middle;
  }
  /* line 326, ../sass/style.scss */
  .pic-box li .default-pic {
    width: 100%;
    max-height: 200px;
  }

  /* line 333, ../sass/style.scss */
  .pic-box li p {
    display: none;
  }
  /* line 338, ../sass/style.scss */
  .pic-box li.uploading:before {
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 3px;
    right: 3px;
    top: 3px;
    left: 3px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  /* line 352, ../sass/style.scss */
  .pic-box li.uploading p {
    display: block;
    color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 18px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .pic-box li .img-thumbnail {
    padding: 4px;
    line-height: 1.428571429;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }

  .uplistbox {
    padding: 0 10px;
    height: 100%;
    overflow: auto;
  }

  .uplistbox :first-child {
    border: none;
  }
  .uplistbox li {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    border-top: 1px dashed #ccc;
  }

  .uplistbox li .title {
    width: 100%;
    height: 15px;
  }
  .uplistbox li .title i {
    font-size: 8px;
    color: #585858;
    text-shadow: none;
    line-height: 15px;
    font-style: inherit;
    float: right;
  }

  .uplistbox li .title span {
    font-size: 12px;
    color: rgb(61, 61, 61);
    text-shadow: none;
    line-height: 15px;
    float: left;
  }

  .ant-modal-body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .ant-upload.ant-upload-drag .ant-upload-drag-container {
    display: table-cell;
    vertical-align: baseline;
  }

  .ant-upload-list {
    display: none;
    width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 10px;
  }
</style>
