<template>
  <div>
    <h1>My Projects:</h1>
    <b-container v-for="project in projects" :key="project.id" class="bg-light project__list">
      <b-row class="align-items-center" @click="editProject(project.id)">
        <b-col v-if="project.logo_url">
          <img :src="project.logo_url" alt="">
        </b-col>
        <b-col v-else>No logo :(</b-col>
        <b-col>{{ project.name }}</b-col>
        <b-col>{{project.is_active?'Active':'Not active'}}</b-col>
        <b-col>
          <div>time this week</div>
          <div>this month</div>
          <div>total</div>
        </b-col>
        <b-col>
          <div>{{ project.spent_time_week }}</div>
          <div>{{ project.spent_time_month }}</div>
          <div>{{ project.spent_time_all }}</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: []
    }
  },
  asyncData({ $axios }) {
    return $axios.$get(`projects-manage/index`).then(response => {
      return { projects: response.projects }
    })
  },
  methods: {
    editProject(id) {
      this.$router.push(this.$route.fullPath + '/edit?id=' + id)
    }
  }
}
</script>

<style>
.project__list {
  cursor: pointer;
}
</style>
