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
                  <!--<a :href="detailsObj.sourceUrl" target="_blank" v-if="item.icon" :class="item.icon" style="text-decoration: none;margin-left: 10px;font-size: 20px;color: #409eff;cursor: pointer">-->
                  <!--</a>-->
                </div>
              </div>
              <div class="base-info">
                <div>漏洞类型</div>
                <div>
                  <el-tag v-for="type in detailsObj.vulType" :key="type" size="mini">{{type}}</el-tag>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
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
        </el-row>
    </div>
    <div class="menu-tabs">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="CVE" name="first">
          <el-card class="box-card-content" shadow="never">
            <v-chart :options="getOptions()" />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="可利用脚本" name="fourth">
          <!--<d3-graph />-->
          <!--<el-select v-model="defaultCss" placeholder="placeholder" size="mini" @change="handleChangeCss">-->
            <!--<el-option-->
                    <!--v-for="item in cssList"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <!--<pre v-highlightjs class=" language-c">-->
            <!--<code class="language-c">-->
              <!--#include    <stdio.h>-->
              <!--#include    <windows.h>-->

                <!--#define     MAXBUF          1000-->
                <!--#define     RETADR          53-->
            <!--</code>-->
          <!--</pre>-->
          <div v-highlight>
            <pre>
              <code class="bash">
                {{detailsObj.script}}
              </code>
            </pre>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
    import 'highlight.js/styles/atom-one-light.css'
    import { cveDetails } from '../api'
    // import GraphAll from './graph/GraphAll'
  // import D3Graph from './graph/D3'
  // import GraphNode from './graph/GraphNode'
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
      components: {
          // GraphAll,
          // D3Graph,
          // GraphNode
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
          }
      },
      mounted() {
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
  }
</script>

<style lang="sass" scoped>
  .about
    height: 100%
    .box-info-details
      width: 100%
      height: 40%
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