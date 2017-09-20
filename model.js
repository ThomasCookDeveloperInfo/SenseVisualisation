// Represent a sense data point, sanitised for use in the visualiser
var DataPoint = function(time, guid) {
  this.time = time
  this.guid = guid
}

// Represents a set of data points that belong to a discrete time step
var DiscreteTimeSet = function(time) {
  // The data points that belong with the time
  var dataPoints = []
  // The time that this data set belongs to
  var time = time

  // Adds the passed data point to the data set
  // Only if it is indeed part of this discrete time step
  this.AddDataPoint = function(dataPoint) {
    if (dataPoint.time === time) {
      dataPoints.push(dataPoint)
      return true
    }
    return false
  }

  // For debugging
  this.GetDataPoints = function() {
    return dataPoints
  }

  this.ContainsTime = function(time) {
    return dataPoints.length > 0 && dataPoints[0].time === time
  }
}
