<template>
  <div class="vad-home">
    <div class="vad-home-header">
      <h1 class="va-home-title">Homepage</h1>
      <div class="vad-header-button">
        <a class="vad-log-out" @click="showHideCreateAlbumPopup(true)"
          >Create Album</a
        >
        <a class="vad-log-out" @click="logout">Logout</a>
      </div>
    </div>
    <div
      class="vad-album-create-container"
      :class="{ active: showCreatePopup }"
    >
      <div class="vad-album-create">
        <h4>Create New Album</h4>
        <div class="vad-album-create-content">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="Album name"
              v-model="albumName"
              :class="{ 'is-invalid': isInvalid('albumName') }"
              v-validate="'required'"
              name="albumName"
            />
            <span class="invalid-feedback">
              {{ errors.first("albumName") }}</span
            >
          </div>
          <input
            name="imageSrc"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            @change="uploadAlbumImage($event)"
            ref="albumImage"
            v-validate="'required'"
            :class="{ 'is-invalid': isInvalid('imageSrc') }"
          />
          <span class="invalid-feedback"> {{ errors.first("imageSrc") }}</span>
        </div>
        <div class="vad-album-create-button">
          <a class="btn btn-success" @click="createAlbum">Save</a>
          <a class="btn btn-light" @click="showHideCreateAlbumPopup(false)"
            >Cancel</a
          >
        </div>
      </div>
    </div>
    <div class="container-fluid vad-home-album">
      <div class="row vad-album-list">
        <div
          class="vad-album-item-container col-md-3"
          v-for="item in albumListDemo"
          :key="item.id"
          @click="goToDetail(item.id)"
        >
          <div class="vad-album-item">
            <img
              width="100%"
              height="100%"
              class="vad-album-item-img"
              :src="item.img"
            />
            <div class="vad-album-title">
              <h3>{{ item.name }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="row vad-album-list">
        <div
          class="vad-album-item-container col-md-3"
          v-for="item in albumList"
          :key="item.id"
        >
          <div class="vad-album-item">
            <img
              width="100%"
              height="100%"
              class="vad-album-item-img"
              :src="item.img"
              @click="goToDetail(item.id)"
            />
            <div class="vad-album-title">
              <h3>{{ item.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { store } from "../store/store";
import router from "../router";
import { ALBUM_PATH } from "../shared/const";
import { isFieldInvalid } from "../shared/validate";

const albumListDemo = [
  {
    id: 1,
    name: "Animal",
    img: require("../assets/albums/raccoon.jpg")
  },
  {
    id: 2,
    name: "Human",
    img: require("../assets/albums/raccoon.jpg")
  },
  {
    id: 3,
    name: "Natural",
    img: require("../assets/albums/raccoon.jpg")
  },
  {
    id: 4,
    name: "Phone",
    img: require("../assets/albums/raccoon.jpg")
  }
];

export default {
  data() {
    return {
      albumName: "",
      albumListDemo: albumListDemo,
      showCreatePopup: false
    };
  },
  computed: {
    ...mapState("album", {
      albumList: state => state.albumList
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),

    uploadAlbumImage(event) {
      this.imageSrc = event && event.target ? event.target.files[0] : "";
    },

    decodeImage() {
      return new Promise(resolve => {
        if (this.imageSrc) {
          let reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(this.imageSrc);
        }
      });
    },

    createAlbum() {
      this.$validator.validate().then(result => {
        if (result) {
          const _this = this;
          this.decodeImage().then(img => {
            const albumId = Math.random();
            const albumObject = {
              id: albumId,
              name: _this.albumName,
              img: img
            };
            store.dispatch("album/setImageSrc", albumObject).then(res => { // eslint-disable-line no-unused-vars
              this.showHideCreateAlbumPopup(false);
            });
          });
        }
      });
    },

    goToDetail(albumId) {
      const ablumDetailPath = ALBUM_PATH + "/" + albumId;
      router.push({ path: ablumDetailPath });
    },

    showHideCreateAlbumPopup(isShowPopup) {
      this.showCreatePopup = isShowPopup ? true : false;
      document.documentElement.style.overflow = "hidden";
      if (!isShowPopup) {
        document.documentElement.style.overflow = "auto";
        this.albumName = "";
        this.imageSrc = "";
        this.$refs.albumImage.value = "";
        this.$validator.errors.clear();
      }
    },

    isInvalid(fieldName) {
      return isFieldInvalid(this.fields, fieldName, this.errors);
    }
  }
};
</script>

<style scoped>
.vad-home-header {
  display: flex;
  justify-content: space-between;
  position: relative;
}
h1.va-home-title {
  text-align: center;
  color: #006c71e8;
  font-weight: 600;
  text-transform: uppercase;
  flex-grow: 2;
  margin-bottom: 0;
  border-bottom: 2px solid #006c71e8;
  padding: 0.4rem;
}
.vad-header-button {
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
.vad-log-out {
  display: block;
  cursor: pointer;
  background-color: #006c71e8;
  padding: 1rem;
  color: #fff;
  opacity: 1;
  height: 100%;
}
.vad-log-out:first-child {
  border-right: 2px solid #006c71e2;
}
.vad-log-out:hover {
  color: #fff;
  opacity: 0.8;
}
.vad-album-create-container {
  display: none;
}
.vad-album-create-container.active {
  display: block;
}
.vad-album-create-container::before {
  position: absolute;
  z-index: 1;
  content: "";
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #333;
  opacity: 0.7;
}
.vad-album-create {
  position: absolute;
  background-color: #fff;
  z-index: 999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}
.vad-album-create > h4 {
  padding: 1rem;
  background-color: #006c71e2;
}
.vad-album-create-content {
  padding: 1rem;
}
.vad-album-create-button {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.vad-album-create-button > a {
  border-radius: 0;
}
.vad-home-album {
  padding: 2rem 1rem;
}
.vad-album-list {
  display: flex;
}
.vad-album-item-container {
  padding-bottom: 2rem;
}
.vad-album-item {
  height: 30rem;
  position: relative;
  padding: 0;
}
.vad-album-item:hover .vad-album-title {
  top: 0;
  vertical-align: middle;
}
.vad-album-title {
  background-color: #333;
  opacity: 0.7;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 25rem;
  color: #fff;
  padding: 1.2rem;
  text-align: center;
  transition: all 0.4s ease-in-out;
}
</style>
