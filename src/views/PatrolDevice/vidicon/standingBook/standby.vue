<a href="javascript:;" v-if="item === '导入'" class="Exporta">
  <span class="btnExport">
    <!-- :on-success="handleSuccess" -->
    <el-button
      type="primary"
      style="left: -5px; top: -4px; position: absolute"
      @click="exportHandle"
      >导入</el-button
    >
    <el-dialog title="导入台账信息" :visible.sync="exportDialog" width="30%">
      <el-upload
        :limit="3"
        action="http://127.0.0.1:7777/api162/dalirobotcms/ajax/cameraData.php"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >
        <div style="margin: 1.5rem">
          <el-button type="primary">导入</el-button>
        </div>
      </el-upload>
      <div>
        <!-- <el-button type="primary" @click="uploadFiles">下载模板</el-button>
        <p>导出文件也可作为导入模板</p> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportDialog = false">取 消</el-button>
        <el-button type="primary" @click="exportDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</a>
