<template>
  <div>
    <el-upload
      v-if="fileType !== '上传附件'"
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :action="baseUrlI + '/api162/dalirobotcms/ajax/cameraData.php'"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 7rem; height: 7rem" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-upload
      :action="baseUrlI + '/api162/dalirobotcms/ajax/cameraData.php'"
      v-if="fileType === '上传附件'"
      class="avatar-uploader"
      :show-file-list="true"
      :on-success="handleAvatarSuccessfile"
      accept=".zip"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :file-list="fileList"
    >
      <div style="display: flex">
        <span style="width: 10rem; margin: 0.3rem -1rem 0 -0.3rem; font-size: 1.4rem"
          >上传附件</span
        >
        <div class="uploadFile">&#xe6d5;</div>
      </div>
    </el-upload>
    <slot v-if="fileType !== '上传附件'"></slot>
  </div>
</template>
<script>
export default {
  name: 'UploadImag',
  props: ['fType'],
  data() {
    return {
      imageUrl: '',
      fileType: this.fType,
      fileList: [],
      formData: new FormData(),
      baseUrlI: window.location.origin,
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`)
    },

    handleAvatarSuccess(res, file) {
      const _this = this
      if (_this.fileType === '铭牌图片') {
        _this.formData.append('plate', file.raw)
      } else if (_this.fileType === '正面图信息') {
        _this.formData.append('front', file.raw)
      } else if (_this.fileType === '背面图信息') {
        _this.formData.append('back', file.raw)
      } else if (_this.fileType === '左侧图信息') {
        _this.formData.append('left', file.raw)
      } else if (_this.fileType === '右侧图信息') {
        _this.formData.append('right', file.raw)
      }

      // formData.append('file', file.raw)
      _this.imageUrl = URL.createObjectURL(file.raw)
      console.log(file.raw)
      _this.$bus.$emit('pic', _this.formData)
    },
    handleAvatarSuccessfile(res, file) {
      const _this = this
      _this.formData.append('attachment', file.raw)
      // formData.append('file', file.raw)
      // console.log(file.raw,'图片信息')
      _this.$bus.$emit('pic', _this.formData)
    },
    beforeAvatarUpload(file) {
      // console.log(file, file.type, 'filefile')
      const isJPG = file.type
      const isLt2M = file.size / 1024 / 1024 < 3

      if (isJPG !== 'image/jpeg' && isJPG !== 'image/png') {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
  mounted() {
    const _this = this
    // console.log(_this.fileType, ' fType')
    _this.$bus.$on('showEdit', function (msg) {
      // console.log(msg)
      if (_this.fileType === '铭牌图片') {
        _this.imageUrl = 'http://192.168.124.162' + msg.plate
      } else if (_this.fileType === '上传附件') {
        _this.fileList = [{ name: msg.attachment, url: 'http://192.168.124.162' + msg.attachment }]
      } else if (_this.fileType === '正面图信息') {
        _this.imageUrl = 'http://192.168.124.162' + msg.front
      } else if (_this.fileType === '背面图信息') {
        _this.imageUrl = 'http://192.168.124.162' + msg.back
      } else if (_this.fileType === '左侧图信息') {
        _this.imageUrl = 'http://192.168.124.162' + msg.left
      } else if (_this.fileType === '右侧图信息') {
        _this.imageUrl = 'http://192.168.124.162' + msg.right
      }
    })
  },
  beforeDestroy() {
    const _this = this
    _this.$bus.$off('showEdit')
  },
}
</script>
<style scoped lang="scss">
@font-face {
  font-family: 'iconfont'; /* Project id  */
  src: url('../../../../fonts/iconfont.ttf?t=1667193127273') format('truetype');
}
.uploadFile {
  width: 26rem;
  height: 2.8rem;
  background-color: #14357c;
  color: #fff;
  font-family: 'iconfont' !important;
  text-align: right;
  padding: 1rem 0.6rem;
  box-sizing: border-box;
  font-size: small;
}
.avatar-uploader-icon {
  font-size: 2.5rem;
  color: #040b1e;
  width: 6.9rem;
  height: 7rem;
  line-height: 7rem;
  text-align: center;
  border: 0.1rem solid #144e94;
  border-radius: 1rem;
}
.avatar {
  width: 17.8rem;
  height: 17.8rem;
  display: block;
}
</style>
