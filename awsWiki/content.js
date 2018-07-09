//Just a sanity check that this works. It turns any image into a picture of a cat

var images = document.getElementsByTagName("img");
for (var i = 0, l = images.length; i < l; i++) {
  images[i].src =
    "http://placekitten.com/" + images[i].width + "/" + images[i].height;
}
