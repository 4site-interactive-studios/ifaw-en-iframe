import { Shortcode } from "./utils/shortcodde";
export const run = () => {
  if (!("modal_options" in window)) {
    window.modal_options = {};
  }
  const ifawIframe = new Shortcode(document.querySelector("body"), {
    iframe: function() {
      return `<iframe loading='lazy' id='ifaw-iframe' width='100%' scrolling='no' class='ifaw-iframe' src='${this.options.url}' frameborder='0' allowfullscreen></iframe>`;
    },
  });

  // Scrolling Code
  window.onmessage = (e) => {
    var iframe_id = "ifaw-iframe";

    if (e.data.hasOwnProperty("frameHeight")) {
      document.getElementById(
        iframe_id
      ).style.height = `${e.data.frameHeight}px`;
    } else if (e.data.hasOwnProperty("scroll") && e.data.scroll) {
      // Only scrolls if that message is not coming from a donation page
      // e.data.scroll will be 1 if it's coming from a donation page
      document.getElementById(iframe_id).scrollIntoView({
        behavior: "smooth",
      });
      console.log("Scrolling");
    }
  };
};