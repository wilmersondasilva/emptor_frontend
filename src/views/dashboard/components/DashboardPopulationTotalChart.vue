<template>
    <div class="dashboard-chart">
        <div class="chart-header"></div>
        <div class="chart-container">
            <LineChart chart-id="line-dashboard-chart" :chart-data="chartData" />
        </div>
        <div class="chart-footer">
            <select class="select select-start" v-model="firstYear">
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
            <select class="select select-end" v-model="lastYear">
                <option v-for="year in yearsBiggerThanFirstYear" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import LineChart from '@/components/shared/LineChart'

const { mapGetters } = createNamespacedHelpers('dashboard')
const colors = ['#090057', '#003f5c', '#58508d', '#bc5090', '#ff6361']

export default {
    name: 'DashboardChart',
    components: {
        LineChart
    },
    data() {
        return {
            indicatorCode: 'SP.POP.TOTL',
            firstYear: 0,
            lastYear: 0,
        }
    },
    watch: {
        years() {
            this.firstYear = Math.min(...this.years)
            this.lastYear = Math.max(...this.years)
        }
    },
    computed: {
        ...mapGetters(['indicatorsGroupedByCode']),
        chartData() {
            return  {
                labels: [...this.filteredYears],
                datasets: [...this.datasets]
            }
        },
        filteredYears() {
            return [...this.years].filter(year => year >= this.firstYear && year <= this.lastYear)
        },
        years() {
            const indicator = this.indicatorsGroupedByCode[this.indicatorCode]
            if (!indicator)
                return []
            
            return indicator.data.reduce((years, item) => {
                years.add(item.year)

                return years;
            }, new Set())
        },
        yearsBiggerThanFirstYear() {
            return [...this.years].filter(year => year >= this.firstYear)
        },
        datasets() {
            const indicator = this.indicatorsGroupedByCode[this.indicatorCode]
            if (!indicator)
                return []
            
            const countries = indicator.data.reduce((countries, item) => {
                if (item.year >= this.firstYear && item.year <= this.lastYear) {
                    if (!countries[item.country_code]) {
                        countries[item.country_code] = {
                            label: item.country_name,
                            fill: false,
                            pointRadius: 1,
                            pointHoverRadius: 2,
                            data: []
                        }
                    }

                    countries[item.country_code].data.push(item.value)
                }

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

<style lang="stylus">
border-radius = 2px

.dashboard-chart
    width 45vw
    height 300px
    margin 30px auto 0

    .chart-container
        border-top-left-radius border-radius
        border-top-right-radius border-radius
        padding 24px 10px
        background-color #fff
        position relative
        border 1px solid #e4e9ec

    .chart-footer
        height 48px
        padding 4px 0
        background-color #f8f9fa
        border-bottom-left-radius border-radius
        border-bottom-right-radius border-radius
        border 1px solid #e4e9ec
        border-top none
        display flex
        justify-content space-evenly

        .select
            width 45%
</style>