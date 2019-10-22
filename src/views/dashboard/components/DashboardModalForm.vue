<template>
    <Modal v-if="isModalVisible" class="dashboard-modal-form">
        <template v-slot:header>
            <h1 class="title">{{ indicatorToEdit.name }}</h1>
        </template>

        <template v-slot:body>
            <form id="modal-form" @submit.prevent="submitForm">
                <div class="group">
                    <label for="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        readonly
                        v-model="indicatorToEdit.country_name"
                    />
                </div>
                <div class="group">
                    <label for="year">Year</label>
                    <input
                        type="text"
                        id="year"
                        readonly
                        v-model="indicatorToEdit.year"
                    />
                </div>
                <div class="group">
                    <label for="value">Value</label>
                    <input
                        type="number"
                        id="value"
                        v-model="indicatorToEdit.value"
                    />
                </div>
            </form>
        </template>

        <template v-slot:footer>
            <div class="button-container">
                <button type="button" class="button" @click="hideModal">
                    Cancel
                </button>
                <button
                    type="sumbit"
                    form="modal-form"
                    class="button button-submit"
                >
                    Save
                </button>
            </div>
        </template>
    </Modal>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import Modal from '@/components/shared/Modal.vue'

const { mapState, mapActions } = createNamespacedHelpers('dashboard')

export default {
    name: 'DashboardModal',
    components: {
        Modal
    },
    computed: {
        ...mapState(['isModalVisible', 'indicatorToEdit'])
    },
    methods: {
        ...mapActions(['hideModal', 'editData']),
        async submitForm() {
            const { id, value } = this.indicatorToEdit
            const response = await this.editData({ id, value })
            if (response.status === 200) this.hideModal()
        }
    }
}
</script>

<style lang="stylus" scoped>
.dashboard-modal-form
    .group
        width 100%
        padding 5px 0

        label
            display block
            font-weight 700
            color #4a5568
            min-width 50px
            text-align left

        input
            margin-top 5px
            width 100%
            display block
            color #4a5568
            text-align left
            border 1px solid #e2e8f0
            padding 5px
            height 38px
            box-shadow 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)
            border-radius 4px
            cursor text

            &:focus
                outline none

        input[readonly]
            border none
            box-shadow none
            padding 0

    .group + .group
        margin-top 5px

    .button-container
        display flex
        justify-content flex-end

        .button
            height 40px
            min-width 120px
            border-radius 4px
            border 1px solid #eeeeee

            &:focus
                outline none

        .button-submit
            background-color #3968bd
            color #fff

        .button + .button
            margin-left 10px

    .title
        width 80%
        margin auto
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
