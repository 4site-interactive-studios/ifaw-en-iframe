import { Shortcode } from "./utils/shortcode";
export const run = () => {
  if (!("modal_options" in window)) {
    window.modal_options = {};
  }

  document.querySelectorAll("main > div p").forEach((el) => {
    // console.log(el);
    let ifawIframe = new Shortcode(el, {
      iframe: function() {
        var iframe_classes = 'ifaw-iframe';
        if(this.options.url.indexOf('secure.ifaw.org') !== -1) {
          iframe_classes += ' springboard';
        }
        return `<iframe loading='lazy' id='ifaw-iframe' width='100%' scrolling='no' class='${iframe_classes}' src='${this.options.url}' frameborder='0' allowfullscreen></iframe>`;
      }
    });
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
