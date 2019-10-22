<template>
    <Modal v-if="isModalVisible" />
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import Modal from '@/components/shared/Modal.vue'

const { mapState } = createNamespacedHelpers('dashboard')

export default {
    name: 'DashboardModal',
    components: {
        Modal
    },
    computed: {
        ...mapState(['isModalVisible', 'indicatorToEdit'])
    }
};
</script>