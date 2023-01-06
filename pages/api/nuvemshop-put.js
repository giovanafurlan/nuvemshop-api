var axios = require("axios");

export default function handler(req, res) {
  const { user } = req.body;

  var data = JSON.stringify({
    name: user.name,
    description: user.description,
    seo_title: user.seo_title,
    seo_description: user.seo_description,
  });

  var config = {
    method: "put",
    url: `https://api.tiendanube.com/v1/2232578/products/${user.id}`,
    headers: {
      Authentication: "bearer 6da8f31253e89ea43b7a2db13a95cfd2e06fb783",
      "User-Agent": "demo (giovananelofurlan@gmail.com)",
      "Content-Type": "application/json",
    },
    data: data,
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
