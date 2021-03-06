function sha256(str) {
  // We transform the string into an arraybuffer.
  var buffer = new TextEncoder("utf-8").encode(str);
  return crypto.subtle.digest("SHA-256", buffer).then((hash) => {
    return hex(hash);
  });
}

function hex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    var value = view.getUint32(i)
    // toString(16) will give the hex representation of the number without padding
    var stringValue = value.toString(16)
    // We use concatenation and slice for padding
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }
  // Join all the hex strings into one
  return hexCodes.join("");
}

function fetchNotes(pageId) {
  const getNotesUrl = `https://xc56ahkj9l.execute-api.us-west-2.amazonaws.com/development/documentation/${pageId}/notes`;
  return fetch(getNotesUrl)
    .then((result) => {
      return result.json();
    });
}

function addNoteToPage(noteBody) {
  const postNoteUrl = `https://xc56ahkj9l.execute-api.us-west-2.amazonaws.com/development/documentation/${pageId}/notes`;
  return fetch(postNoteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ noteBody })
  })
    .then((result) => {
      return result.json();
    });
}

function appendNoteToElement(el, noteBody) {
  el.insertAdjacentHTML(
    "beforebegin",
    `<div>${noteBody}</div>`
  );
}

window.onload = function () {
  sha256(window.location.pathname)
    .then((pageId) => fetchNotes(pageId))
    .then((pageNotes) => {
      pageNotes.forEach((note) => {
        const { page_element, note_body } = note;
        const noteElement = page_element ?
          document.querySelector(page_element) :
          document.getElementsByTagName("h1")[0];
        appendNoteToElement(noteElement, note_body);
      });
    })
    .catch((err) => {
      // Do something here to let the user know the app failed to fetch the page notes
    });
};
