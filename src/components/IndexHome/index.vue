<template>
    <div class="filter-drop-down">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{vulType}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changeValueCommand(item)" v-for="item in dropdownList" :key="item.value">{{item.label}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    // cve、exb、rabit7、cwe、cnnvd 请选择漏洞类型
    export default {
        name: "index",
        data() {
            return {
                vulType: 'cve',
                filterList: [{
                    label: 'cve',
                    value: 1
                },{
                    label: 'exb',
                    value: 2
                },{
                    label: 'metasploit',
                    value: 3
                },{
                    label: 'cwe',
                    value: 4
                },{
                    label: 'cnnvd',
                    value: 5
                }]
            }
        },
        computed: {
            ...mapGetters([
                'dropdownList'
            ])
        },
        methods: {
            ...mapActions([
                'setDropdownList'
            ]),
            getDropDownList() {
                this.setDropdownList(this.filterList)
            },
            changeValueCommand({label}) {
                this.vulType = label
                this.$emit('vulType', label)
            }
        },
        mounted() {
            this.getDropDownList()
        }
    }
</script>

<style scoped>
    .filter-drop-down {
        text-align: left;
        margin-top: 10px;
        width: 120px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>