<template>
  <div class=" select select-wrap" :class="selectClass">
    <div
      class="select-container"
      :class="{ active: isOptionsShown }"
      v-click-outside="selectClick"
    >
      <div class="select-trigger" @click="isOptionsShown = !isOptionsShown">
        <slot></slot>
        <div class="select-value-item">
          {{ selectedOption }}
        </div>
        <div class="select-trigger-icon">
          <TriangleIcon />
        </div>
      </div>
      <transition name="slide-fade">
        <div v-if="isOptionsShown" class="select-dropdown border custom-scroll">
          <div v-if="showSearch" class="select__search">
            <input
              type="text"
              v-model="searchedOption"
              class="input-default__input"
              placeholder="Введите название устройства"
            />
          </div>
          <div v-if="selectOptions">
            <div
              v-for="option in selectOptions"
              :key="option.id"
              @click="chooseOption(option)"
            >
              <span
                v-if="isSearched(option.name)"
                :class="{ active: option.chosen }"
                class="select-dropdown__item"
              >
                {{ option.name }}
              </span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import TriangleIcon from "@/components/icons/triangle";
export default {
  props: {
    selectOptions: {
      type: Array,
      required: true,
    },
    selectClass: {
      type: String,
      required: false,
    },
    selectValue: {
      type: String,
      required: false,
    },
    showSearch: {
      type: Boolean,
      required: false,
    },
  },
  name: "selectItem",
  components: {
    TriangleIcon,
  },
  data() {
    return {
      searchedOption: "",
      isOptionsShown: false,
      selectedOption: "",
    };
  },
  watch: {
    selectOptions(selectOptions) {
      this.selectedOptionsMount();
    },
  },
  methods: {
    chooseOption(option) {
      this.selectedOption = option.name;
      this.isOptionsShown = false;
      this.searchedOption = "";
      this.selectOptions.map((item) => {
        item.chosen = item.id === option.id;
      });
      this.$emit("change", option);
    },
    selectedOptionsMount() {
      if (this.selectValue) {
        this.selectOptions.forEach((item) => {
          if (item.value === this.selectValue) {
            this.selectedOption = item.name;
            item.chosen = true;
          }
        });
        return;
      }
      this.selectedOption = this.selectOptions[0].name;
    },
    selectClick() {
      this.isOptionsShown = false;
      this.searchedOption = "";
    },
    isSearched(option) {
      if (!this.selectedOption) {
        return true;
      }
      return (
        option.toUpperCase().indexOf(this.searchedOption.toUpperCase()) > -1
      );
    },
  },
  mounted() {
    if (this.selectOptions.length) {
      this.selectedOptionsMount();
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/vars";
.select {
  max-width: 200px;
  margin-bottom: 50px;
  &__search {
    padding: 10px;
  }
  &-container {
    position: relative;
    &.active {
      .select-trigger-icon {
        transform: rotate(180deg);
      }
    }
  }
  &-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 13px;
    background: $baseWhite;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid $lightGray;
    &-icon {
      margin-left: 15px;
      transition: all 0.3s ease;
    }
    &-hidden {
      .select-trigger {
        padding: 0;
      }
      .select-value-item,
      .select-trigger-icon {
        display: none;
      }
    }
  }
  &-dropdown {
    max-height: 210px;
    overflow-y: auto;
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    background: $baseWhite;
    border-radius: 5px;
    z-index: 10;
    min-width: 150px;
    border: 1px solid $lightBlue;
    &__item {
      padding: 10px 15px;
      cursor: pointer;
      border-bottom: 1px solid $lightBlue;
      transition: all 0.3s ease;
      display: block;
      &:last-child {
          border-bottom: 0;
      }
      &:hover,
      &.active {
        background: $lightBlue;
      }
    }
  }
}
</style>