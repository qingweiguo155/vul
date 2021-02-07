<template>
    <!--<div class="graph-node">-->
        <!--<v-chart :options="getOptions()" />-->
    <!--</div>-->






<div>
    <!--<el-dialog-->
            <!--title="提示"-->
            <!--:visible.sync="dialogVisible"-->
            <!--width="30%"-->
    <!--&gt;-->
        <!--<span>这是一段信息</span>-->
        <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
    <div id="graphNode"></div>
    <div style="height: 200px;margin-right: 50%;margin-top: 10%" v-if="dialogVisible">
        <circle-menu type="middle-around" circle :number='4'>
            <button type="button" slot="item_btn"></button>
            <a slot="item_1" class="fa fa-twitter fa-lg"><i class="el-icon-grape" style="color: white"></i></a>
            <a slot="item_2" class="fa fa-weixin fa-lg"><i class="el-icon-watermelon" style="color: white"></i></a>
            <a slot="item_3" class="fa fa-weibo fa-lg"><i class="el-icon-cherry" style="color: white"></i></a>
            <a slot="item_4" class="fa fa-github fa-lg"><i class="el-icon-apple" style="color: white"></i></a>
        </circle-menu>
    </div>
</div>
</template>




<script>
    // import {cveKnowledge} from '../../api'

    import CircleMenu from 'vue-circle-menu'
    let data = {
        nodes: [{
            name: '操作系统集团',
            category: 0
        }, {
            name: '浏览器有限公司',
            category: 0
        }, {
            name: 'HTML科技',
            category: 0
        }, {
            name: 'JavaScript科技',
            category: 0
        }, {
            name: 'CSS科技',
            category: 0
        }, {
            name: 'Chrome',
            category: 1
        }, {
            name: 'IE',
            category: 1
        }, {
            name: 'Firefox',
            category: 1
        }, {
            name: 'Safari',
            category: 1
        }],

        links: [{
            source: '浏览器有限公司',
            target: '操作系统集团',
            name: '参股'
        }, {
            source: 'HTML科技',
            target: '浏览器有限公司',
            name: '参股'
        }, {
            source: 'CSS科技',
            target: '浏览器有限公司',
            name: '参股'
        }, {
            source: 'JavaScript科技',
            target: '浏览器有限公司',
            name: '参股'
        }, {
            source: 'Chrome',
            target: '浏览器有限公司',
            name: '董事'
        }, {
            source: 'IE',
            target: '浏览器有限公司',
            name: '董事'
        }, {
            source: 'Firefox',
            target: '浏览器有限公司',
            name: '董事'
        }, {
            source: 'Safari',
            target: '浏览器有限公司',
            name: '董事'
        }, {
            source: 'Chrome',
            target: 'JavaScript科技',
            name: '法人'
        }]
    }

    const color1 = '#006acc';
    const color2 = '#ff7d18';
    const color3 = '#10a050';

    data.nodes.forEach(node => {
        if (node.category === 0) {
            node.itemStyle = {
                color: color1
            };
        } else if (node.category === 1) {
            node.itemStyle = {
                color: color2
            };
        }
        node.symbolSize = 30;
    });

    data.links.forEach(link => {
        link.label = {
            align: 'center',
            fontSize: 12
        };

        if (link.name === '参股') {
            link.lineStyle = {
                color: color2
            }
        } else if (link.name === '董事') {
            link.lineStyle = {
                color: color1
            }
        } else if (link.name === '法人') {
            link.lineStyle = {
                color: color3
            }
        }
    });

    let categories = [{
        name: '公司',
        itemStyle: {
            color: color1
        }
    },
        {
            name: '董事',
            itemStyle: {
                color: color2
            }
        }]
    export default {
    data() {
        // graphNode
        return {
            dialogVisible: false
        }
    },
        props: ['id'],
    methods: {
        setOptionsNode() {
            let graph = this.$echarts.init(document.getElementById('graphNode'))
            let option = {
                title: {
                    text: '知识图谱',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: params => {
                        let html = '';
                        html+= ` <div>
                  <circle-menu type="middle-around" circle :number='4'>
                      <button type="button" slot="item_btn"></button>
                      <a slot="item_1" class="fa fa-twitter fa-lg"><i class="el-icon-grape" style="color: white"></i></a>
                      <a slot="item_2" class="fa fa-weixin fa-lg"><i class="el-icon-watermelon" style="color: white"></i></a>
                      <a slot="item_3" class="fa fa-weibo fa-lg"><i class="el-icon-cherry" style="color: white"></i></a>
                      <a slot="item_4" class="fa fa-github fa-lg"><i class="el-icon-apple" style="color: white"></i></a>
                  </circle-menu>
              </div>`
                        return html
                    }
                },
                legend: [{
                    // selectedMode: 'single',
                    data: categories.map(x => x.name),
                    // icon: 'circle'
                }],
                series: [{
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 58,
                    draggable: true,
                    roam: true,
                    focusNodeAdjacency: true,
                    categories: categories,
                    edgeSymbol: ['', 'arrow'],
                    // edgeSymbolSize: [80, 10],
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 20
                            },
                            formatter(x) {
                                return x.data.name;
                            }
                        }
                    },
                    label: {
                        show: true
                    },
                    force: {
                        repulsion: 2000,
                        edgeLength: 120
                    },
                    data: data.nodes,
                    links: data.links
                }]
            }
            graph.on("click", e => {
                    //e中有当前节点信息
                    // document.documentElement.oncontextmenu = () => {
                    //     return false;
                    // };
                this.dialogVisible = true
            })
            graph.setOption(option)
        }
    },
    components: {
        CircleMenu
    },
    mounted() {
        this.setOptionsNode()
        // cveKnowledge(this.id).then(data => {
        //     console.log('cveKnowledge',data.data)
        // })
        }
    }
</script>

<style scoped lang="sass">
    #graphNode
        width: 1400px
        height: 500px
        border: 1px solid #ccc
        margin: 0 auto

</style>