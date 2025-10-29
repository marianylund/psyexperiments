/**
 * @title VideoKeystrokes
 * @description Watching video and pressing buttons during the video
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import videoKeyboardResponse from "@jspsych-contrib/plugin-video-several-keyboard-responses";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";
import { sendData } from "./api";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  console.log(assetPaths);
  const jsPsych = initJsPsych({
    on_finish: function () {
      // Here save data to the server
      jsPsych.data.displayData();
      sendData(jsPsych.data.get());
    },
  });

  const timeline = [];

  // Preload assets was creating issues
  timeline.push({
    type: PreloadPlugin,
    //images: assetPaths.images,
    //audio: assetPaths.audio,
    video: assetPaths.video,
  });

  // Welcome screen
  var welcome_screen = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p>Welcome to VideoKeystrokes! Press any key to go further<p/>",
  };

  // Switch to fullscreen
  // timeline.push({
  //   type: FullscreenPlugin,
  //   fullscreen_mode: true,
  // });

  // Welcome screen
  var keyboard_trial = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p> Press 1 or 2 <p/>",
    choices: ["1", "2"],
    data: { key_type: "response" }, // You can store additional data in the data property.
  };

  var trial = {
    type: videoKeyboardResponse,
    stimulus: [assetPaths.video.find((x) => x.endsWith("bg3.mp4"))],
    choices: "ALL_KEYS",
    prompt: "Press any key",
    width: 700,
    autoplay: false,
    controls: true,
    trial_ends_after_video: true,
    response_ends_trial: false,
    response_allowed_while_playing: true,
  };

  /* define test procedure */
  var test_procedure = {
    timeline: [welcome_screen, trial],
  };

  timeline.push(test_procedure);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
