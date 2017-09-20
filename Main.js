// Reference to the canvas element
// So we can pass it to draw functions
var canvas
var dataSetManager
var visualiser

// Setup the simulation
function setup() {
  // Setup canvas and attach to parent
  canvas = createCanvas(window.innerWidth, window.innerHeight)
  canvas.parent("parent")

  // Mock out some dummy connect data
  var date1 = new Date()
  var date2 = new Date()
  var dummyDataSet = []
  dummyDataSet.push({guid: uuidv4(), time: date1})
  dummyDataSet.push({guid: uuidv4(), time: date1})
  dummyDataSet.push({guid: uuidv4(), time: date2})
  dummyDataSet.push({guid: uuidv4(), time: date2})

  // Create a data set manager
  dataSetManager = new DataSetManager(dummyDataSet)

  console.log(dataSetManager.CurrentTimeSet().GetDataPoints())
  dataSetManager.StepForward()
  console.log(dataSetManager.CurrentTimeSet().GetDataPoints())

  // Resets the state of the simulation
  reset()
}

// Draws the simulation
function draw() {
  background(51)
}

// Resets the simulation state
function reset() {
  // Do reset of state in here
}
