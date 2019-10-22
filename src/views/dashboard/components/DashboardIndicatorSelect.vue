<template>
    <div class="dashboard-indicator-select">
        <select v-model="indicator" name="indicator" id="indicator-select">
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

const { mapGetters, mapState, mapMutations } = createNamespacedHelpers(
    'dashboard'
)

export default {
    name: 'DashboardIndicatorSelect',
    computed: {
        ...mapState(['selectedIndicator']),
        ...mapGetters(['indicatorsGroupedByCode']),
        indicator: {
            get() {
                return this.selectedIndicator
            },
            set(value) {
                this.setSelectedIndicator(value)
            }
        },
        indicatorGroups() {
            const keys = Object.keys(this.indicatorsGroupedByCode)
            const groups = keys.map(key => ({
                code: key,
                description: this.indicatorsGroupedByCode[key].description
            }))

            return groups.sort((itemA, itemB) => {
                const countryA = itemA.description
                const countryB = itemB.description

                if (countryA < countryB) return -1
                if (countryA > countryB) return 1

                return 0
            })
        }
    },
    methods: {
        ...mapMutations(['setSelectedIndicator'])
    }
}
</script>

<style lang="stylus" scoped>
.dashboard-indicator-select
    margin-top 10px
</style>
