// Takes a dataset and sorts the data into discrete time intervals
// Exposes functions for stepping forward and backward through time
// And returning data set at the current time
var DataSetManager = function(dataset) {
  // First, we sort the dataset into discrete time sets
  var discreteTimeSets = []

  var TimeSetContainsTime = function(data) {
    return function(timeSet) {
      return timeSet.GetDataPoints() != null &&
             timeSet.GetDataPoints().length > 0 &&
             timeSet.ContainsTime(data.time)
    }
  }

  // Map the input dataset to discreteTimeSets
  dataset.map(function(data) {
    // Convert data to data point
    var dataPoint = new GraphicalDataPoint(data.time, data.guid)

    // See if we have a time set for this data
    var existingTimeSet = discreteTimeSets.find(TimeSetContainsTime(data))
    if (existingTimeSet != null) {
      existingTimeSet.AddDataPoint(dataPoint)
    } else {
      // We need to create a new time set
      var timeSet = new DiscreteTimeSet(data.time)
      timeSet.AddDataPoint(dataPoint)
      discreteTimeSets.push(timeSet)
    }
  })

  // We keep track of current time set via this variable (start at set 0)
  var currentTimeSet = 0

  // Steps forward in time
  this.StepForward = function() {
    if (currentTimeSet < discreteTimeSets.length - 1) {
      currentTimeSet += 1
    }
  }

  // Steps backward in time
  this.StepBackward = function() {
    if (currentTimeSet > 0) {
      currentTimeSet -= 1
    }
  }

  // Gets the current times data set
  this.CurrentTimeSet = function() {
    return discreteTimeSets[currentTimeSet]
  }
}
