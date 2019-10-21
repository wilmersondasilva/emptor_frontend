<template>
    <div class="dashboard">
        <DashboardHeader />
        <DashboardIndicatorSelect />
        <DashboardPopulationTotalChart />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import DashboardHeader from './components/DashboardHeader.vue'
import DashboardIndicatorSelect from './components/DashboardIndicatorSelect.vue'
import DashboardPopulationTotalChart from './components/DashboardPopulationTotalChart.vue'

const { mapActions } = createNamespacedHelpers('dashboard')

export default {
    name: 'Dashboard',
    components: {
        DashboardHeader,
        DashboardIndicatorSelect,
        DashboardPopulationTotalChart  
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
    height 100vh
    background-color #f4f6fc
</style>
