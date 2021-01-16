<template>
    <el-table
            ref="filterTable"
            size="mini"
            :data="cnnvdList"
            style="width: 100%">
        <el-table-column
                label="CNNVD ID"
                width="180">
            <template slot-scope="scope">
                <el-button @click="cnnvdDetails(scope.row.cnnvd)" type="text" size="small">{{scope.row.cnnvd}}</el-button>
            </template>
        </el-table-column>
        <el-table-column
                prop="releaseTime"
                label="发布时间"
                width="180"
        >
        </el-table-column>
        <el-table-column
                prop="riskLevel"
                label="危害等级"
                width="100">
        </el-table-column>
        <el-table-column
                width="180"
                prop="threatType"
                label="威胁类型">
        </el-table-column>
        <el-table-column
                width="180"
                prop="vulName"
                show-overflow-tooltip
                label="漏洞名称">
        </el-table-column>
        <el-table-column
                width="180"
                prop="vulType"
                label="漏洞类型">
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
        props: ['cnnvdList'],
        methods: {
            ...mapActions([
                'setType'
            ]),
            cnnvdDetails(id) {
                this.$router.push(`vuldetails/${id}`)
                this.setType('cnnvd')
            }
        }
    }
</script>

<style scoped>

</style>