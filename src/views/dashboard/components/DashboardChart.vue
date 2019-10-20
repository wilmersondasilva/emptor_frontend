<template>
    <div class="dashboard-chart">
        <LineChart :chart-data="chartData"></LineChart>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import LineChart from '@/components/shared/LineChart'

const { mapGetters, mapState } = createNamespacedHelpers('dashboard')
const colors = ['#090057', '#003f5c', '#58508d', '#bc5090', '#ff6361']

export default {
    name: 'DashboardChart',
    components: {
        LineChart
    },
    computed: {
        ...mapGetters(['indicatorsGroupedByCode']),
        ...mapState(['selectedIndicator']),
        chartData() {
            return  {
                labels: [...this.years],
                datasets: [...this.datasets]
            }
        },
        years() {
            const indicator = this.indicatorsGroupedByCode[this.selectedIndicator]
            if (!indicator)
                return []
            
            return indicator.data.reduce((years, item) => {
                years.add(item.year)

                return years;
            }, new Set())
        },
        datasets() {
            const indicator = this.indicatorsGroupedByCode[this.selectedIndicator]
            if (!indicator)
                return []
            
            const countries = indicator.data.reduce((countries, item) => {
                if (!countries[item.country_code]) {
                    countries[item.country_code] = {
                        label: item.country_name,
                        fill: false,
                        data: []
                    }
                }

                countries[item.country_code].data.push(item.value)

                return countries;
            }, {})

            return Object
                .keys(countries)
                .map((country, index) => {
                    return { 
                        ...countries[country],
                        backgroundColor: colors[index],
                        borderColor: colors[index] 
                    }
                })
        }
    }
}
</script>

<style>
.dashboard-chart {
    max-width: 600px;
    margin: 150px auto;
}
</style>

//     {
//     labels: [this.getRandomInt(), this.getRandomInt()],
//     datasets: [
//         {
//             label: 'Data One',
//             fill: false,
//             data: [this.getRandomInt(), this.getRandomInt()]
//         },
//         {
//             label: 'Data One',
//             fill: false,
//             data: [this.getRandomInt(), this.getRandomInt()]
//         }
//     ]
// }