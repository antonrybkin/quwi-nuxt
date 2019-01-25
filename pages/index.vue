<template>
  <div>
    <b-jumbotron class="text-center">
      <div class="mt-1">
        <template v-if="$auth.$state.loggedIn">
          <b-btn class="ml-3" variant="info" to="/home">My Projects</b-btn>
          <b-btn class="ml-3" variant="danger" @click="$auth.logout()">Logout</b-btn>
        </template>
        <div v-else>
          <h2 class="text-center">
            Login
          </h2>
          <hr>
          <b-alert
            v-if="error"
            show
            variant="danger">
            Wrong Login or Passport. Check it, please, bro:
          </b-alert>
          <b-alert
            v-if="$auth.$state.redirect"
            show>
            You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
          </b-alert>
          <b-row
            align-h="center"
            align-v="center">
            <b-col md="4">
              <b-card bg-variant="light">
                <busy-overlay />
                <form @keydown.enter="login">
                  <b-form-group label="Username">
                    <b-input
                      ref="username"
                      v-model="username"
                      placeholder="anything" />
                  </b-form-group>

                  <b-form-group label="Password">
                    <b-input
                      v-model="password"
                      type="password"
                      placeholder="123" />
                  </b-form-group>

                  <div class="text-center">
                    <b-btn
                      variant="primary"
                      block
                      @click="login">
                      Login
                    </b-btn>
                  </div>
                </form>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-jumbotron>
    <div>
      User status:
      <b-badge>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</b-badge>
    </div>
  </div>
</template>

<script>
import busyOverlay from '~/components/busy-overlay'
export default {
  middleware: ['auth'],
  components: { busyOverlay },
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    }
  },
  methods: {
    login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            email: this.username,
            password: this.password
          }
        })
        .catch(e => {
          this.error = e + ''
        })
    }
  }
}
</script>
