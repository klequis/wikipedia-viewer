/* eslint-disable */
"use strict";
const WU_KEY = "8e038883d8fbbe15";
const PROJECT_NAME = "FCC Weather App";

(function()
  {
    var elButton = document.getElementById("btn-random");
    elButton.addEventListener("click", getRandomPage, false);

    elButton = document.getElementById("btn-go");
    elButton.addEventListener("click", populatePage, false);

    var elInput = document.getElementById("input-search-term");
    elInput.addEventListener("keydown", function(event) {
      if (event.defaultPrevented) {
        // do nothing
      } else {
        if (event.key === "Enter") {
          populatePage();
        } else {
          return;
        }
      }
    }, true)
  }
)();

function getRandomPage() {
  var url = "https://en.wikipedia.org/wiki/Special:Random";
  var winRef = window.open(url, "Random Page");

}

function populatePage() {
  console.log("populatePage()");
  clearResults()
  var url = buildSearchQuery(getSearchString());
  console.log("> url=" + url);
  getJSON(url, function(data) {
    resultsLoop(data);
  });
}

function clearResults() {
  var parent = document.getElementById("results");
  while (results.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getSearchString() {
  var str = "";
  console.log("getSearchString()");
  str = $("#input-search-term").val();
  console.log("> str=" + str);
  // setCity(city);
  return str;
}

function resultsLoop(data) {

  console.log("resultsLoop()");

  var key;

  try {
    for(key in data.query.pages){

      var title = data.query.pages[key].title;
      var extract = data.query.pages[key].extract;
      var pageLink = 'https://en.wikipedia.org/?curid=' + data.query.pages[key].pageid;
      var thumbnailSource;
      var thumb200px = "";

      if(data.query.pages[key].hasOwnProperty('thumbnail')){
        thumbnailSource = data.query.pages[key].thumbnail.source;
        thumb200px = adjustImageSize(thumbnailSource);
      } else {
        thumbnailSource = 'http://www.wallpaperup.com/uploads/wallpapers/2014/04/02/319530/big_thumb_e96d0c33f97706bc093572bc613cb23d.jpg';
      }
      // var text = title + extract + pageLink + thumbnailSource;
      // console.log("thumbnailSource=" + thumbnailSource);
      makePanel("root", title, extract, pageLink, thumb200px);
    }
  }
  catch (ex) {
    alert("No results. Try a different search term.");
    return;
  }
}

function adjustImageSize(imageURL) {
  console.log("adjustImageSize()");


  // console.log("> stgring.includes=" + imageURL.includes("50"));
  // if (imageURL.includes("50")) {
  console.log("imageURL=" + imageURL);

  if (/[0-9][0-9]px/.test(imageURL)) {
    var newStr = imageURL.replace(/[0-9][0-9]px/,"200px")
    console.log("> newStr=" + newStr);
  } else {
    console.log("> newStr=din't match");
    newStr = imageURL;
  }

  return newStr;
}

function createDiv(classNames) {
  console.log("createDiv()");
  var div = document.createElement("div");
  for (var i = 0; i < classNames.length; i++) {
    // console.log("> item=" + classNames[i]);
    div.classList.add(classNames[i]);
  }
  return div;
}

function makePanel(parentId, title, extract, pageLink, thumbnailSource) {
  console.log("makePanel()");
  // console.log("> parentId=" + parentId);

  var parent = document.getElementById("results"); // get the parent
  // panel
  var divPanel = createDiv(["panel", "panel-default"]);
  parent.appendChild(divPanel);
  // panel-body
  var divPanelBody = createDiv(["panel-body"]);
  divPanel.appendChild(divPanelBody);

  // don't put in the container
  // var divContainer = createDiv(["container-fluid"]);
  // divPanelBody.appendChild(divContainer);

  // row
  var divRow = createDiv(["row","row-eq-height"]);
  divPanelBody.appendChild(divRow);
  // first column
  var divCol01 = createDiv(["col-md-3"]);
  divRow.appendChild(divCol01);
  // img
  var img = document.createElement(["img"]);
  img.src = thumbnailSource;
  img.classList.add("img-responsive", "img-result");
  divCol01.appendChild(img);
  // second column
  var divCol02 = createDiv(["col-md-9"]);
  divRow.appendChild(divCol02);
  var resultTitle = createDiv(["result-title"]);
  var txt = "<a href='" + pageLink + "'>" + title + "</a>";
  // console.log("> txt=" + txt);
  resultTitle.innerHTML = txt;
  divCol02.appendChild(resultTitle);
  var p = document.createElement("p");
  p.innerText = extract;
  divCol02.appendChild(p);
}

function buildSearchQuery(searchVal) {
  console.log("buildSearchQuery()");
  var amp = "&";
/*
https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nokota_Horses_cropped.jpg/50px-Nokota_Horses_cropped.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nokota_Horses_cropped.jpg/400px-Nokota_Horses_cropped.jpg
*/

  var url = "https://en.wikipedia.org/w/api.php?";
  url += "format=json";
  url += amp + "formatversion=2";
  url += amp + "action=query";
  url +=  amp + "generator=search";
  url +=  amp + "gsrnamespace=0";
  url +=  amp + "gsrlimit=10";
  url +=  amp + "prop=pageimages|extracts";
  url +=  amp + "pilimit=max";
  url +=  amp + "exintro";
  url +=  amp + "explaintext";
  url +=  amp + "exsentences=1";
  url +=  amp + "exlimit=max";
  url +=  amp + "gsrsearch=" + searchVal;
  // console.log("> url=:" + url);
  return url;
}

function getJSON(url, callback) {
  console.log("getJSON()");
  $.ajax({
    dataType: "jsonp",
    url: url,
    jsonCallback: "jsonp",
    // data: { lat: coords[0], lon: coords[1] },
    cache: false,
  })
  .done(function(json) {
    callback(json);
  })
  .fail(function(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("error: " + errorThrown);
    console.log("status: " + status);
    console.dir(xhr);
  })
  .always(function(xhr, status) {
    // alert("the request is complete!");
  });
}
