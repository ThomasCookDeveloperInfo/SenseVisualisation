// Represent a sense data point, sanitised for use in the visualiser
var DataPoint = function(time, guid) {
  this.position = position.copy();
}

// Represents a set of data points that belong to a discrete time step
var DiscreteTimeSet = function(time) {
  // The data points that belong with the time
  var dataPoints = []
  // The time that this data set belongs to
  var time = time
}

// Adds the passed data point to the data set
// Only if it is indeed part of this discrete time step
DiscreteTimeSet.prototype.AddDataPoint(dataPoint) {
  if (dataPoint.time === time) {
    this.dataPoints.push(dataPoint)
    return true
  }
  return false
}
