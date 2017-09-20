var GraphicalDataPoint = function(time, guid) {
  DataPoint.call(this, time, guid)

  var alpha = 0
  var next = 0

  this.Draw = function() {
    if (millis() > next) {
      if (alpha < 255) {
        alpha += 5
      }
      next = millis() + 100
    }
    stroke(color(0, 255, 0, 0))
    fill(color(0, 255, 0, alpha))
    ellipse(100, 100, 50, 50)
  }

  this.Undraw = function() {
    if (millis() > next) {
      if (alpha > 0) {
        alpha -= 5
      }
      next = millis() + 100
    }
    stroke(color(0, 255, 0, 0))
    fill(color(0, 255, 0, alpha))
    ellipse(100, 100, 50, 50)
  }
}
