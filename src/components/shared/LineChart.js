import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    name: 'LineChart',
    extends: Line,
    mixins: [reactiveProp],
    data() {
        return {
            options: {
                fill: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}
