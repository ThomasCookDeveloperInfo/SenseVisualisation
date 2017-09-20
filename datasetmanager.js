// Takes a dataset and sorts the data into discrete time intervals
// Exposes functions for stepping forward and backward through time
// And returning data set at the current time
var DataSetManager = function(dataset) {
  // First, we sort the dataset into discrete time sets
  var discreteTimeSets = []

  var timeSetsContainsTime = function(element) {
    return timeSet != null &&
           timeSet.length > 0 &&
           timeSet[0].time === data.time
  }

  // Map the input dataset to discreteTimeSets
  dataset.map(function(data)) {
    // Convert data to data point
    var dataPoint = DataPoint(data.time, data.guid)

    // See if we have a time set for this data
    var existingTimeSet = discreteTimeSets.find(timeSetsContainsTime)
    if (existingTimeSet != null) {
      existingTimeSet.push(dataPoint)
    } else {
      // We need to create a new time set
      var timeSet = DiscreteTimeSet(data.time)
      timeSet.AddDataPoint(dataPoint)
      discreteTimeSets.push(timeSet)
    }
  }

  // We keep track of current time set via this variable (start at set 0)
  var currentTimeSet = 0
}

// Steps forward in time
DataSetManager.prototype.StepForward() {
  if (this.currentTimeSet < this.discreteTimeSets.length - 1) {
    this.currentTimeSet += 1
  }
}

// Steps backward in time
DataSetManager.prototype.StepBackward() {
  if (this.currentTimeSet > 0) {
    this.currentTimeSet -= 1
  }
}

// Gets the current times data set
DataSetManager.prototype.currentTimeSet() {
  return this.discreteTimeSets[this.currentTimeSet]
}
