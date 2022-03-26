<template>
  <v-row>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-col cols="12">
      <div class="d-flex justify-space-between mx-6">
        <h3>Categories</h3>
        <v-btn class="white--text mt-3" color="#c00" depressed @click="onNew">New</v-btn>
      </div>
      <div class="d-flex justify-center">
        <v-list class="col" style="max-width: 480px">
          <v-list-item v-for="(category, i) in categories" :key="i">
            <v-list-item-content>
              <v-list-item-title>{{ category.title }}</v-list-item-title>
            </v-list-item-content>
            <v-btn icon @click="onEdit(category)"><v-icon>mdi-pencil</v-icon></v-btn>
            <!-- <v-btn icon><v-icon>mdi-delete</v-icon></v-btn> -->
          </v-list-item>
        </v-list>
      </div>
    </v-col>
    <category-modal
      :openDialog="categoryModal"
      :category="editCategory"
      @closeDialog="closeDialog"
    />
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryService from "../../services/CategoryService";
import CategoryModal from "../../components/CategoryModal.vue";

export default {
  name: "CategoriesAdmin",
  components: { CategoryModal },
  data() {
    return {
      categories: null,
      editCategory: null,
      categoryModal: false,
      loading: true
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  async mounted() {
    await this.fetchCategories();
    this.loading = false
  },
  watch: {
    currentUser: {
      handler(v) {
        if (v && v.role) {
          if (v.role !== "admin") this.$router.push({ name: "Home" });
        }
      },
      immediate: true,
    },
  },
  methods: {
    async fetchCategories() {
      this.categories = await CategoryService.getAll();
      this.categories = this.categories.data.data;
    },
    async closeDialog() {
      this.categoryModal = false;
      this.editCategory = null;
      await this.fetchCategories();
    },
    onEdit(category) {
      this.editCategory = category
      this.categoryModal = true
    },
    onNew() {
      this.editCategory = 'new'
      this.categoryModal = true
    }
  },
};
</script>