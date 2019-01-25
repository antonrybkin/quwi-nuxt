<template>
  <div>
    <h1>Edit My Project:</h1>
    <b-container class="bg-light project__list">
      <b-row class="align-items-center">
        <b-col class="text-right">Project Name:</b-col>
        <b-col><input type="text" v-model="project.name"></b-col>
      </b-row>
    </b-container>
    <div class="text-center">
      <b-button @click="submit">Сохранить</b-button>
      <b-button @click="back">Вернуться</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        project: []
      }
    },
    asyncData({ $axios, app }) {
      return $axios.$get(`projects-manage/${app.context.query.id}`).then(response => {
        return { project: response.project }
      })
    },
    methods: {
      submit() {
        this.$axios.$post(`projects-manage/update?id=${this.project.id}`, this.project).then(() => {
          this.$router.push('/home')
        })
      },
      back() {
        window.history.back()
      }
    }
  }
</script>
