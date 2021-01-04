<template>
  <div class="home">
    <el-container>
      <el-header>漏洞库</el-header>
      <el-main>
        <div class="main_operator">
         <div class="operator" >
           <div class="filter_type">
             <drop-down />
           </div>
           <div class="search_keywords">
             <el-input v-model="keyWord" placeholder="请输入搜索内容" clearable @change="getvulList">
               <el-button slot="append" icon="el-icon-search" @click="getvulList"></el-button>
             </el-input>
           </div>
           <div class="filter-modal">
             <el-button type="text" @click="dialogVisible = true">筛选</el-button>
             <el-dialog
               title=""
               :visible.sync="dialogVisible"
               width="70%"
             >
               <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                 <el-form-item label="CVE ID" prop="name" style="width: 700px">
                   <el-input v-model="ruleForm.name" style="width: 700px"></el-input>
                 </el-form-item>
                 <el-form-item label="受影响产品" prop="affectedProducts" style="width: 700px">
                   <el-input v-model="ruleForm.affectedProducts" style="width: 700px"></el-input>
                 </el-form-item>
                 <el-form-item label="厂商" prop="manufacturer" style="width: 700px">
                   <el-input v-model="ruleForm.manufacturer" style="width: 700px"></el-input>
                 </el-form-item>
                 <el-form-item label="版本号" prop="version" style="width: 700px">
                   <el-input v-model="ruleForm.version" style="width: 700px"></el-input>
                 </el-form-item>
                 <el-form-item label="漏洞类型" prop="vulType" style="width: 700px">
                   <el-input v-model="ruleForm.vulType" style="width: 700px"></el-input>
                 </el-form-item>
                 <!--<el-form-item label="漏洞评分" prop="cvssScoreFilter" style="width: 800px">-->
                   <!--<el-slider-->
                     <!--v-model="ruleForm.cvssScoreFilter"-->
                     <!--show-input-->
                     <!--:max="10">-->
                   <!--</el-slider>-->
                 <!--</el-form-item>-->
               </el-form>
               <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">取 消</el-button>
                 <el-button @click="resetForm('ruleForm')">重置</el-button>
                 <el-button type="primary" @click="filterVulList">确 定</el-button>
               </span>
             </el-dialog>
           </div>
         </div>
          <div class="main_table">
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
  import { cveData } from '../api'
/*disable-eslint*/
export default {
    name: 'Home',
    data() {
        return {
            keyWord: '',
            currentPage: 1,
            total: null,
            dialogVisible: false,
            cveList: [],
            ruleForm: {
                name: '',
                manufacturer: '',
                affectedProducts: '',
                vulType: '',
                version: '',
                cvssScoreFilter: 0
            },
            rules: {
                name: [
                    { message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { message: '请选择活动区域', trigger: 'change' }
                ]
            }
        }
    },
    components: {
        DropDown
    },
    methods: {
        currentChange(val) {
            this.currentPage = val
        },
        handleClick(id) {
            this.$router.push(`vuldetails/${id}`)
        },
        handleSizeChange(val) {
            cveData(this.keyWord, '', val, 1).then(data => {
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
        getvulList() {
            console.log(this.keyWord)
            // cveData(this.keyWord)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        filterVulList() {
            cveData(true,this.ruleForm.name,
                this.keyWord,
                '',
                10,
                1,
                this.ruleForm.manufacturer,
                this.ruleForm.version,
                this.ruleForm.affectedProducts,
                this.ruleForm.vulType,
                ).then(data => {
                if (data && data.data) {
                    let { dataList, total } = data.data
                    this.cveList = dataList
                    this.total = total
                } else {
                    this.cveList = []
                    this.total = null
                }
            })
            this.dialogVisible = false
        },
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
