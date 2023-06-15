function waitForElement(id, callback) {
  var poops = setInterval(function () {
    if (document.getElementById(id)) {
      clearInterval(poops);
      callback();
    }
  }, 100);
}

waitForElement("form", function () {
  let DEV_URI = `http://localhost:3000`;
  let PROD_URI = `https://job-agency-assignment-2.azurewebsites.net`

  document
    .getElementById("email")
    ?.setAttribute("placeholder", "Enter Email Address");
  document
    .getElementById("password")
    ?.setAttribute("placeholder", "Enter Password");
  document
    .getElementById("cpassword")
    ?.setAttribute("placeholder", "Confirm Password");
  
  localStorage.setItem('dev_uri', DEV_URI);
  localStorage.setItem('prod_uri', PROD_URI)
});


