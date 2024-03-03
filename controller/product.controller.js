var axios = require("axios");
var FormData = require("form-data");
var dataImage = new FormData();
const productController = {
  getImage: async (req, res) => {
    try {
      dataImage.append(
        "prompt",
        "detailed sketch of lion by greg rutkowski, beautiful, intricate, ultra realistic, elegant, art by artgerm"
      );
      dataImage.append("aspect_ratio", "portrait");
      dataImage.append("guidance_scale", 12.5);

      var config = {
        method: "post",
        url: "https://api.monsterapi.ai/v1/generate/txt2img",
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjJmNmVmYTg1ODE5YWUwYWM1ZjBlMTYzMjg5NGYxNzJhIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMDNUMDE6NTA6NDUuNzUyMTk5In0.gvugtqn7ZteXHQqQCuKXckOe6YAKs_wQmnkC_8Q6neY`,
        },
        data: dataImage,
      };

      var response = await axios(config)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(JSON.stringify(response.data));
      var urlApi = response.data.status_url;
      console.log(urlApi);

      const sleep = (millis) => {
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + millis) {}
      };

      sleep(5000);

      axios
        .get(urlApi,  {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjJmNmVmYTg1ODE5YWUwYWM1ZjBlMTYzMjg5NGYxNzJhIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMDNUMDE6NTA6NDUuNzUyMTk5In0.gvugtqn7ZteXHQqQCuKXckOe6YAKs_wQmnkC_8Q6neY`,
          },
        })
        .then((response) => {
          if (
            response.data.result.output[0] !== undefined ||
            response.data.result.output[0] !== null
          ) {
            res.json({
              image: response.data.result.output[0],
              status: true,
            });
          } else {
            res.json({
              status: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: false,
          });
        });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
      });
    }
  },
};

module.exports = productController;
