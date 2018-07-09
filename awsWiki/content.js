window.onload = function() {
  let iconURL = chrome.extension.getURL("/icon.png");
  let icon = `<div id="hotspot"><img src=${iconURL} height=50px onmouseover="" style="cursor: pointer;"></div>`;
  document
    .getElementById("main-col-body")
    .insertAdjacentHTML("beforebegin", icon);

  let clickableHotspot = document.getElementById("hotspot");
  let notes = '<div id="notes" style="display: none">NOTES BRAH!!!</div>';
  clickableHotspot.onclick = function() {
    console.log(notes.style.display, "notes style");
    document.getElementById("main-col-body").insertAdjacentHTML("beforebegin")
      .style.display === "none"
      ? ""
      : "none";
  };
};
