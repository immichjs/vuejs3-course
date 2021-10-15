<template>
  <template v-if="question">
    <ScoreBoard :winCount="winCount" :loseCount="loseCount"/>

    <h1 v-html="question"></h1>

    <template v-for="(answer, index) in answers" :key="index">
      <input type="radio" name="options" :value="answer" v-model="chosenAnswer" :disabled="answerSubmitted">
      <label v-html="answer"></label><br>
    </template>
  </template>

  <button v-if="!answerSubmitted" @click="submitAnswer" class="send" type="button">Enviar</button>

  <section class="result" v-if="answerSubmitted">
    <h4 v-if="chosenAnswer == correctAnswear" v-html="`&#9989; Você acertou a resposta ${correctAnswear} está correta.`" />
    <h4 v-else v-html="`&#10060; Você selecionou a resposta errada. A correta era: ${correctAnswear}.`" />
    <button class="send" type="button" @click="getNewQuestion">Próxima pergunta</button>
  </section>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard.vue'

export default {
  name: 'App',
  components: {
    ScoreBoard
  },
  data () {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswear: undefined,
      chosenAnswer: undefined,
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0
    }
  },
  computed: {
    answers () {
      const answers = JSON.parse(JSON.stringify(this.incorrectAnswers))
      answers.splice(Math.round(Math.random() * 4), 0, this.correctAnswear)
      return answers
    }
  },
  created () {
    this.getNewQuestion()
  },
  methods: { 
    submitAnswer () {
      if (!this.chosenAnswer) {
        alert('Esocolha uma das opções')
        return
      }

      this.answerSubmitted = true
      this.chosenAnswer === this.correctAnswear ? this.winCount++ : this.loseCount++
    },
    getNewQuestion () {
      this.answerSubmitted = false
      this.chosenAnswer = null
      this.question = null

      this.axios.get('https://opentdb.com/api.php?amount=1&category=18')
      .then(response => {
        this.question = response.data.results[0].question,
        this.incorrectAnswers = response.data.results[0].incorrect_answers
        this.correctAnswear = response.data.results[0].correct_answer
      })
    }
  }
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin: 60px auto 0
  max-width: 960px

  input[type=radio]
    margin: 12px 4px
  
  button.send
    margin-top: 12px
    height: 40px
    min-width: 120px
    padding: 0 16px
    color: #fff
    background-color: #1867c0
    border: 1px solid #1867c0
    cursor: pointer
    

</style>
