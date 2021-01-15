<template>
  <div>
    <v-menu
        bottom
        left
    >
      <template v-slot:activator="{on, attrs}">
        <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            icon
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <DialogDelete
        v-if="dialogs.delete"
        @close="dialogs.delete = false"
        :task="task"
    />

    <DialogDueDate
        v-if="dialogs.dueDate"
        @close="dialogs.dueDate = false"
        :task="task"
    />

    <DialogEdit
        v-if="dialogs.edit"
        @close="dialogs.edit = false"
        :task="task"
    />
  </div>
</template>

<script>
  import DialogDelete from "./Dialogs/DialogDelete";
  import DialogEdit from "./Dialogs/DialogEdit";
  import DialogDueDate from "./Dialogs/DialogDueDate";


  export default {
    name: "TaskMenu",

    components: {
      DialogDueDate,
      DialogEdit,
      DialogDelete},

    props: ["task"],

    data() {
      return {
        dialogs: {
          delete: false,
          edit: false,
          dueDate: false
        },

        items: [
          {
            title: "Edit",
            icon: "mdi-pencil",
            click() {
              this.dialogs.edit = true;
            }
            },
          {
            title: "Due date",
            icon: "mdi-calendar",
            click() {
              this.dialogs.dueDate = true;
            }
            },
          {
            title: "Delete",
            icon: "mdi-delete",
            click() {
              this.dialogs.delete = true;
            }
          },
          {
            title: "Sort",
            icon: "mdi-drag-horizontal-variant",
            click() {
              if (!this.$store.state.search) {
                this.$store.commit("toggleSorting")
              } else {
                this.$store.commit("showSnackbar", "Can't sort while searching!")
              }
            }
          }
        ]
      }
    },

    methods: {
      handleClick(index) {
        this.items[index].click.call(this);
      }
    }
  }
</script>

<style scoped>

</style>