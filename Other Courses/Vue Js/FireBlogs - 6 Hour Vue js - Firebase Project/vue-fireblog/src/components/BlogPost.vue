<template>
  <div class="blog-wrapper no-user">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{post.title}}</h2>
        <h2 v-else>{{post.title}}</h2>
        <p v-if="post.welcomeScreen">{{post.blogPost}}</p>
        <p v-else class="content-preview">{{post.blogHTML}}</p>
        <router-link v-if="post.welcomeScreen" class="link link-light" to="#">
          Login/Register
          <svg focusable="false" data-prefix="fal" data-icon="arrow-right"
               class="svg-inline--fa fa-arrow-right fa-w-14 arrow arrow-light" role="img"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor"
                  d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
          </svg>
        </router-link>

        <router-link v-else class="link" to="#">
          View The Post
          <svg focusable="false" data-prefix="fal" data-icon="arrow-right"
               class="svg-inline--fa fa-arrow-right fa-w-14 arrow" role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 448 512">
            <path fill="currentColor"
                  d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
          </svg>
        </router-link>
      </div>
    </div>

    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="">
      <img v-else :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "BlogPost",
    props: ["post"]
  }
</script>

<style lang="scss" scoped>
  .blog-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      min-height: 650px;
      max-height: 650px;
      flex-direction: row;
    }

    .blog-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 4;
      order: 2;

      @media (min-width: 700px) {
        order: 1;
      }

      @media (min-width: 800px) {
        flex: 3;
      }

      div {
        max-width: 375px;
        padding: 72px 24px;

        @media (min-width: 700px) {
          padding: 0 24px;
        }

        h2 {
          font-size: 32px;
          font-weight: 300;
          text-transform: uppercase;
          margin-bottom: 24px;

          @media (min-width: 700px) {
            font-size: 40px;
          }
        }

        p {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
        }

        .content-preview {
          font-size: 13px;
          max-height: 24px;
          width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .link {
          display: inline-flex;
          align-items: center;
          margin-top: 32px;
          padding-bottom: 4px;
          border-bottom: 1px solid transparent;
          transition: 0.5s ease-in all;

          &:hover {
            border-bottom-color: #303030;
          }
        }

        .link-light {
          &:hover {
            border-bottom-color: #ffff;
          }
        }
      }
    }

    .blog-photo {
      order: 1;
      flex: 3;
      box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);

      @media (min-width: 700px) {
        order: 2;
      }

      @media (min-width: 800px) {
        flex: 4;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &:nth-child(even) {
      .blog-content {
        order: 2;
      }

      .blog-photo {
        order: 1;
      }
    }
  }

  .no-user:first-child {
    .blog-content {
      background-color: #303030;
      color: #fff;
    }
  }

  .no-user:first-child {
    .blog-content {
      background-color: #303030;
      color: #fff;
    }
  }
</style>