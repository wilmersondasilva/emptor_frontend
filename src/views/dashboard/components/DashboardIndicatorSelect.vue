<template>
    <div class="dashboard-indicator-select">
        <select v-model="selectedIndicator" name="indicator" id="indicator-select">
            <option
                v-for="group in indicatorGroups"
                :key="group.code"
                :value="group.code"
            >
                {{ group.description }}
            </option>
        </select>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapState } = createNamespacedHelpers('dashboard')

export default {
    name: 'DashboardIndicatorSelect',
    data() {
        return {
            ...mapState(['selectedIndicator'])
        }
    },
    computed: {
        ...mapGetters(['dataGroupedByIndicatorCode']),
        indicatorGroups() {
            const keys = Object.keys(this.dataGroupedByIndicatorCode)
            return keys.map(key => ({
                code: key,
                description: this.dataGroupedByIndicatorCode[key].description
            }))
        }
    },
    methods: {
        selectIndicator() {
            console.log(arguments)
        }
    }
    
}
</script>

<style lang="stylus" scoped>
.dashboard-indicator-select
    margin-top 10px
</style>
