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
        ...mapGetters(['indicatorsGroupedByCode']),
        indicatorGroups() {
            const keys = Object.keys(this.indicatorsGroupedByCode)
            return keys.map(key => ({
                code: key,
                description: this.indicatorsGroupedByCode[key].description
            }))
        }
    }
    
}
</script>

<style lang="stylus" scoped>
.dashboard-indicator-select
    margin-top 10px
</style>
