<template>
    <div class="dashboard-patent-applications-chart">
        <div class="chart-header"></div>
        <div class="chart-container">
            <BarChart chart-id="line-dashboard-chart" :chart-data="chartData" />
        </div>
        <div class="chart-footer">
            <select class="select select-year" v-model="selectedYear">
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import BarChart from '@/components/shared/BarChart'

const { mapGetters } = createNamespacedHelpers('dashboard')
// const colors = ['#090057', '#003f5c', '#58508d', '#bc5090', '#ff6361']

export default {
    name: 'DashboardPatentApplicationsChart',
    components: {
        BarChart
    },
    data() {
        return {
            residentsCode: 'IP.PAT.RESD',
            nonResidentsCode: 'IP.PAT.NRES',
            selectedYear: 0
        }
    },
    watch: {
        years() {
            this.selectedYear = Math.max(...this.years)
        }
    },
    computed: {
        ...mapGetters(['indicatorsGroupedByCode']),
        chartData() {
            return  {
                labels: this.countries,
                datasets: this.datasets
            }
        },
        countries() {
            const indicator = this.indicatorsGroupedByCode[this.residentsCode]

            if (!indicator)
                return []
            
            const setCountries = indicator.data.reduce((countries, item) => {
                countries.add(item.country_name)

                return countries
            }, new Set())
            
            return [...setCountries]
        },
        datasets() {
            return [
                this.datasetResidents,
                this.datasetNonResidents,
            ]
        },
        datasetResidents() {
            const indicator = this.indicatorsGroupedByCode[this.residentsCode]

            if (!indicator)
                return {}
            
            const sortedData = this.getSortedDataset(indicator)

            return {
                label: 'Residents',
                backgroundColor: '#9ad0f5',
				borderColor: '#9ad0f5',
				borderWidth: 1,
                data: sortedData.map(item => Number(item.value))
            }
        },
        datasetNonResidents() {
            const indicator = this.indicatorsGroupedByCode[this.nonResidentsCode]

            if (!indicator)
                return {}
            
            const sortedData = this.getSortedDataset(indicator)

            return {
                label: 'Nonresidents',
                backgroundColor: '#ffb1c1',
				borderColor: '#ffb1c1',
				borderWidth: 1,
                data: sortedData.map(item => Number(item.value))
            }
        },
        years() {
            const indicator = this.indicatorsGroupedByCode[this.residentsCode]

            if (!indicator)
                return []
            
            const setYears = indicator.data.reduce((years, item) => {
                years.add(item.year)

                return years
            }, new Set())
            
            const sortedYears = [...setYears].sort()

            return sortedYears
        }
    },
    methods: {
        getSortedDataset(indicator) {
            const dataOfSelectedYear = indicator.data.filter(item => item.year === String(this.selectedYear))
            const sortedData = dataOfSelectedYear.sort((itemA, itemB) => {
                const countryA = itemA.country_name
                const countryB = itemB.country_name

                if (countryA < countryB) return -1
                if (countryA > countryB) return 1

                return 0
            })

            return sortedData
        }
    }
}
</script>

<style lang="stylus">
border-radius = 2px

.dashboard-patent-applications-chart
    width 45vw
    margin 30px auto 0
    padding-bottom 30px

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