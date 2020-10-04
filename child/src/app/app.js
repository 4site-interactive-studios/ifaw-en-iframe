// import { Shortcode } from "./utils/shortcodde";
export const run = () => {
  const sendIframeHeight = () => {
    let height = document.body.offsetHeight;
    window.parent.postMessage(
      {
        frameHeight: height,
      },
      "*"
    );
    console.log("Sending height... ", height); // check the message is being sent correctly
  };

  // Iframe Code Start
  const inIframe = () => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };
  if (inIframe()) {
    const shouldScroll = () => {
      // If you find a error, scroll
      if (document.querySelector(".alert.error")) {
        return true;
      }
      // If you find a Thank You Header, Scroll
      if (document.querySelector(".thank-you-header")) {
        return true;
      }
      // Don't scroll
      return false;
    };
    window.onload = () => {
      sendIframeHeight();
      // Scroll to top of iFrame
      window.parent.postMessage(
        {
          scroll: shouldScroll(),
        },
        "*"
      );
      document.addEventListener("click", (e) => {
        var targetElement = e.target || e.srcElement;
        var parentElement = targetElement.parentNode;
        if (parentElement.classList.contains("progress-buttons")) {
          window.parent.postMessage(
            {
              scroll: true,
            },
            "*"
          );
        }
        setTimeout(() => {
          sendIframeHeight();
          window.parent.postMessage(
            {
              scroll: shouldScroll(),
            },
            "*"
          );
        }, 400);
      });
    };
    window.onresize = () => sendIframeHeight();
    // Add iframe-embedded class to the body
    document.body.classList.add("iframe-embedded");
  }
  // Iframe Code End
};
