<template>
  <div class="container">
    <div class="select">
      <Select 
        :select-options="selectOptions"
        :select-value="filter"
        @change="filterTasks"
      />
    </div>
    <div v-if="tasks.length">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Tags</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(task, idx) in filtedTasks" 
          :key="task.id"
          @click="getTask(task.id)"
        >
          <td>{{ idx + 1 }}</td>
          <td>
            {{ task.title }}
          </td>
          <td>
            <div class="description">
              {{ task.description }}
            </div>
          </td>
          <td>
            <span v-for="(tag, index) in task.tags" :key="index">#{{
              tag.text
            }} </span>
          </td>
          <td>
            {{ getDate(task.date) }}
          </td>
          <td 
          :class="{'invalid': task.status === 'expired', 'completed': task.status === 'complete'}"
          >
            {{ task.status }}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div v-else>
      No tasks yet
    </div>
  </div>
</template>
<script>
import Select from "@/components/Select"
export default {
  name: "Tasks-list",
  components: {
    Select
  },
  data() {
    return {
      filter: 'all',
      selectOptions: [
        {
          id: 1,
          name: 'All',
          value: 'all',
          chosen: true,
        },
        {
          id: 2,
          name: 'Active',
          value: 'active',
          chosen: false,
        },
         {
          id: 3,
          name: 'Complete',
          value: 'complete',
          chosen: false,
        },
         {
          id: 4,
          name: 'Expired',
          value: 'expired',
          chosen: false,
        },
      ]
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    filtedTasks() {
      if (this.filter === 'all') {
        return this.tasks
      }
      return this.tasks.filter(item => item.status === this.filter)
    }
  },
  methods: {
    filterTasks(item) {
      this.filter = item.value
    },
    getDate(date) {
      const dateFormat = new Date(date)
      return dateFormat.getFullYear() + "/" + (dateFormat.getMonth() + 1) + "/" + dateFormat.getDate()
    },
    getTask(id) {
      this.$router.push(`/tasks/${id}`)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/vars.scss";
table {
  thead tr {
    border-bottom: 0;
  }
  tbody tr {
    cursor: pointer;
    transition: all .3s ease;
    &:hover {
      transform: translateY(-2px)
    }
  }
  tr:not(:last-child) {
    border-bottom: 1px solid $lightGray;
  }
  th {
    text-align: left;
    padding-bottom: 5px;
  }
  td {
    padding: 12px 10px 12px 0;
    .description {
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
