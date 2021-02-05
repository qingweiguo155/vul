<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">筛选</el-button>
        <el-dialog
                :title= "type + '筛选'"
                :visible.sync="dialogVisible"
                width="70%"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'cve'">
                <el-form-item label="CVE ID" prop="name" >
                    <el-input v-model="ruleForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="受影响产品" prop="affectedProducts" >
                    <el-input v-model="ruleForm.affectedProducts" ></el-input>
                </el-form-item>
                <el-form-item label="厂商" prop="manufacturer" >
                    <el-input v-model="ruleForm.manufacturer" ></el-input>
                </el-form-item>
                <el-form-item label="版本号" prop="version" >
                    <el-input v-model="ruleForm.version" ></el-input>
                </el-form-item>
                <el-form-item label="漏洞类型" prop="vulType" >
                    <el-input v-model="ruleForm.vulType" ></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'exb'">
                <el-form-item label="作者" prop="author" >
                    <el-input v-model="exbForm.author" ></el-input>
                </el-form-item>
                <el-form-item label="CVE" prop="cve" >
                    <el-input v-model="exbForm.cve" ></el-input>
                </el-form-item>
                <el-form-item label="包含App" prop="hasApp" style="width: 70%">
                    <el-select v-model="hasApp" placeholder="placeholder" style="width: 100%">
                        <el-option
                                v-for="item in appList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="受影响产品" prop="affectedProducts" style="width: 70%">
                    <el-select v-model="platforms" placeholder="请选择受影响产品" style="width: 100%">
                        <el-option
                                v-for="item in exbAffectedProductsList"
                                :key="item.value"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="漏洞类型" prop="affectedProducts" style="width: 70%">
                    <el-select v-model="vulTags" placeholder="请选择漏洞类型" style="width: 100%">
                        <el-option
                                v-for="item in vulTagsList"
                                :key="item.value"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="威胁类型" prop="affectedProducts" style="width: 70%">
                    <el-select v-model="threatTypes" placeholder="请选择威胁类型" style="width: 100%">
                        <el-option
                                v-for="item in threatTypesList"
                                :key="item.value"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="漏洞验证" prop="affectedProducts" style="width: 70%">
                    <el-select v-model="vulReg" placeholder="请选择漏洞验证" style="width: 100%">
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
                <el-form-item label="CVE ID" prop="name" >
                    <el-input v-model="cnnvdForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="product" >
                    <el-input v-model="cnnvdForm.product" ></el-input>
                </el-form-item>
                <el-form-item label="危害等级" prop="riskLevel" >
                    <el-select v-model="riskLevel" placeholder="placeholder">
                        <el-option
                                v-for="item in riskLevelList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="威胁类型" prop="version" >
                    <el-select v-model="threat" placeholder="placeholder">
                        <el-option

                                v-for="item in threatTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="cnnvdForm.threatType" ></el-input>
                </el-form-item>
                <el-form-item label="厂商名称" prop="vendor" >
                    <el-input v-model="cnnvdForm.vendor" ></el-input>
                </el-form-item>
                <el-form-item label="漏洞名称" prop="vulName" >
                    <el-input v-model="cnnvdForm.vulName" ></el-input>
                </el-form-item>
                <el-form-item label="漏洞类型" prop="vulType" >
                    <el-input v-model="cnnvdForm.vulType" ></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="metasploitForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="type === 'metasploit'">
                <el-form-item label="漏洞名称" prop="name" >
                    <el-input v-model="cnnvdForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="受影响平台" prop="platform" >
                    <el-input v-model="cnnvdForm.platform" ></el-input>
                </el-form-item>
                <el-form-item label="越权" prop="privileged" style="width: 70%">
                    <el-select v-model="privileged" placeholder="请选择是否越权" style="width: 100%">
                        <el-option
                                v-for="item in privilegedList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="级别" prop="rank" style="width: 70%">
                    <el-select v-model="rank" placeholder="请选择级别" style="width: 100%">
                        <el-option
                                v-for="item in rankList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">取 消</el-button>
                 <el-button @click="resetForm('ruleForm')">重置</el-button>
                 <el-button type="primary" @click="filterVulList(type)">确 定</el-button>
               </span>
        </el-dialog>
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
                dialogVisible: false,
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
                riskLevel: '',
                riskLevelList: [{
                    label: '超危',
                    value: '超危'
                },{
                    label: '高危',
                    value: '高危'
                },{
                    label: '中危',
                    value: '中危'
                },{
                    label: '低危',
                    value: '低危'
                }],
                threat: '',
                threatTypeList: [{
                    label: '远程',
                    value: '远程',
                },{
                    label: '本地',
                    value: '本地',
                },{
                    label: '其他',
                    value: '其他',
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
                    // name: [
                    //     { message: '请输入活动名称', trigger: 'blur' },
                    //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    // ],
                    // region: [
                    //     { message: '请选择活动区域', trigger: 'change' }
                    // ]
                }
            }
        },
        methods: {
            filterVulList(type) {
                let Params = {}
                switch (type) {
                    case 'cve':
                        Params = {
                            cveId: this.ruleForm.name,
                            vendor: this.ruleForm.manufacturer,
                            version: this.ruleForm.version,
                            product: this.ruleForm.affectedProducts,
                            vulType: this.ruleForm.vulType,
                        }
                        this.$emit('filterData', Params)
                }
                this.dialogVisible = false
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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