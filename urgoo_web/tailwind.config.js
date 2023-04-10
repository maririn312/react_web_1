const { default: plugin } = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bx-color": "#091127",
        "gift-color": "#091126",
        "b-color": "#ffffff0d",
        "custom-green": "#0bffa7",
        card: "#32363a",
        status: "#000000e6",
        "card-title": "#464d66",
        price: "#8694a1",
        "border-radius-color": "#c1c1c1",
        "sec-green": "#09ffa7",
        "custom-gray": "#687597",
        "sec-black": "#091127",
        "sec-yellow": "#ffc762",
        "border-yellow": "#ffda94",
        "primary-border": "#1f4c76",
        "sec-border": "#9cffdc",
        "d-blue": "#132144",
        "sec-hover-bor": "#06d98d",
        "disable-button-green": "#0e8765",
        "input-bor": "#d0d5dd",
        "red-btn": "#e91e63",
        "sec-gray": "#5a5a5a1a",
        "login-bg": "#1a2542",
        label: "#d6e6ff",
        detail: "#ffffff26",
        "status-detail": "#858ca7",
        "custom-blue": "#2fd2d7",
        "custom-purple": "#5342d9",
        creator: "#0d1730",
        "creator-b": "#2e344c",
        "creater-desc": "#8997a4",
        "prm-hover": "#25b4b9",
        tab: "#f6f8f9",
        "tab-border": "#e0e3eb",
        "pro-label": "#616e91",
        "not-complete": "#a75151",
        "complete": "#33a184",
        "complete-bg": "#d6fbf4",
        "not-complete-bg": "#ffeded",
        notice: "#ffb81b1a",
        "notice-border": "#ffce7e",
        td: "#454748",
        "svg-back": "#f1f3f4",
        footer: "#5e667a",
        "profile-b": "#0003",
        "empty-h-bg": "#18264a",
        balance: "#e2f4fd",
        "balance-eye": "#edf9ff",
        count: "#626f8f",
        alert: "#ebc3c1",
        "alert-bg": "#ff00001a",
        notif: "#eb2121",
        updown: "#eeeef0",
        "check-color": "#1a2542",
        "sec-disabled": "#21956b",
        error: "#cf304a",
        "sub-title": "#3e5178",
        "register-border": "#26304c",
        "bor-bottom": "#0effa7",
        "primary-green": "#00ffaf",
        "receive-blue": "#007eff",
        "sec-grey": "#abb5cf",
      },
      boxShadow: {
        nomad: "0 3px 8px #00000026",
        hover: "0 5px 20px #0003",
        table: "0 3px 10px #0000000d",
      },
      backgroundPosition: {
        "50%": "50%",
      },
      backgroundSize: {
        "100%": "100%",
      },
      // screens: {
      //   sm: "375px",
      // },
      animation: {      
        toastIn: "toastIn .8s both",
        toastOut: "toastOut .8s both",
        giftLine: "giftLine 7s linear infinite",
      },
      gridTemplateColumns: {
        "24px": "24px 1fr",
        "34px": "34px 1fr",
        "40px": "40px 1fr",
        "44px": "1fr 44px",
        "200px": "200px 1fr",
        "320px": "320px 1fr",
      },
      screens: {
        lg: "992px",
      },
      keyframes: {
        toastIn: {
          "0%": {
            transform: "translate(2000px) scale(0.7)",
            opacity: 0.7,
          },
          "80%": { transform: "translate(0px) scale(0.7)", opacity: 0.7 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        toastOut: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "20%": { transform: "translate(0px) scale(0.7)", opacity: 0.7 },
          "100%": {
            transform: "translate(2000px) scale(0.7)",
            opacity: 0.7,
          },
        },
        giftLine: {
          "0%": {
            top: "5%",
            left: "-2%"
          },
          "5%": {
            top: "-20px",
            left: "10%"
          },
          "25%": {
            top: "-20px",
            left: "95%"
          },
          "45%": {
            top: "85%",
            left: "97%"
          },
          "50%": {
            top: "93%",
            left: "86%"
          },
          "75%": {
            top: "93%",
            left: "-4%"
          },
          "100%": {
            top: "5%",
            left: "-4%"
          }
        }
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
