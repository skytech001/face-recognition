const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key" + "f3da20c979b14c8ead9190849947d608");

// const app = new Clarifai.App({
//   apiKey: "ff1866ba009244e6abb49314164cbcee",
// });

const handleApiCall = (req, res) => {
  console.log(req.body);
  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: "yljl6g2pamf8",
      },
      inputs: [{ data: { image: { url: req.body.input } } }],
    },
    metadata,
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
    }
  );
  //   app.models
  //     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  // .then((data) => {
  //   res.json(data);
  // })
  // .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id) //this syntax is sql just like the 'for' in js
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
