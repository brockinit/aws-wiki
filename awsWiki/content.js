function fetchNotes(pageId, callback) {
  const getNotesUrl = `https://xc56ahkj9l.execute-api.us-west-2.amazonaws.com/development/documentation/${pageId}/notes`;
  fetch(getNotesUrl)
      .then((result) => {
          return result.json();
      });
}

function addNoteToElement(el) {
  el.insertAdjacentHTML(
      "beforebegin",
      '<div id="andrea-test">NOTES BRAH!!!!!</div>'
  );
}

window.onload = function () {
  const pageId = 2;// window.location.pathname;
  fetchNotes(pageId)
      .then((pageNotes) => {
          console.log(pageNotes, 'NOTES');
          // Page notes will be an array. Loop over each note and place a marker on the page
          pageNotes.forEach((note) => {
              let noteElement;
              // Highlighted element didn't have a class/id, append to document title
              if (!note.pageElement) {
                  noteElement = document
                      .getElementsByTagName("h1")[0]
                      .insertAdjacentHTML(
                          "beforebegin",
                          '<div id="andrea-test">NOTES BRAH!!!!!</div>'
                      );
              } else {
                  noteElement = document.querySelector(note.pageElement);
              }
              addNoteToElement(noteElement);
          });
      })
      .catch((err) => {
          console.log(err, 'ERR');
          // Do something here to let the user know the app failed to fetch the page notes
      });
};   
};
