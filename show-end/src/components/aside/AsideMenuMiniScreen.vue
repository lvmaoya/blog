<template>
  <div>
    <ul id="navigationMenu">
      <li v-for="item in asideItem" :key="item.className" @click="handleAsideTagClick(item.className)">
        <a href="javascript:;" :class="item.className">
          <span class="backgroundSpan">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`${item.iconHref}`"></use>
            </svg>
          </span>
        </a>
        <span class="title">
          {{ item.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props, { emit }) {
    const asideItem = ref([
      {
        className: "home",
        iconHref: "#icon-home-filling",
        title: "All",
      },
      {
        className: "search",
        iconHref: "#icon-sousuo",
        title: "Search",
      },
      {
        className: "update",
        iconHref: "#icon-gengxin",
        title: "Recent",
      },
      {
        className: "hot",
        iconHref: "#icon-hot",
        title: "Hot",
      },
      {
        className: "category",
        iconHref: "#icon-fenlei",
        title: "category",
      },
    ]);
    const handleAsideTagClick = (value) => {
      emit("asideTagClick", value);
    };
    return { asideItem, handleAsideTagClick };
  },
};
</script>

<style scoped lang="scss">
#navigationMenu {
  display: flex;
  width: 70%;
  margin: 0 auto;
  justify-content: space-around;
  display: none;
  li {
    list-style: none;
    height: 6em;
    margin-bottom: 5px;
    text-align: center;

    a {
      height: 4em;
      width: 4em;
      display: block;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 5px;

      .backgroundSpan {
        height: 100%;
        width: 100%;
        display: block;
        position: absolute;
        line-height: 4.9em;
        text-align: center;
        z-index: 10;
        .icon {
          width: 2em;
          height: 2em;
          color: white;
        }
      }
    }
    .title {
      color: #555666;
    }
    .home {
      .backgroundSpan {
        background-color: #ffbd39;
      }
    }
    .search {
      .backgroundSpan {
        background-color: #e61c5d;
      }
    }
    .update {
      .backgroundSpan {
        background-color: #930077;
      }
    }
    .hot {
      .backgroundSpan {
        background-color: #3a0088;
      }
    }
    .category {
      .backgroundSpan {
        background-color: #f95959;
      }
    }
  }
}
@media screen and (max-width: 770px) {
  #navigationMenu {
    display: block;
    display: flex;
  }
}
@media screen and (max-width: 680px) {
  #navigationMenu {
    li {
      list-style: none;
      height: 5em;
      margin-bottom: 5px;
      .title {
        font-size: 0.9em;
      }
      a {
        height: 3em;
        width: 3em;
        margin: 5px auto;
        .backgroundSpan {
          line-height: 3.4em;

          .icon {
            width: 1.5em;
            height: 1.5em;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 480px) {
  #navigationMenu {
    width: 80%;

    li {
      list-style: none;
      height: 4em;
      margin-bottom: 5px;
      .title {
        font-size: 0.8em;
      }
      a {
        height: 2.3em;
        width: 2.3em;
        margin: 5px auto;
        .backgroundSpan {
          line-height: 2.3em;

          .icon {
            width: 1em;
            height: 1em;
          }
        }
      }
    }
  }
}
</style>
