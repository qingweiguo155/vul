<template>
  <div class="about">
    <el-card class="box-card">
      <div>
        <el-row>
          <el-col :span="4">厂商</el-col>
          <el-col :span="4">型号</el-col>
          <el-col :span="4">漏洞类型</el-col>
          <el-col :span="4">参考链接</el-col>
          <el-col :span="4">其他</el-col>
          <el-col :span="4">其他</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="4"></el-col>
          <el-col :span="4"></el-col>
          <el-col :span="4"></el-col>
          <el-col :span="4"></el-col>
          <el-col :span="4"></el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>


<style lang="sass" scoped>
  .about
    height: 200px
    padding: 0px 0 20px 0
    .box-card
      width: 100%
      height: 100px
      margin-top: 10px

</style>