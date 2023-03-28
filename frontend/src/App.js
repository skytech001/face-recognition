import React from "react";
import axios from "axios";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: (async function () {
    const res = await axios.get("http://localhost:5000", {
      withCredentials: true,
      credentials: "include",
    });
    const user = res.data.user;
    if (user) {
      return res.data.user;
    } else {
      return {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      };
    }
  })(),
};

console.log(initialState);
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("http://localhost:5001/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: this.state.input }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          fetch("http://localhost:5001/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.state.user.id }),
          })
            .then((response) => response.json())
            .then(
              console.log
              //   (count) => {
              //   this.setState(Object.assign(this.state.user, { entries: count }));
              // }
            );
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <>
        <div className="App">
          <Navigation
            isSignedIn={this.state.isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          {this.state.route === "home" ? (
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                box={this.state.box}
                imageUrl={this.state.imageUrl}
              />
            </div>
          ) : this.state.route === "signin" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </div>
      </>
    );
  }
}

export default App;
