<template>
    <div class="dashboard">
        <DashboardHeader />
        <DashboardIndicatorSelect />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import DashboardHeader from './components/DashboardHeader.vue'
import DashboardIndicatorSelect from './components/DashboardIndicatorSelect.vue'

const { mapActions } = createNamespacedHelpers('dashboard')

export default {
    name: 'Dasboard',
    components: {
        DashboardHeader,
        DashboardIndicatorSelect
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
