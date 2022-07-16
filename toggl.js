var TogglClient = require('toggl-api');
var toggl = new TogglClient({apiToken: 'a5a7204d031da0fb7f8d4b4991f1bd76'});

toggl.startTimeEntry({
  description: 'rw and crw导出并对比',
  pid:182337167,
}, function(err, timeEntry) {
  // handle error

  // working 10 seconds
  setTimeout(function() {
    toggl.stopTimeEntry(timeEntry.id, function(err) {
      // handle error

      toggl.updateTimeEntry(timeEntry.id, {tags: ['finished']}, function(err) {
        toggl.destroy()
      });
    });
  }, 120000);
});

// toggl.getCurrentTimeEntry((err, timeEntry)=>{
//     if(err)return console.log("error")
//     console.log(timeEntry)
// })