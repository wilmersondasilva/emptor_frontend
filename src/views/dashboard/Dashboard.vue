<template>
    <div class="dashboard">
        <DashboardHeader />
    </div>
</template>

<script>
import DashboardHeader from './components/DashboardHeader.vue'

export default {
    name: 'Home',
    components: {
        DashboardHeader,
    },
}
</script>

<style lang="stylus">
.dashboard
    height 100vh
    background-color #f4f6fc
</style>