<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="fab-transition"
    max-width="800"
  >
    <v-card tile class="pb-6">
      <div class="d-flex justify-space-between mb-5">
        <v-card-title class="py-3 ml-3">Category</v-card-title>

        <v-btn icon text class="ma-3" @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <div class="mx-8">
            <validation-provider
              v-slot="{ errors }"
              name="Title"
              rules="required"
            >
              <v-text-field
                v-model="title"
                label="Title"
                :error-messages="errors"
                required
              />
            </validation-provider>
          </div>

          <div class="mx-8">
            <v-btn
              block
              type="submit"
              class="white--text"
              color="#cc0000"
              depressed
            >
              Save
            </v-btn>
          </div>
        </v-form>
      </validation-observer>
    </v-card>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>
<script>
import CategoryService from '../services/CategoryService'
export default {
  name: 'CategoryModal',
  props: ['openDialog', 'category'],
  data () {
    return {
      loading: false,
      title: ''
    }
  },
  watch: {
    category: {
      handler (v) {
        if (v && v !== 'new' && v.title) {
          this.title = v.title
        }
      },
      immediate: true
    }
  },
  computed: {
    dialog () {
      return this.openDialog
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeDialog')
    },
    async onSubmit () {
      try {
        this.loading = true
        if (this.category === 'new') {
          await CategoryService.create({ title: this.title, description: ' ' })
        } else {
          await CategoryService.findByIdAndUpdate(this.category._id, {
            title: this.title
          })
        }
        this.loading = false
        this.title = ''
        this.closeModal()
      } catch (e) {
        this.loading = false
        console.error(e)
      }
    }
  }
}
</script>
