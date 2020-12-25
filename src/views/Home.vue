<template>
  <div class="home">
    <!--<div class="menu_list"></div>-->
    <!--<div class="main_logo"></div>-->
    <!--<div class="main_content">-->
     <!--<div class="main_operator">-->
       <!--<div class="filter_type">-->
         <!--&lt;!&ndash;todo&ndash;&gt;-->
       <!--</div>-->
       <!--<div class="search_keywords">-->
         <!--&lt;!&ndash;todo&ndash;&gt;-->
       <!--</div>-->
     <!--</div>-->
      <!--<div class="main_table"></div>-->
      <!--<div class="main_pagination"></div>-->
    <!--</div>-->
    <!--<div class="copy_right"></div>-->
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <div class="main_operator">
         <div class="operator" >
           <div class="filter_type">
             <drop-down></drop-down>
           </div>
           <div class="search_keywords">
             <el-input v-model="keyWord" placeholder="请输入搜索内容" clearable @change="getvulList">
               <el-button slot="append" icon="el-icon-search" @click="getvulList"></el-button>
             </el-input>
           </div>
         </div>
          <div class="main_table">
            <el-table
              ref="filterTable"
              size="mini"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180"
                column-key="date">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row.date)" type="text" size="small">{{scope.row.date}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="tag"
                label="标签"
                width="100">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.tag === '家' ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="main-pagination">
            <el-pagination
              background
              :current-page="currentPage"
              @size-change="handleSizeChange"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="currentChange"
              :total="400">
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
/*disable-eslint*/
export default {
    name: 'Home',
    data() {
        return {
            keyWord: '',
            currentPage: 1,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                tag: '家'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                tag: '公司'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                tag: '公司'
            }]
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
            this.$router.push(`/vuldetails/${id}`)
        },
        handleSizeChange() {

        },
        handleCurrentChange() {

        },
        getvulList() {
            console.log(this.keyWord)
        }
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
        .main-pagination
          margin: 20px auto 0
        .search_keywords
          width: 60%
          margin-left: 5%


</style>
