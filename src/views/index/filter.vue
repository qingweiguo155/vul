<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'cve'">
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
        </el-form>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'exb'">
            <el-form-item label="作者" prop="author" style="width: 700px">
                <el-input v-model="exbForm.author" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="CVE" prop="cve" style="width: 700px">
                <el-input v-model="exbForm.cve" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="包含App" prop="hasApp" style="width: 700px">
                <el-select v-model="hasApp" placeholder="placeholder" style="width: 700px">
                    <el-option
                            v-for="item in appList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="受影响产品" prop="affectedProducts" style="width: 700px">
                <el-select v-model="platforms" placeholder="请选择受影响产品" style="width: 700px">
                    <el-option
                            v-for="item in exbAffectedProductsList"
                            :key="item.value"
                            :label="item.key"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="漏洞类型" prop="affectedProducts" style="width: 700px">
                <el-select v-model="vulTags" placeholder="请选择漏洞类型" style="width: 700px">
                    <el-option
                            v-for="item in vulTagsList"
                            :key="item.value"
                            :label="item.key"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="威胁类型" prop="affectedProducts" style="width: 700px">
                <el-select v-model="threatTypes" placeholder="请选择威胁类型" style="width: 700px">
                    <el-option
                            v-for="item in threatTypesList"
                            :key="item.value"
                            :label="item.key"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="漏洞验证" prop="affectedProducts" style="width: 700px">
                <el-select v-model="vulReg" placeholder="请选择漏洞验证" style="width: 700px">
                    <el-option
                            v-for="item in vulRegList"
                            :key="item.value"
                            :label="item.key"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-form :model="cnnvdForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'cnnvd'">
            <el-form-item label="CVE ID" prop="name" style="width: 700px">
                <el-input v-model="cnnvdForm.name" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="product" style="width: 700px">
                <el-input v-model="cnnvdForm.product" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="危害等级" prop="riskLevel" style="width: 700px">
                <el-input v-model="cnnvdForm.riskLevel" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="威胁类型" prop="version" style="width: 700px">
                <el-input v-model="cnnvdForm.threatType" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="厂商名称" prop="vendor" style="width: 700px">
                <el-input v-model="cnnvdForm.vendor" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="漏洞名称" prop="vulName" style="width: 700px">
                <el-input v-model="cnnvdForm.vulName" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="漏洞类型" prop="vulType" style="width: 700px">
                <el-input v-model="cnnvdForm.vulType" style="width: 700px"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="metasploitForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'metasploit'">
            <el-form-item label="漏洞名称" prop="name" style="width: 700px">
                <el-input v-model="cnnvdForm.name" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="受影响平台" prop="platform" style="width: 700px">
                <el-input v-model="cnnvdForm.platform" style="width: 700px"></el-input>
            </el-form-item>
            <el-form-item label="越权" prop="privileged" style="width: 700px">
                <el-select v-model="privileged" placeholder="请选择是否越权" style="width: 700px">
                    <el-option
                            v-for="item in privilegedList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="级别" prop="rank" style="width: 700px">
                <el-select v-model="rank" placeholder="请选择级别" style="width: 700px">
                    <el-option
                            v-for="item in rankList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { exbAffet,vulTags } from '../../api'
    export default {
        name: "filter",
        props: ['type'],
        data() {
            return {
                hasApp: true,
                platforms: '',
                vulTags: '',
                threatTypes: '',
                privileged: null,
                rank: '',
                privilegedList: [{
                    label: '是',
                    value: true
                },{
                    label: '否',
                    value: false
                }],
                rankList: [{
                    label: 'low',
                    value: 'low'
                },{
                    label: 'good',
                    value: 'good'
                },{
                    label: 'average',
                    value: 'average'
                },{
                    label: 'normal',
                    value: 'normal'
                },{
                    label: 'manual',
                    value: 'manual'
                },{
                    label: 'great',
                    value: 'great'
                },{
                    label: 'excellent',
                    value: 'excellent'
                }],
                vulReg: null,
                exbAffectedProductsList: [],
                vulTagsList: [],
                appList: [
                    {
                        label: '是',
                        value: true
                    },
                    {
                        label: '否',
                        value: false
                    },
                    ],
                threatTypesList: [{
                    key: 'dos',
                    value: 'dos',
                },{
                    key: 'local',
                    value: 'local',
                },{
                    key: 'remote',
                    value: 'remote',
                },{
                    key: 'webapps',
                    value: 'webapps',
                }],
                vulRegList: [{
                    key: '是',
                    value: true
                },{
                    key: '否',
                    value: false
                }],
                ruleForm: {
                    name: '',
                    manufacturer: '',
                    affectedProducts: '',
                    vulType: '',
                    version: '',
                    cvssScoreFilter: 0
                },
                exbForm: {
                    cve: '',
                    hasApp: '',
                    author: '',
                    affectedProducts: ''
                },
                cnnvdForm: {

                },
                metasploitForm: {},
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
        mounted() {
            exbAffet().then(data => {
                this.exbAffectedProductsList = data.data
            })
            vulTags().then(data => {
                this.vulTagsList = data.data
            })
        }
    }
</script>

<style scoped>

</style>