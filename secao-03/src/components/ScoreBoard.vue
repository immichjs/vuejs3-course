<template>
  <section>
    Player <span>{{ winCount }}</span> X <span>{{ loseCount }}</span> Computer
  </section>
</template>

<script>
export default {
  props: ['winCount', 'loseCount']
}
</script>

<style lang="sass">
section.score
  border-bottom: 1px solid black
  padding: 24px
  font-size: 18px

  span
    padding: 8px
    font-weight: bold
    border: 1px solid black
</style>
