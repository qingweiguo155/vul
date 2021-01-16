<template>
    <el-table
        ref="filterTable"
        size="mini"
        :data="exbList"
        style="width: 100%">
        <el-table-column
                label="EXB ID"
                width="180">
            <template slot-scope="scope">
                <el-button @click="exbDetails(scope.row.edbId)" type="text" size="small">{{scope.row.edbId}}</el-button>
            </template>
        </el-table-column>
        <el-table-column
                prop="author"
                label="作者"
                width="180"
        >
        </el-table-column>
        <el-table-column
                prop="date"
                label="发布时间"
                width="100">
        </el-table-column>
        <el-table-column
                width="180"
                prop="platform"
                label="受影响平台">
        </el-table-column>
        <el-table-column
            width="180"
            prop="tag"
            label="漏洞类型">
        </el-table-column>
        <el-table-column
                width="180"
                prop="title"
                show-overflow-tooltip
                label="漏洞标题">
        </el-table-column>
        <el-table-column
                width="180"
                prop="type"
                label="威胁类型">
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
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "exbList",
        props: ['exbList'],
        methods: {
            ...mapActions([
                'setType'
            ]),
            exbDetails(id) {
                this.$router.push(`vuldetails/${id}`)
                this.setType('exb')
            }
        }
    }
</script>

<style scoped>

</style>