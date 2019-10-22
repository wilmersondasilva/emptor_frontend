<template>
    <div class="dashboard-table">
        <table class="indicator-table">
            <thead>
                <tr>
                    <th
                        v-for="column in columns"
                        :key="column.title"
                        :class="column.class"
                    >
                        {{ column.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="row" v-for="row in data" :key="row.id">
                    <td
                        v-for="column in columns"
                        :key="column.title"
                        :class="column.class"
                    >
                        {{
                            column.formatter
                                ? column.formatter(row[column.attribute])
                                : row[column.attribute]
                        }}
                    </td>
                    <td class="edit">
                        <button class="edit-button" @click="editData(row.id)">
                            Edit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="footer">
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

const { mapGetters, mapState, mapActions } = createNamespacedHelpers(
    'dashboard'
)

export default {
    name: 'DashboardTable',
    data() {
        return {
            columns: [
                {
                    title: 'Country',
                    attribute: 'country_name',
                    class: 'country'
                },
                {
                    title: 'Country Code',
                    attribute: 'country_code',
                    class: 'country-code'
                },
                {
                    title: 'Value',
                    attribute: 'value',
                    class: 'value',
                    formatter: value => {
                        return Number(value).toLocaleString()
                    }
                }
            ],
            selectedYear: 2018
        }
    },
    computed: {
        ...mapState(['selectedIndicator']),
        ...mapGetters(['indicatorsGroupedByCode', 'years']),
        data() {
            const indicator = this.indicatorsGroupedByCode[
                this.selectedIndicator
            ]

            if (!indicator) return []

            const data = indicator.data.filter(
                item => item.year === String(this.selectedYear)
            )
            const sortedData = data.sort((itemA, itemB) => {
                const countryA = itemA.country_name
                const countryB = itemB.country_name

                if (countryA < countryB) return -1
                if (countryA > countryB) return 1

                return 0
            })

            return sortedData
        }
    },
    methods: {
        ...mapActions(['showModal', 'selectIndicatorToEdit']),
        editData(id) {
            this.selectIndicatorToEdit(id)
            this.showModal()
        }
    }
}
</script>

<style lang="stylus" scoped>
.dashboard-table
    width 100%
    background-color #fff
    border 1px solid #e4e9ec

    .indicator-table
        margin 50px auto

        .row
            padding 15px 10px

        .country, .country-code, .year, .value
            padding 10px 20px

        .year, .value
            text-align right

        .country, .country-code
            text-align left

        .country-code
            display none

        .row + .row
            margin-top 15px
            border-top 1px solid #fefefe

        .edit-button
            color #3968bd
            margin 0 20px

            &:focus
                color #5e6275
                font-weight 500
                outline none

    .footer
        height 48px
        padding 4px 0
        background-color #f8f9fa
        border-bottom-left-radius border-radius
        border-bottom-right-radius border-radius
        border-top 1px solid #e4e9ec
        display flex
        justify-content space-evenly

        .select
            width 45%

    @media screen and (min-width: 530px)
        .indicator-table
            .country-code
                display block
</style>
