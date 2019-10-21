import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    name: 'BarChart',
    extends: Bar,
    mixins: [reactiveProp],
    data() {
        return {
            options: {
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}
