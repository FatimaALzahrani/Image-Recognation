import React from "react";
import ReactDOM from "react-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "./App.css";
import logo from "./logo.svg";
import Webcam from "./webcam";
import Loader from "./loader";

class App extends React.Component {
  componentDidMount() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");

    if (window.matchMedia("(max-width: 767px)").matches) {
      video.width = 340;
      video.height = 552;
      canvas.width = 340;
      canvas.height = 552;
    } else {
      video.width = 600;
      video.height = 500;
      canvas.width = 600;
      canvas.height = 500;
    }

    console.log("canvas.width", canvas.width, "canvas.height", canvas.height);

    Webcam();

    const a = async () => {
      const model = await cocoSsd.load();
      console.log("MODEL LOADED");
      const modelLoad = "LOADED";
      Loader(modelLoad);
      this.predict(video, model);
    };

    a();
  }

  predict = async (video, model) => {
    const predictions = await model.detect(video);
    this.renderPredictions(predictions);
    requestAnimationFrame(() => {
      this.predict(video, model);
      if (predictions[0] !== undefined) {
        console.log(
          `Prediction ${predictions[0].class} ${predictions[0].score}`
        );
      }
    });
  };

  renderPredictions = (predictions) => {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "16px courier";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach((prediction) => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "black";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });
    predictions.forEach((prediction) => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      ctx.fillStyle = "white";
      ctx.fillText(prediction.class, x, y);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Fundamentals of AI</h3>
          <h4>Project 1: Image Recognition with SSD</h4>
        </header>
        <div id="loading-message">
          <p>Model is loading. This will take a few moments ...</p>
        </div>
        <div className="sk-cube-grid" id="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
        <video id="video" className="video" controls autoPlay />
        <canvas id="canvas" className="canvas" />
      </div>
    );
  }
}

export default App;
