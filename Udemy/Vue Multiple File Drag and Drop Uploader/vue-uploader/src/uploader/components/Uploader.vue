<template>
  <div>
    <UploaderForm
        @chosen="handleFilesChosen"
    />

    <div class="mb-4 flex justify-between px-4 text-gray-600 text-sm">
      <span>{{this.uploads.length}} uploads ({{currentUploadCount}} in progress / {{completedUploadCount}} complete)</span>
      <span>{{overallProgress}}% completed</span>
    </div>

    <UploaderFile
        :endpoint="determineEndpointFor(upload.file.type)"
        :baseURL="options.baseURL"
        v-for="(upload, index) in uploads"
        :key="index"
        :upload="upload"
        @progress="handleUploadProgress"
        @change="handleUploadChange"
    />
  </div>
</template>

<script>
  import UploaderForm from "./UploaderForm";
  import UploaderFile from "./UploaderFile";
  import options from "../options";
  import states from "../states";
  import get from "lodash.get";
  import { v4 as uuidv4 } from 'uuid';

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

    computed: {
      currentUploadCount() {
        return this.uploads.filter(upload => {
          return upload.uploading
        }).length;
      },

      completedUploadCount() {
        return this.uploads.filter(upload => {
          return upload.completed
        }).length;
      },

      overallProgress() {
        if (this.uploads.length === 0) {
          return 0;
        }

        let uploads = this.uploads.filter(upload => {
          return !upload.cancelled && !upload.failed;
        })

        if (uploads.length === 0) {
          return 0;
        }

        return parseInt(
          uploads.reduce((current, initial) => current + initial.progress, 0) / uploads.length
        );
      }
    },

    methods: {
      handleUploadChange(e) {
        switch (e.state) {
          case states.UPLOADING:
            this.uploads = this.uploads.map(upload => {
              if (e.id === upload.id) {
                upload.uploading = true;
              }
              return upload;
            })
            break;
          case states.COMPLETED:
            this.uploads = this.uploads.map(upload => {
              if (e.id === upload.id) {
                upload.completed = true;
                upload.uploading = false;
              }
              return upload;
            })
            break;
          case states.CANCELLED:
            this.uploads = this.uploads.map(upload => {
              if (e.id === upload.id) {
                upload.cancelled = true;
                upload.uploading = false;
              }
              return upload;
            })
            break;
          case states.FAILED:
            this.uploads = this.uploads.map(upload => {
              if (e.id === upload.id) {
                upload.failed = true;
                upload.uploading = false;
              }
              return upload;
            })
            break;
        }
      },

      handleUploadProgress(e) {
        this.uploads = this.uploads.map(upload => {
          if (e.id === upload.id) {
            upload.progress = e.progress;
          }

          return upload;
        })
      },

      determineEndpointFor(fileType) {
        return get(this.handlers[fileType], "endpoint", null)
      },

      handleFilesChosen(files) {
        this.uploads.push(...Array.from(files).map(file => {
          return {
            id: uuidv4(),
            progress: 0,
            uploading: false,
            completed: false,
            cancelled: false,
            failed: false,
            queued: true,
            file
          }
        }))
      }
    },

    mounted() {
      setInterval(() => {
        if (this.currentUploadCount >= this.options.maxConcurrentUploads) {
          return;
        }
        
        let queued = this.uploads.filter(upload => {
          return upload.queued === true;
        })

        if (queued.length) {
          queued[0].queued = false;
        }
      }, 500)

    }
  }
</script>