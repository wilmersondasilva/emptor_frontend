<template>
    <div class="dashboard-card">
        <div class="header">
            <div class="tabs">
                <div :class="['tab', { 'active': shouldShownChart }]" @click="selectTab('chart')">Chart</div>
                <div :class="['tab', { 'active': !shouldShownChart }]" @click="selectTab('tab')">Table</div>
            </div>
            <DashboardIndicatorSelect />
        </div>
        <div class="tabs-container">
            <div class="tab-content" v-show="shouldShownChart">
                <DashboardCommonChart />
            </div>
            <div class="tab-content" v-show="!shouldShownChart">
                <DashboardTable />
            </div>
        </div>
    </div>
</template>

<script>
import DashboardIndicatorSelect from './DashboardIndicatorSelect.vue'
import DashboardCommonChart from './DashboardCommonChart.vue'
import DashboardTable from './DashboardTable.vue'

export default {
    name: 'DashboardCard',
    components: {
        DashboardIndicatorSelect,
        DashboardCommonChart,
        DashboardTable
    },
    data() {
        return {
            selectedTab: 'chart'
        }
    },
    computed: {
        shouldShownChart() {
            return this.selectedTab === 'chart'
        }
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab
        }
    }
}
</script>

<style lang="stylus">
border-radius = 2px

.dashboard-card
    width 75vw
    margin 30px auto 0

    > .header
        padding 0 8px
        background-color #fff
        border-top-left-radius border-radius
        border-top-right-radius border-radius
        border 1px solid #e4e9ec
        border-bottom  none
        display flex
        justify-content space-between

        .dashboard-indicator-select
            width 65%

            select
                width 100%

    .tabs
        display flex
        cursor pointer

        .tab
            padding 0 12px
            height 48px
            line-height 48px

            &.active
                color #00C1D4
                border-bottom 2px solid #00C1D4
                font-weight 600
</style>