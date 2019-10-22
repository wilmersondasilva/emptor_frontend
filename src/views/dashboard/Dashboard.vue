<template>
    <div class="dashboard">
        <DashboardHeader />
        <DashboardIndicatorSelect />
        <DashboardPopulationTotalChart />
        <DashboardPatentApplicationsChart />
        <DashboardTable />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import DashboardHeader from './components/DashboardHeader.vue'
import DashboardIndicatorSelect from './components/DashboardIndicatorSelect.vue'
import DashboardPopulationTotalChart from './components/DashboardPopulationTotalChart.vue'
import DashboardPatentApplicationsChart from './components/DashboardPatentApplicationsChart.vue'
import DashboardTable from './components/DashboardTable.vue'

const { mapActions } = createNamespacedHelpers('dashboard')

export default {
    name: 'Dashboard',
    components: {
        DashboardHeader,
        DashboardIndicatorSelect,
        DashboardPopulationTotalChart,
        DashboardPatentApplicationsChart,
        DashboardTable
    },
    created() {
        this.fetchData()
    },
    methods: {
        ...mapActions(['fetchData'])
    }
}
</script>

<style lang="stylus">
.dashboard
    height 100%
    background-color #f4f6fc

    .dashboard-population-total-chart, .dashboard-patent-applications-chart
        display none
</style>
