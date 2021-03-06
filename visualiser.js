// The visualiser takes in discreteTimeSets and draws them
// If already visualising a discreteTimeSet it animates between the old and new
var Visualiser = function() {
  // Start with no timeSet
  var currentTimeSet = null

  // Draws the passed timeSet
  // If already has a timeSet, then animate between old and new
  this.DrawDiscreteTimeSet = function(discreteTimeSet) {
    if (this.currentTimeSet === null) {
      this.currentTimeSet = discreteTimeSet

      // Fade in initial data set
      this.currentTimeSet.GetDataPoints().forEach(function(dataPoint) {
        dataPoint.Draw()
      })
    } else {
      // Animate between old and new
      // And then set this.currentTimeSet to the passed discreteTimeSet

      this.currentTimeSet = discreteTimeSet

      // Fade in initial data set
      this.currentTimeSet.GetDataPoints().forEach(function(dataPoint) {
        dataPoint.Draw()
      })
    }
  }
}
