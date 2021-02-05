<template>
  <div class="home">
    <el-container>
      <el-header>漏洞库</el-header>
      <el-main>
        <div class="main_operator">
         <div class="operator" >
           <div class="filter_type">
             <drop-down @vulType="vulType"/>
           </div>
           <div class="search_keywords">
             <el-input v-model="keyWord" placeholder="请输入搜索内容" clearable @change="getvulList">
               <el-button slot="append" icon="el-icon-search" @click="getvulList"></el-button>
             </el-input>
           </div>
           <div class="filter-modal">
              <filter-modal :type="type" @filterData="filterData"/>
           </div>
         </div>
          <div class="main_table" v-if="type === 'cve'">
            <el-table
              ref="filterTable"
              size="mini"
              :data="cveList"
              style="width: 100%">
              <el-table-column
                label="CVE ID"
                width="180">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row.cveId)" type="text" size="small">{{scope.row.cveId}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="publishDate"
                label="发布日期"
                sortable
                width="180"
                >
              </el-table-column>
              <el-table-column
                label="漏洞评分"
                sortable
                width="100">
                <template slot-scope="scope">
                  <span :class="scope.row.cvssScore <= 7.5 ? scope.row.cvssScore >= 2.5 ?  'font-class-orange': 'font-class-green' : 'font-class-red'">{{scope.row.cvssScore}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vulName"
                show-overflow-tooltip
                label="漏洞名称">
              </el-table-column>
              <el-table-column
                      v-if="type === 'cve'"
                prop="tag"
                label="漏洞状态"
                width="300">
                <template slot-scope="scope">
                  <div class="vulStatus">
                    <el-tag type='primary' disable-transitions v-if="scope.row.exploitScripts">漏洞利用代码</el-tag>
                    <el-tag type="primary" class="vulDetails" v-if="scope.row.exploitInfo">漏洞细节</el-tag>
                    <el-tag type="primary" v-if="scope.row.exploitCarrier">漏洞载体</el-tag>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="main_table" v-if="type === 'exb'">
            <exb-list :exbList="exbList"/>
          </div>
          <div class="main_table" v-if="type === 'cnnvd'">
            <cnnvd-list :cnnvdList="cnnvdList"/>
          </div>
          <div class="main_table" v-if="type === 'metasploit'">
            <meta-list :metasploitList="metasploitList"/>
          </div>
            <div class="main-pagination">
            <el-pagination
              background
              :current-page="currentPage"
              @size-change="handleSizeChange"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="currentChange"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
  import DropDown from '../components/IndexHome/'
  import FilterModal from './index/filter'
  import ExbList from './index/exbList'
  import CnnvdList from './index/cnnvdList'
  import MetaList from './index/metasploitList'
  import { cveData,exbData,cnnvdData,metasploitData  } from '../api'
  import {  mapActions } from 'vuex'
  /*disable-eslint*/
export default {
    name: 'Home',
    data() {
        return {
            keyWord: '',
            currentPage: 1,
            total: null,

            type: 'cve',
            cveList: [],
            exbList: [],
            cnnvdList: [],
            metasploitList: []
        }
    },
    components: {
        DropDown,
        FilterModal,
        ExbList,
        CnnvdList,
        MetaList,
    },
    computed: {
      // cveParams() {
      //   return {
      //     // asc,
      //     cveId,
      //     keyword,
      //     orderBy: "",
      //     vendor,
      //     version,
      //     product,
      //     vulType,
      //     cvssScoreStart:null,
      //     cvssScoreEnd:null,
      //   }
      // }
    },
    methods: {
        ...mapActions([
            'setType'
        ]),
        currentChange(val) {
            this.currentPage = val
            cveData(val).then(data => {
                if (data && data.data) {
                    let { dataList, total } = data.data
                    this.cveList = dataList
                    this.total = total
                } else {
                    this.cveList = []
                    this.total = null
                }
            })
        },
        handleClick(id) {
            this.$router.push(`vuldetails/${id}`)
            this.setType('cve')
        },
        handleSizeChange(val) {
            cveData(1, val).then(data => {
                if (data && data.data) {
                    let { dataList, total } = data.data
                    this.cveList = dataList
                    this.total = total
                } else {
                    this.cveList = []
                    this.total = null
                }
            })
        },
        handleCurrentChange() {

        },
        vulType(val) {
            this.type = val
            console.log(val)
            if (val === 'exb') {
                exbData().then(data => {
                    if (data && data.data) {
                        let { dataList, total } = data.data
                        this.exbList = dataList
                        this.total = total
                        this.openLoading().close()
                    } else {
                        this.exbList = []
                        this.total = null
                    }
                })
            }
            if (val === 'cnnvd') {
                cnnvdData().then(data => {
                    if (data && data.data) {
                        let { dataList, total } = data.data
                        this.cnnvdList = dataList
                        this.total = total
                        this.openLoading().close()
                    } else {
                        this.cnnvdList = []
                        this.total = null
                    }
                })
            }
            if (val === 'metasploit') {
                metasploitData().then(data => {
                    if (data && data.data) {
                        let { dataList, total } = data.data
                        this.metasploitList = dataList
                        this.total = total
                        this.openLoading().close()
                    } else {
                        this.metasploitList = []
                        this.total = null
                    }
                })
            }
        //
        },
        getvulList() {
            console.log(this.keyWord)
            // cveData(this.keyWord)
        },

        filterData(val) {
            cveData(1, this.currentPage,val).then(data => {
                if (data && data.data) {
                    let { dataList, total } = data.data
                    this.cveList = dataList
                    this.total = total
                } else {
                    this.cveList = []
                    this.total = null
                }
            })
        },
        // filterVulList(type) {
        //     console.log(this.ruleForm);
        //     cveData(1,this.currentPage,
        //         this.ruleForm.name,
        //         this.ruleForm.manufacturer,
        //         this.ruleForm.version,
        //         this.ruleForm.affectedProducts,
        //         this.ruleForm.vulType,
        //         ).then(data => {
        //         if (data && data.data) {
        //             let { dataList, total } = data.data
        //             this.cveList = dataList
        //             this.total = total
        //         } else {
        //             this.cveList = []
        //             this.total = null
        //         }
        //     })
        //     this.dialogVisible = false
        // },
        getCvssColorByScore(score) {
            switch (score) {
                case score <= 2.5:
                    return '#00c400'
                case score <= 7.5:
                    return '#ff9c20'
                case score <= 10:
                    return '#ff0000'
            }
        }
    },
    mounted() {
        cveData().then(data => {
            if (data && data.data) {
                let { dataList, total } = data.data
                this.cveList = dataList
                this.total = total
                this.openLoading().close()
            } else {
                this.cveList = []
                this.total = null
            }
        })

    }
}
</script>

<style lang="sass" scoped>
  $myHeight: 50px
  .home
    width: 100%
    height: 100%
    background-color: skyblue
    .el-container
      height: 100%
      .el-header, .el-footer
        background-color: #B3C0D1
        color: #333
        text-align: center
        line-height: 60px
        height: 10%
      .el-main
        background-color: #E9EEF3
        color: #333
        text-align: center
        height: 90%
        .operator
          height: $myHeight * 2
          display: flex
        .filter_type
          width: 150px
        .main-pagination
          margin: 20px auto 0
        .search_keywords
          width: 60%
          margin-left: 5%
        .filter-modal
          margin-left: 30px
        .main_table
          .font-class-red
            color: red
          .font-class-orange
            color: orange
          .font-class-green
            color: green
          .vulStatus
            display: flex
            .vulDetails
              margin: 0 20px


</style>
