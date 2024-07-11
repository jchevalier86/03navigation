declare global {
  interface Window {
    sib: any;
    sendinblue: any;
  }
}

export function initBrevoTracker() {
  window.sib = {
    equeue: [],
    client_key: "9y62m4hk1zgv15a7h2ic4emn",
  };

  window.sendinblue = {};
  for (
    var j = ["track", "identify", "trackLink", "page"], i = 0;
    i < j.length;
    i++
  ) {
    (function (k) {
      window.sendinblue[k] = function () {
        let arg = Array.prototype.slice.call(arguments);
        (
          window.sib[k] ||
          function () {
            let t: any = {};
            t[k] = arg;
            window.sib.equeue.push(t);
          }
        )(arg[0], arg[1], arg[2]);
      };
    })(j[i]);
  }

  var n = document.createElement("script"),
    iscript = document.getElementsByTagName("script")[0];
  n.type = "text/javascript";
  n.id = "sendinblue-js";
  n.async = true;
  n.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key;
  iscript.parentNode?.insertBefore(n, iscript);
  window.sendinblue.page();
}
