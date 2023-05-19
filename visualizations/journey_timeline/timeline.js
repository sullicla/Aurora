$(function(){
  $('#issues').timelinr({
      orientation: 'vertical',
      issuesSpeed: 300,
      datesSpeed: 100,
      arrowKeys: true,
      startAt: 3
  });

  // Get a reference to the Timelinr instance
  var timelinr = $('#issues').data('plugin_timelinr');

  // Get references to the next and previous buttons
  var nextButton = document.getElementById('next');
  var prevButton = document.getElementById('prev');

  // Add event listeners for the next and previous buttons
  nextButton.addEventListener('click', function() {
      timelinr.next();
  });

  prevButton.addEventListener('click', function() {
      timelinr.prev();
  });
});