<template>
    <div class="dashboard-common-chart">
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

const { mapGetters, mapState } = createNamespacedHelpers('dashboard')
const colors = ['#4cbbc6', '#e2428b', '#5a6e9d', '#61a461', '#2b7cb5']

export default {
    name: 'DashboardPopulationTotalChart',
    components: {
        LineChart
    },
    data() {
        return {
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
        ...mapState(['selectedIndicator']),
        ...mapGetters(['indicatorsGroupedByCode', 'years']),
        chartData() {
            return  {
                labels: this.filteredYears,
                datasets: [...this.datasets]
            }
        },
        filteredYears() {
            return this.years.filter(year => year >= this.firstYear && year <= this.lastYear)
        },
        yearsBiggerThanFirstYear() {
            return this.years.filter(year => year >= this.firstYear)
        },
        datasets() {
            const indicator = this.indicatorsGroupedByCode[this.selectedIndicator]
            if (!indicator)
                return []
            
            const countries = indicator.data.reduce((countries, item) => {
                if (item.year >= this.firstYear && item.year <= this.lastYear) {
                    if (!countries[item.country_code]) {
                        countries[item.country_code] = {
                            label: item.country_name,
                            fill: false,
                            pointRadius: 2,
                            pointHoverRadius: 3,
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

.dashboard-common-chart
    width 100%
    margin 0 auto

    .chart-container
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