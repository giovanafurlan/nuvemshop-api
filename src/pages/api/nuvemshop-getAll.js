var axios = require("axios");

export default function handler(req, res) {
  var config = {
    method: "get",
    url: "https://api.tiendanube.com/v1/2232578/products",
    headers: {
      Authentication: "bearer 6da8f31253e89ea43b7a2db13a95cfd2e06fb783",
      "User-Agent": "demo (giovananelofurlan@gmail.com)",
    },
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
