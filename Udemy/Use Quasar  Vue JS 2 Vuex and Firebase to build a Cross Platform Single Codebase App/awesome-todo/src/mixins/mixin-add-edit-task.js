import ModalHeader from "components/Tasks/Modals/Shared/ModalHeader";
import ModalTaskName from "components/Tasks/Modals/Shared/ModalTaskName";
import ModalDueDate from "components/Tasks/Modals/Shared/ModalDueDate";
import ModalDueTime from "components/Tasks/Modals/Shared/ModalDueTime";
import ModalButtons from "components/Tasks/Modals/Shared/ModalButtons";


export default {
  methods: {
    submitForm() {
      this.$refs.modalTaskName.$refs.name.validate();
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
  },

  components: {
    ModalButtons,
    ModalDueTime,
    ModalDueDate,
    ModalTaskName,
    ModalHeader
  },

}
