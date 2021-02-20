<template>
  <div>
    <UploaderForm
        @chosen="handleFilesChosen"
    />

    <UploaderFile
        :endpoint="determineEndpointFor(upload.file.type)"
        :baseURL="options.baseURL"
        v-for="(upload, index) in uploads"
        :key="index"
        :upload="upload"
    />
  </div>
</template>

<script>
  import UploaderForm from "./UploaderForm";
  import UploaderFile from "./UploaderFile";
  import options from "../options";
  import get from "lodash.get"

  export default {
    name: "Uploader",

    components: {
      UploaderFile,
      UploaderForm
    },

    data() {
      return {
        uploads: []
      }
    },

    props: {
      options: {
        required: false,
        type: Object,
        default: () => options
      },

      handlers: {
        required: true,
        type: Object
      }
    },

    methods: {
      determineEndpointFor(fileType) {
        return get(this.handlers[fileType], "endpoint", null)
      },

      handleFilesChosen(files) {
        this.uploads.push(...Array.from(files).map(file => {
          return {
            file
          }
        }))
      }
    }
  }
</script>