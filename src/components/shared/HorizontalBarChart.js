import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    name: 'HorizontalBarChart',
    extends: HorizontalBar,
    mixins: [reactiveProp],
    data() {
        return {
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                callback: function(value, _index, values) {
                                    const max = String(Math.max(...values))
                                        .length
                                    const dotQuantity = Math.floor(max / 3)
                                    const unity = Number(
                                        1 + '0'.repeat(dotQuantity * 3)
                                    )
                                    return `${value / unity} Tri`
                                }
                            }
                        }
                    ]
                },
                tooltips: {
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            return Number(tooltipItem.value).toLocaleString()
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
