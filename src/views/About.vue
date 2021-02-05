<template>
  <div class="about">
    <div class="box-info-details">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div class="detailsObj.references" v-for="item in baseInfoList" :key="item.label">
                <div class="base-info">
                  <div>{{item.label}}</div>
                  <div>{{item.value}}</div>
                  <a :href="detailsObj.sourceUrl" target="_blank" v-if="item.icon" :class="item.icon" style="text-decoration: none;margin-left: 10px;font-size: 20px;color: #409eff;cursor: pointer">
                </a>
                </div>
              </div>
              <div class="base-info" v-if="type === 'cve'">
                <div>漏洞类型</div>
                <div>
                    <el-tag v-for="type in detailsObj.vulType" :key="type" size="mini">{{type}}</el-tag>
                </div>
            </div>
                <div class="base-info" v-if="type === 'exb'">
                    <div>漏洞类型</div>
                    <div>
                        <el-tag size="mini">{{detailsObj.tag}}</el-tag>
                    </div>
                </div>
                <div class="base-info" v-if="type === 'cnnvd'">
                    <div>漏洞类型</div>
                    <div>
                        <el-tag v-for="type in detailsObj.vulType" :key="type" size="mini">{{type}}</el-tag>
                    </div>
                </div>
            </el-card>
          </el-col>
          <el-col :span="12" v-if="type === 'cve'">
            <el-card class="box-card">
              <el-collapse v-model="activeNames" >
                <el-collapse-item title="描述" name="1">
                  <div>{{detailsObj.desc}}</div>
                </el-collapse-item>
                <el-collapse-item title="受影响设备" name="2">
                  <el-table
                          :data="detailsObj.cveAffectProductList"
                          border
                          style="width: 100%">
                    <el-table-column
                            prop="vendor"
                            label="厂商"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="product"
                            label="产品"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="productType"
                            label="产品类型"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="version"
                            label="版本号">
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
                <el-collapse-item title="参考链接" name="3">
                  <div v-for="(item, index) in detailsObj.references" :key="index">
                    <div class="base-info">
                      <div>{{item.url}}</div>
                      <div>{{item.desc}}</div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </el-col>

            <el-col :span="12" v-if="type === 'exb'">
                <el-card class="box-card">
                    <el-collapse v-model="activeNames" >
                        <el-collapse-item title="来源URl" name="1">
                            <div>{{detailsObj.sourceUrl}}</div>
                        </el-collapse-item>
                        <el-collapse-item title="漏洞验证" name="2">
                            <diz>{{detailsObj.verified}}</diz>
                        </el-collapse-item>
                        <el-collapse-item title="App下载链接" name="3">
                            <div>{{detailsObj.vulnerableApp}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
            <el-col :span="12" v-if="type === 'cnnvd'">
            <el-card class="box-card">
                <el-collapse v-model="activeNames" >
                    <el-collapse-item title="描述" name="1">
                        <div>{{detailsObj.vulDescription}}</div>
                    </el-collapse-item>
                    <el-collapse-item title="漏洞公告" name="2">
                        <diz>{{detailsObj.vulAdvisory}}</diz>
                    </el-collapse-item>
                    <el-collapse-item title="参考网址" name="3">
                        <div v-for="(item, index) in detailsObj.refWebsite" :key="index">
                            <div class="base-info">
                                <div>{{item.url}}</div>
                                <div>{{item.desc}}</div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
            <el-col :span="12" v-if="type === 'metasploit'">
                <el-card class="box-card">
                    <el-collapse v-model="activeNames" >
                        <el-collapse-item title="描述" name="1">
                            <div>{{detailsObj.description}}</div>
                        </el-collapse-item>
                        <el-collapse-item title="作者" name="2">
                            <div v-for="(item, index) in detailsObj.authors" :key="index">
                                <div class="base-info">
                                    <div>{{item}}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="参考链接" name="3">
                            <div v-for="(item, index) in detailsObj.references" :key="index">
                                <div class="base-info">
                                    <div>{{item}}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
        </el-row>
    </div>

    <div class="menu-tabs">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="知识图谱" name="first">
          <el-card class="box-card-content" shadow="never">
            <!--<v-chart :options="getOptions()" />-->
              <graph-node :id="$route.params.id"/>
          </el-card>
        </el-tab-pane>
          <el-tab-pane label="SVG" name="two">
              <!--"middle"类型, 动画引入animate.css库，白色遮罩，圆形自定义开关按钮，默认菜单颜色配置-->

          </el-tab-pane>
        <el-tab-pane label="可利用脚本" name="fourth">
            <div v-highlight v-if="detailsObj.isFrame">
                <pre>
                    <code>
                        <iframe width="1700" height="2000" frameborder="0" :srcdoc="detailsObj.script"></iframe>
                    </code>
                </pre>
            </div>
            <div v-highlight v-else>
                <pre>
                    <code v-html="detailsObj.script"></code>
                </pre>
            </div>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
    /* eslint-disable */
    import { mapGetters } from 'vuex'
    // import 'highlight.js/styles/atom-one-dark.css' //样式文件
    // import 'highlight.js/styles/atelier-dune-light.css' //样式文件
    import { cveDetails,exbDetails,cnnvdDetails,metasploitDetailss } from '../api'
    // import GraphAll from './graph/GraphAll'
  // import D3Graph from './graph/D3'
    import GraphNode from './graph/GraphNode'



    // import SvgTemplate from './graph/svg'

  export default {
      name: 'About',
      data() {
          return {
              activeName: 'first',
              defaultCss: 'idea',
              activeNames: ['1'],
              detailsObj: {},
              baseInfoList: []
          }
      },
      computed: {
          ...mapGetters([
              'type'
          ])
      },
      components: {
          GraphNode
          // CircleMenu
      },
      methods: {
          // handleChangeCss(val) {
          //
          // },
          getOptions() {
              return {
                  title: {
                      text: '知识图谱',
                  }
              }
          },
          async getDetails() {
                  if(this.type === 'cve') {
                        cveDetails(this.$route.params.id).then(data => {
                          this.detailsObj = data.data
                      }).then(_ => {
                          this.baseInfoList.push({
                              label: 'CVE ID',
                              value: this.detailsObj['cveId'],
                              icon: 'el-icon-link'
                          },{
                              label: '漏洞评分',
                              value: this.detailsObj['riskCode']
                          },{
                              label: '访问权限',
                              value: this.detailsObj['gainAccess']
                          },{
                              label: '发布时间',
                              value: this.detailsObj['publishDate'],
                          },{
                              label: '更新时间',
                              value: this.detailsObj['updateDate'],
                          })
                      })
                  }
                    if (this.type === 'exb') {
                          exbDetails(this.$route.params.id).then(data => {
                              this.detailsObj = data.data
                          }).then(_ => {
                              this.baseInfoList.push({
                                  label: 'CVE ID',
                                  value: this.$route.params.id,
                                  icon: 'el-icon-link'
                              },{
                                  label: '作者',
                                  value: this.detailsObj['author']
                              },{
                                  label: '发布时间',
                                  value: this.detailsObj['date']
                              },{
                                  label: '受影响平台',
                                  value: this.detailsObj['platform'],
                              },{
                                  label: '漏洞标题',
                                  value: this.detailsObj['title'],
                              },{
                                  label: '威胁类型',
                                  value: this.detailsObj['type'],
                              })
                          })
                      }
                      if (this.type === 'cnnvd') {
                          cnnvdDetails(this.$route.params.id).then(data => {
                              this.detailsObj = data.data
                          }).then(_ => {
                              this.baseInfoList.push({
                                  label: 'CVE ID',
                                  value: this.$route.params.id,
                                  icon: 'el-icon-link'
                              },{
                                  label: '漏洞名称',
                                  value: this.detailsObj['vulName']
                              },{
                                  label: '漏洞类型',
                                  value: this.detailsObj['vulType']
                              },{
                                  label: '发布时间',
                                  value: this.detailsObj['date']
                              },{
                                  label: '危害级别',
                                  value: this.detailsObj['riskLevel'],
                              },{
                                  label: '修改时间',
                                  value: this.detailsObj['threatType'],
                              },{
                                  label: '威胁类型',
                                  value: this.detailsObj['updateTime'],
                              })
                          })
                      }
                      if (this.type === 'metasploit') {
                          metasploitDetailss(this.$route.params.id).then(data => {
                              this.detailsObj = data.data
                          }).then(_ => {
                              this.baseInfoList.push({
                                  label: '漏洞名称',
                                  value: this.detailsObj['name']
                              },{
                                  label: '漏洞全名',
                                  value: this.detailsObj['fullname']
                              },{
                                  label: '受影响平台',
                                  value: this.detailsObj['platform']
                              },{
                                  label: '越权',
                                  value: this.detailsObj['privileged'],
                              },{
                                  label: '级别',
                                  value: this.detailsObj['rank'],
                              },{
                                  label: '公开时间',
                                  value: this.detailsObj['disclosure_date']
                              },{
                                  label: '证书',
                                  value: this.detailsObj['license']
                              })
                          })
                      }
                      return this.detailsObj;
              }
      },
       mounted() {
          // let detailsObj = await this.getDetails();
          //     console.log(detailsObj)
              // if (detailsObj.isFrame) {
                  require('highlight.js/styles/atelier-dune-light.css')
              // } else require('highlight.js/styles/atom-one-dark.css')
      }
  }
</script>

<style lang="sass" scoped>
  .about
    height: 100%
    .box-info-details
      width: 100%
      height: 30%
      .box-card
        min-height: 230px
        .base-info
          display: flex
          margin-top: 10px
          div:last-child
            margin-left: 15px
      .vul-details-cards
        margin-top: 25px
    .menu-tabs
      /*text-align: center*/
      margin-top: 10px
      height: 60%
      .el-tabs__content
        width: 1400px
        margin: 0 auto
        .box-card-content
          height: 750px
          width: 1400px
          margin: 0 auto
          .el-card__body
            height: 100%
            .echarts
              min-height: 750px
</style>