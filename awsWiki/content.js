function fetchNotes(pageId, callback) {
  const getNotesUrl = `https://xc56ahkj9l.execute-api.us-west-2.amazonaws.com/development/documentation/${pageId}/notes`;
  return fetch(getNotesUrl)
    .then((result) => {
      return result.json();
    });
}

function addNoteToElement(el, noteBody) {
  el.insertAdjacentHTML(
    "beforebegin",
    `<div id="andrea-test">${noteBody}</div>`
  );
}

window.onload = function () {
  const pageId = window.location.pathname;
  fetchNotes(pageId)
    .then((pageNotes) => {
      // Page notes will be an array. Loop over each note and place a marker on the page
      pageNotes.forEach((note) => {
        const { pageElement, noteBody } = note;
        const noteElement = pageElement ?
          document.querySelector(pageElement) :
          document.getElementsByTagName("h1")[0];
        addNoteToElement(noteElement, noteBody);
      });
    })
    .catch((err) => {
      // Do something here to let the user know the app failed to fetch the page notes
    });
};

