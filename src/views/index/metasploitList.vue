<template>
    <el-table
            ref="filterTable"
            size="mini"
            :data="metasploitList"
            style="width: 100%">
        <el-table-column
                label="CNNVD ID"
                width="180">
            <template slot-scope="scope">
                <el-button @click="metasploitDetails(scope.row.metasploitId)" type="text" size="small">{{scope.row.metasploitId}}</el-button>
            </template>
        </el-table-column>
        <el-table-column
                prop="disclosure_date"
                label="公开时间"
                width="180"
        >
        </el-table-column>
        <el-table-column
                prop="name"
                label="漏洞名称"
                show-overflow-tooltip
                width="100">
        </el-table-column>
        <el-table-column
                width="180"
                prop="platform"
                label="受影响平台">
        </el-table-column>
        <el-table-column
                width="180"
                prop="rank"
                label="级别">
        </el-table-column>
        <el-table-column
                width="180"
                prop="sourceUrl"
                label="来源URl">
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
        name: "metasploitList",
        props: ['metasploitList'],
        methods: {
            ...mapActions([
                'setType'
            ]),
            metasploitDetails(id) {
                this.$router.push(`vuldetails/${id}`)
                this.setType('metasploit')
            }
        }
    }
</script>

<style scoped>

</style>