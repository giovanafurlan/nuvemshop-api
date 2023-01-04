import axios from "axios";

const getAllProducts = async (domain) => {
  return axios
    .get("/api/nuvemshop-getAll", { params: { website: domain } })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

const putProduct = async (domain) => {
  return axios
    .get("/api/nuvemshop-put", { params: { website: domain } })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

export { getAllProducts, putProduct };
