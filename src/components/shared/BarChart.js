import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    name: 'BarChart',
    extends: Bar,
    mixins: [reactiveProp],
    data() {
        return {
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                callback: function(value) {
                                    return Number(value).toLocaleString()
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
