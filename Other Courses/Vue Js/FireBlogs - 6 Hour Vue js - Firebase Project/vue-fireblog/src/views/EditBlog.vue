<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview"/>
    <Loading v-show="loading"/>
    <div class="container">
      <div :class="{invisible: !error}" class="err-message">
        <p>
          <span>Error:</span>
          {{errorMsg}}
        </p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg">
          <button @click="openPreview" class="preview" :class="{'button-inactive': !blogPhotoFileURL}">
            Preview Photo
          </button>
          <span>File Chosen: {{blogPhotoName}}</span>
        </div>
      </div>

      <div class="editor">
        <QuillEditor
            v-model:content="blogHTML"
            :contentType="'html'"
            :content="blogHTML"
        />
      </div>

      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <router-link class="router-button" :to="{name: 'BlogPreview'}">
          Preview Changes
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref, defineComponent, computed, onMounted} from 'vue';
  import {useStore} from "vuex";
  import QuillEditor from "../components/QuillEditor"
  import BlogCoverPreview from "../components/BlogCoverPreview";
  import firebase from "firebase/app";
  import "firebase/storage";
  import db from "../firebase/firebaseInit";
  import {useRoute, useRouter} from "vue-router";
  import Loading from "../components/Loading";


  export default defineComponent({
    name: "CreatePost",
    components: {
      Loading,
      BlogCoverPreview,
      QuillEditor
    },
    setup() {
      // Store
      const store = useStore();

      // Router
      const router = useRouter();

      // Route
      const route = useRoute();

      // References
      const error = ref(null);
      const errorMsg = ref(null);
      const file = ref(null);
      const blogPhoto = ref(null);
      const loading = ref(null);
      const routeID = ref(null);
      const currentBlog = ref(null);

      // Computed
      const blogPhotoFileURL = computed(() => {
        return store.state.blogPhotoFileURL;
      });

      const blogPhotoName = computed(() => {
        return store.state.blogPhotoName;
      });

      const profileId = computed(() => {
        return store.state.profileId;
      });

      const blogCoverPhotoName = computed(() => {
        return store.state.blogPhotoName;
      });

      const blogTitle = computed({
        get() {
          return store.state.blogTitle;
        },
        set(payload) {
          store.commit("updateBlogTitle", payload);
        }
      });

      const blogHTML = computed({
        get() {
          return store.state.blogHTML;
        },
        set(payload) {
          store.commit("newBlogPost", payload);
        }
      });

      const blogPhotoPreview = computed(() => {
        return store.state.blogPhotoPreview;
      });

      // Methods
      const fileChange = () => {
        file.value = blogPhoto.value.files[0];
        const fileName = file.value.name;
        store.commit("fileNameChange", fileName);
        store.commit("createFileURL", URL.createObjectURL(file.value));
      };

      const openPreview = () => {
        store.commit("openPhotoPreview");
      };

      const imageHandler = (file, Editor, cursorLocation, resetUploader) => {
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(`documents/blogPostPhotos/${file.value.name}`);
        console.log(docRef);
        docRef.put(file.value).on(
          "state_changed",
          snapshot => {
            console.log(snapshot);
          },
          error => {
            console.log(error)
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            QuillEditor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          }
        )
      };

      const updateBlog = async () => {
        const database = await db
          .collection("blogPosts")
          .doc(routeID.value)
        if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
          if (file.value) {
            loading.value = true;
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/BlogCoverPhotos/${store.state.blogPhotoName}`);
            docRef.put(file.value).on(
              "state_changed",
              snapshot => {
                console.log(snapshot);
              },
              error => {
                console.log(error);
                loading.value = false;
              },
              async () => {
                const downloadURL = await docRef.getDownloadURL();

                await database.update({
                  blogID: database.id,
                  blogHTML: blogHTML.value,
                  blogCoverPhoto: downloadURL,
                  blogCoverPhotoName: blogCoverPhotoName.value,
                  blogTitle: blogTitle.value,
                });

                await store.dispatch("updatePost", routeID.value);
                loading.value = false;
                await router.push({name: "ViewBlog", params: {blogId: database.id}});
              }
            )
            return;
          }
          loading.value = true;
          await database.update({
            blogHTML: blogHTML.value,
            blogTitle: blogTitle.value
          });
          await store.dispatch("updatePost", routeID.value);
          loading.value = false;
          await router.push({name: "ViewBlog", params: {blogId: database.id}});
          return;
        }
        error.value = true;
        errorMsg.value = "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          error.value = false;
        }, 5000);
        return;
      };

      // Mounted
      onMounted(async () => {
        routeID.value = route.params.blogId;
        currentBlog.value = await store.state.blogPosts.filter(post => {
          return post.blogID === routeID.value;
        });
        console.log(currentBlog.value[0])
        store.commit("setBlogState", currentBlog.value[0]);
      });

      return {
        errorMsg, error,
        blogPhotoFileURL, blogPhotoName,
        blogHTML, blogTitle,
        profileId, blogCoverPhotoName,
        fileChange, blogPhoto,
        blogPhotoPreview, openPreview,
        imageHandler,
        loading, updateBlog
      }
    }
  })
</script>

<style lang="scss">
  .create-post {
    position: relative;
    height: 100%;

    button {
      margin-top: 0;
    }

    .router-button {
      text-decoration: none;
      color: #fff;
    }

    label,
    button,
    .router-button {
      transition: 0.5s ease-in-out all;
      align-self: center;
      font-size: 14px;
      cursor: pointer;
      border-radius: 20px;
      padding: 12px 24px;
      color: #fff;
      background-color: #303030;
      text-decoration: none;

      &:hover {
        background-color: rgba(48, 48, 48, 0.7);
      }
    }

    .container {
      position: relative;
      height: 100%;
      padding: 10px 25px 60px;
    }

    // Error styling
    .invisible {
      opacity: 0 !important;
    }

    .err-message {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      color: #fff;
      margin-bottom: 10px;
      background-color: #303030;
      opacity: 1;
      transition: 0.5s ease all;

      p {
        font-size: 14px;
      }

      span {
        font-weight: 600;
      }
    }

    .blog-info {
      display: flex;
      margin-bottom: 32px;

      input:nth-child(1) {
        min-width: 300px;
      }

      input {
        transition: 0.5s ease-in-out all;
        padding: 10px 4px;
        border: none;
        border-bottom: 1px solid #303030;

        &:focus {
          outline: none;
          box-shadow: 0 1px 0 0 #303030;
        }
      }

      .upload-file {
        flex: 1;
        margin-left: 16px;
        position: relative;
        display: flex;

        input {
          display: none;
        }

        .preview {
          margin-left: 16px;
          text-transform: initial;
        }

        span {
          font-size: 12px;
          margin-left: 16px;
          align-self: center;
        }
      }
    }

    .editor {
      height: 60vh;
      display: flex;
      flex-direction: column;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }

    .blog-actions {
      margin-top: 32px;

      button {
        margin-right: 16px;
      }
    }
  }
</style>