<template>
    <div id="app">
        <headerDiv></headerDiv>
        <!-- <router-view/> -->
        <footerDiv></footerDiv>
    </div>
</template>

<script>
import headerDiv from './components/header'
import footerDiv from './components/footer'
export default {
    components: {
        headerDiv,
        footerDiv
    },
}
</script>

<style lang="scss">
</style>
