<template>
  <div>
    <!--Home-->
    <div class="flex flex-col xs:mx-auto xs:px-3 xs:px-8 md:w-3xl lg:w-9/12">
      <!--Top = Image + Text-->
      <div class="flex flex-col lg:flex-row">
        <!--Image-->
        <div class="w-2/4 mx-auto mt-12 sm:w-2/5 lg:w-1/3 lg:mx-0 lg:order-2">
          <img src="@/assets/icons-hero.png" alt="">
        </div>

        <!--Text-->
        <div class="flex flex-col px-4 xs:justify-center xs:items-center lg:w-2/3 lg:order-1 lg:justify-start">

          <!--Teal button-->
          <button class="mt-4 bg-teal-100 rounded py-1 w-full text-md w-7/12 rounded px-1 sm:w-72 sm:px-0 sm:rounded-full">
            <span class="font-bold">New in v1.4.0:</span>
            60+ weather icons!
          </button>

          <!--Bootstrap header-->
          <h2 class="text-3xl text-center font-semibold mt-6 xs:text-5xl">
            Bootstrap Icons
          </h2>

          <!--Text-->
          <p class="text-xl text-center mt-4 sm:text-2xl">
            Free, high quality, open source icon library with over 1,300 icons.
            Include them anyway you like—SVGs, SVG sprite, or web fonts.
            Use them with or without
            <a href="#" class="underline text-blue-600">
              Bootstrap
            </a>
            in any project.
          </p>

          <!--NPM-->
          <div class="mx-auto w-72 mt-8 px-4 py-5 bg-gray-50 rounded">
            <div class="flex justify-between items-center">
              <p class="tracking-wider">
                <span class="text-gray-400">$</span> npm i bootstrap-icons
              </p>

              <svg focusable="false" data-prefix="far" data-icon="clipboard" class="svg-inline--fa fa-clipboard h-6 w-6 text-gray-400" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!--Bottom-->
      <!--Icons-->
      <div class="w-full px-4">
        <Icons @search="searchIcon"/>

        <div class="grid grid-cols-3 xs:grid-cols-4 gap-6 lg:grid-cols-6">
          <Icon
              v-for="icon in filteredIcons"
              :key="icon.id"
              :code="icon.code"
              :name="icon.name"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Icons from "../components/Icons";
  import Icon from "../components/Icon";
  export default {
    name: 'Home',
    components: {
      Icon,
      Icons
    },
    data() {
      return {
        searchString: "",
        icons: [
          {id: 1, name: "copy", code: "fas fa-copy"},
          {id: 2, name: "align-center", code: "fas fa-align-center"},
          {id: 3, name: "bold", code: "fas fa-bold"},
          {id: 4, name: "clone", code: "far fa-clone"},
          {id: 5, name: "edit", code: "far fa-edit"},
          {id: 6, name: "glasses", code: "fas fa-glasses"},
          {id: 7, name: "list-alt", code: "far fa-list-alt"},
          {id: 8, name: "paper-plane", code: "far fa-paper-plane"},
        ]
      }
    },
    computed: {
      filteredIcons() {
        return this.icons.filter(icon => {
          return icon.name.includes(this.searchString);
        })
      }
    },
    methods: {
      searchIcon(str) {
        this.searchString = str;
      }
    }
  }
</script>
