$(function(){
    $().timeline({
        orientation: 	'vertical',
        issuesSpeed: 	300,
        datesSpeed: 	100,
        arrowKeys: 		'true',
        startAt:		3
    })
});

// Get references to the next and previous buttons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');

// Get references to the list of issues and the currently selected issue
var issuesList = document.getElementById('issues');
var selectedIssue = document.querySelector('#issues li.selected');

// Add event listeners for the next and previous buttons
nextButton.addEventListener('click', function() {
  // Get the next issue element
  var nextIssue = selectedIssue.nextElementSibling;
  if (nextIssue) {
    // If there is a next issue, remove the selected class from the current issue
    selectedIssue.classList.remove('selected');
    // Add the selected class to the next issue
    nextIssue.classList.add('selected');
    // Set the scroll position of the issues list to show the next issue
    issuesList.scrollLeft += nextIssue.offsetLeft - issuesList.offsetLeft;
    // Update the selectedIssue variable
    selectedIssue = nextIssue;
  }
});

prevButton.addEventListener('click', function() {
  // Get the previous issue element
  var prevIssue = selectedIssue.previousElementSibling;
  if (prevIssue) {
    // If there is a previous issue, remove the selected class from the current issue
    selectedIssue.classList.remove('selected');
    // Add the selected class to the previous issue
    prevIssue.classList.add('selected');
    // Set the scroll position of the issues list to show the previous issue
    issuesList.scrollLeft -= selectedIssue.offsetLeft - prevIssue.offsetLeft;
    // Update the selectedIssue variable
    selectedIssue = prevIssue;
  }
});