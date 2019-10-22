<template>
    <div class="dashboard">
        <DashboardHeader />
        <DashboardCard />
        <DashboardPatentApplicationsChart />
        <DashboardGDPChart />
        <DashboardModalForm />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import DashboardHeader from './components/DashboardHeader.vue'
import DashboardCard from './components/DashboardCard.vue'
import DashboardPatentApplicationsChart from './components/DashboardPatentApplicationsChart.vue'
import DashboardGDPChart from './components/DashboardGDPChart.vue'
import DashboardModalForm from './components/DashboardModalForm.vue'

const { mapActions } = createNamespacedHelpers('dashboard')

export default {
    name: 'Dashboard',
    components: {
        DashboardHeader,
        DashboardPatentApplicationsChart,
        DashboardGDPChart,
        DashboardModalForm,
        DashboardCard
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
</style>
