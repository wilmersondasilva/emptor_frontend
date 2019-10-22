<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <header class="modal-header">
                        <slot name="header"></slot>
                    </header>
                    <main class="modal-body">
                        <slot name="body"></slot>
                    </main>
                    <footer class="modal-footer">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="stylus">
.modal-mask
    position fixed
    z-index 9998
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .5)
    display table
    transition opacity .3s ease

.modal-wrapper
    display table-cell
    vertical-align middle

.modal-container
    width 300px
    margin 0px auto
    background-color #fff
    border-radius 2px
    box-shadow 0 2px 8px rgba(0, 0, 0, .33)
    transition all .3s ease

.modal-header
    height 60px
    line-height 60px

.modal-body
    padding 0 30px

.modal-footer
    padding 30px 10px 10px

.modal-enter
    opacity 0

.modal-leave-active
    opacity 0

.modal-enter .modal-container, .modal-leave-active .modal-container
    transform scale(1.1)

@media screen and (min-width: 500px)
    .modal-container
        width 400px
</style>
