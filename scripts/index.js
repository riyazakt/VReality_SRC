const navElement = document.getElementById("main-nav");
includeHTML();
window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
        navElement.classList.add('navbar-scrolled');
    } else if (window.scrollY < 56) {
        navElement.classList.remove('navbar-scrolled');
    }
});

funcLearnMore=(objId)=>{
  var elmnt, file, xhttp;
  // console.log("obj: "+objId);
  objElement=document.getElementById(objId);
  fileName=objElement.getAttribute('file-name');
  title=objElement.getAttribute('title');
  // console.log("File Name: "+fileName);
    /*search for elements with a certain atrribute:*/
    elmnt = document.getElementById("dvModalContent");
    // console.log("elmnt: "+elmnt);
    if (fileName) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          // console.log("elmnt.innerHTML: "+this.responseText);
          document.getElementById("modalPopupLabel").innerHTML=title;
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          // elmnt.removeAttribute("w3-include-html");
          // includeHTML(fileName);
        }
      }
      xhttp.open("GET", fileName, true);
      xhttp.send();
         let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalPopup')) // Returns a Bootstrap modal instance
      // Show or hide:
      modal.show();
      // modal.hide();
      return;
    }

}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }