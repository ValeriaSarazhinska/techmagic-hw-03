import MyError from "./my-error.js";

const BASE_URL = "https://api.waifu.im";
const TOKEN =
  "y-6Kq34wMI0pbQNmOF1KFl40o1OF9HevQTmpdUDQEJFKFT-rAyDb87oiHedWLT1eDvCpOXkSMYdFk8d7vdgVLtV1xTng_l84aFJQU6tbJ58nQLujTYM5wfqDxlHs45-wUStRWRecliuZJCYbD1ezGIyhozrDMfsdpKqUySd8BVA";

export default class WaifuApi {
  async getRandomImage() {
    try {
      const response = await fetch(`${BASE_URL}/search`);
      const data = await response.json();
      if (data.detail) {
        throw new MyError(data.detail);
      }
      return data;
    } catch (error) {
      console.error("Waifu error:", error.message);
    }
  }

  async getAllImages() {
    try {
      const response = await fetch(`${BASE_URL}/search?many=true&height==4000`);
      const data = await response.json();
      if (data.detail) {
        throw new MyError(data.detail);
      }
      return data;
    } catch (error) {
      console.error("Waifu error:", error.message);
    }
  }

  async addFavoriteImage(id) {
    try {
      const response = await fetch(`${BASE_URL}/fav/insert`, {
        method: "POST",
        headers: {
          "Accept-Version": "v5",
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: Number(id),
        }),
      });
      const data = await response.json();
      if (data.detail) {
        alert(data.detail);
        throw new MyError(data.detail);
      }
      alert("Added Waifu to favorites");
    } catch (error) {
      console.error("Waifu error:", error.message);
    }
  }

  async deleteFavoriteImage(id) {
    try {
      const response = await fetch(`${BASE_URL}/fav/delete`, {
        method: "DELETE",
        headers: {
          "Accept-Version": "v5",
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: Number(id),
        }),
      });
      const data = await response.json();
      if (data.detail) {
        throw new MyError(data.detail);
      }
    } catch (error) {
      console.error("Waifu error:", error.message);
    }
  }

  async getFavoritesImages() {
    try {
      const response = await fetch(`${BASE_URL}/fav`, {
        headers: {
          "Accept-Version": "v5",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const data = await response.json();
      if (data.detail) {
        throw new MyError(data.detail);
      }
      return data;
    } catch (error) {
      console.error("Waifu error:", error.message);
    }
  }
}
