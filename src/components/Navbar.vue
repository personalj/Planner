<template>
  <div class="header">
    <div class="container">
      <router-link to="/" class="header__left">Planner</router-link>
      <div class="header__right">
        <ul class="nav">
          <li class="nav__item" v-for="link in links" :key="link.id">
            <router-link
              class="nav__link"
              :to="link.path"
              :active-class="'active'"
              exact
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      activeItem: 0,
      links: [
        { id: 0, label: "Create", path: "/" },
        { id: 1, label: "Tasks", path: "/tasks" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/vars.scss";
.header {
  padding: 10px;
  margin-bottom: 50px;
  background: $lightBlue;
  & > .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__item:not(&:last-child) {
    padding: 0 10px;
  }
  &__link {
    font-size: 0.93rem;
    transition: all 0.3s ease;
    &:hover,
    &.active {
      color: $blue;
    }
  }
}
</style>
