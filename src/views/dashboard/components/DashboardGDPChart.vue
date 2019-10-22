<template>
    <div class="dashboard-gdp-chart">
        <div class="chart-header">
            <p>GDP (current US$)</p>
        </div>
        <div class="chart-container">
            <HorizontalBarChart
                chart-id="line-dashboard-chart"
                :chart-data="chartData"
            />
        </div>
        <div class="chart-footer">
            <select class="select select-year" v-model="selectedYear">
                <option v-for="year in filteredYears" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import HorizontalBarChart from '@/components/shared/HorizontalBarChart'

const { mapGetters, mapState } = createNamespacedHelpers('dashboard')

export default {
    name: 'DashboardGDPChart',
    components: {
        HorizontalBarChart
    },
    data() {
        return {
            indicatorCode: 'NY.GDP.MKTP.CD',
            selectedYear: 0
        }
    },
    watch: {
        filteredYears() {
            this.selectedYear = this.filteredYears[0]
        }
    },
    computed: {
        ...mapState(['data']),
        ...mapGetters(['indicatorsGroupedByCode']),
        chartData() {
            return {
                labels: this.countries,
                datasets: this.datasets
            }
        },
        filteredYears() {
            const filteredYears = this.data.filter(
                item => item.code === this.indicatorCode
            )

            const setYears = filteredYears.reduce((years, item) => {
                if (item.value !== '') years.add(item.year)

                return years
            }, new Set())

            const sortedYears = [...setYears].sort().reverse()

            return sortedYears
        },
        countries() {
            const indicator = this.indicatorsGroupedByCode[this.indicatorCode]

            if (!indicator) return []

            const sortedData = this.getSortedDataset(indicator)

            return sortedData.map(item => item.country_name)
        },
        datasets() {
            const indicator = this.indicatorsGroupedByCode[this.indicatorCode]

            if (!indicator) return [{}]

            const sortedData = this.getSortedDataset(indicator)

            return [
                {
                    label: 'GDP',
                    backgroundColor: '#2b7cb5',
                    borderColor: '#2b7cb5',
                    borderWidth: 1,
                    data: sortedData.map(item => Number(item.value))
                }
            ]
        }
    },
    methods: {
        getSortedDataset(indicator) {
            const dataOfSelectedYear = indicator.data.filter(
                item => item.year === String(this.selectedYear)
            )
            const sortedData = dataOfSelectedYear.sort((itemA, itemB) => {
                const valueA = Number(itemA.value)
                const valueB = Number(itemB.value)

                if (valueA > valueB) return -1
                if (valueA < valueB) return 1

                return 0
            })

            return sortedData
        }
    }
}
</script>

<style lang="stylus">
border-radius = 2px

.dashboard-gdp-chart
    width 98vw
    margin 30px auto 0
    padding-bottom 30px

    .chart-header
        height 48px
        line-height 48px
        background-color #fff
        border-top-left-radius border-radius
        border-top-right-radius border-radius
        border 1px solid #e4e9ec
        border-bottom none

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

    @media screen and (min-width: 500px)
        width 95vw

    @media screen and (min-width: 650px)
        width 80vw

    @media screen and (min-width: 990px)
        width 70vw

    @media screen and (min-width: 1200px)
        width 55vw
</style>
