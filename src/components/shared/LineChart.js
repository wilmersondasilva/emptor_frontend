import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    name: 'LineChart',
    extends: Line,
    mixins: [reactiveProp],
    data() {
        return {
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                elements: {
                    line: {
                        borderWidth: 2,
                        pointStyle: 'triangle',
                        pointBackgroundColor: '#fff'
                    }
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                padding: 10,
                                callback: function(value, _index, values) {
                                    const max = String(Math.max(...values))
                                        .length
                                    const dotQuantity = Math.floor(max / 3)
                                    const unity = Number(
                                        1 + '0'.repeat(dotQuantity * 3)
                                    )
                                    return value / unity
                                }
                            },
                            gridLines: {
                                drawTicks: false,
                                borderDash: [5, 5],
                                zeroLineBorderDash: [5, 5],
                                zeroLineColor: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    ],
                    xAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 8,
                                maxRotation: 0
                            },
                            gridLines: {
                                display: false
                            }
                        }
                    ]
                },
                tooltips: {
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            return Number(tooltipItem.value).toLocaleString()
                        },
                        title: function(tooltipItem, data) {
                            const item = tooltipItem[0]
                            const country =
                                data.datasets[item.datasetIndex].label
                            return `${country} (${item.label})`
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}
