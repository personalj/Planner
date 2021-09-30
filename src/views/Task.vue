<template>
  <div class="container">
    <form v-if='task' @submit.prevent="handleSubmit" class="form">
      <div class="form__header">
        <div class="form__title">Edit Task</div>
      </div>
      <div class="form__item">
        <label for="title"> Title </label>
        <input
          id="title"
          class="input-default"
          type="text"
          placeholder="Title"
          v-model="title"
          :class="{ error: $v.title.$dirty && !$v.title.required }"
        />
        <small v-if="$v.title.$dirty && !$v.title.required" class="invalid">
          Field is required
        </small>
      </div>
      <div class="form__item">
        <div>Add tags</div>
        <div :class="{ error: $v.tags.$dirty && !$v.tags.required }">
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="(newTags) => (tags = newTags)"
          />
        </div>
        <small v-if="$v.tags.$dirty && !$v.tags.required" class="invalid">
          Field is required
        </small>
      </div>
      <div class="form__item">
        <div>Choose deadline</div>
        <date-picker v-model="datepicker"> </date-picker>
      </div>
      <div class="form__item textarea">
        <label for="description"> Description </label>
        <textarea
          id="description"
          class="input-default"
          type="text"
          placeholder="Description"
          v-model="description"
          :class="{
            error:
              ($v.description.$dirty && !$v.description.required) ||
              ($v.description.$dirty && !$v.description.maxLength),
          }"
        />
        <div>
          <small
            v-if="$v.description.$dirty && !$v.description.required"
            class="invalid"
          >
            Field is required
          </small>
          <small
            v-else-if="$v.description.$dirty && !$v.description.maxLength"
            class="invalid"
          >
            Max symbols {{ $v.decription.$params.maxLength.max }}
          </small>
        </div>
        <span>symbols {{ description.length }}/2048</span>
      </div>
      <div class="form__footer">
          <button type="submit" class="btn-default">Update</button>
           <button
          type="button"
          class="btn-default featured"
          @click="changeStatus"
        >
          {{ status !== "complete" ? "Complete" : "Open" }}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  name: "Task",
  data() {
    return {
      title: "",
      description: "",
      tag: "",
      tags: [],
      datepicker: null,
      status: null
    };
  },
  computed: {
    task() {
      return this.$store.getters.tasks.find((item) => item.id === +this.$route.params.id);
    }
  },
  methods: {
    changeStatus() {
      this.$store.dispatch("changeStatus", +this.$route.params.id);
      this.$router.push("/tasks");
    },
    handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        id: new Date().getTime(),
        title: this.title,
        description: this.description,
        tags: this.tags,
        date: this.datepicker || new Date(),
        status: this.status,
      };
      this.$store.dispatch("updateTask", { item: formData, id: +this.$route.params.id} );
      this.$router.push("/tasks");
    },
  },
  mounted() {
    this.title = this.task.title;
    this.description = this.task.description;
    this.tags =this.task.tags;
    this.datepicker = new Date(this.task.date);
    this.status = this.task.status;
  },
  validations: {
    title: {
      required,
    },
    description: {
      required,
      maxLength: maxLength(2048),
    },
    tags: {
      required,
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  &__title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  max-width: 400px;
  margin: 0 auto;
  &__item {
    margin-bottom: 20px;
    &.textarea {
      textarea {
        min-height: 150px;
      }
    }
  }
}
</style>
