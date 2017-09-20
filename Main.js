var foodPool;
var poisonPool;
var creaturePool;
var canvas;

var debugButton;
var debugging;
var helpButton;
var helpText;
var paused;
var resetButton;
var maxSpeedInput;
var maxSteeringForceInput;

function setup() {
  debugging = false;
  paused = false;

  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("parent");

  maxSpeedInput = addInput("MaxSpeed", "number", 3);
  maxSteeringForceInput = addInput("MaxSteer", "number", 0.04);
  reset();
}

function draw() {
  background(51);
  foodPool.Draw(color('green'));
  poisonPool.Draw(color('red'));
  creaturePool.UpdatePhysics(foodPool, poisonPool);
  creaturePool.Draw(debugging);
}

function reset() {
  foodPool = new ParticlePool();
  foodPool.IsPoison = false;
  for (var i = 0; i < 250; i++) {
    foodPool.AddParticle();
  }
  poisonPool = new ParticlePool();
  poisonPool.IsPoison = true;
  for (var i = 0; i < 250; i++) {
    poisonPool.AddParticle();
  }
  creaturePool = new CreaturePool();
  for (var i = 0; i < 10; i++) {
    creaturePool.AddCreature(maxSpeedInput.value, maxSteeringForceInput.value);
  }
}

function addInput(inputName, type, value) {
  //Create an input type dynamically.
  var element = document.createElement("input");

  //Create Labels
  var label = document.createElement("Label");
  label.innerHTML = inputName;
  label.classList.add(inputName+"-label");

  //Assign different attributes to the element.
  element.setAttribute("type", type);
  element.setAttribute("value", value);
  element.classList.add(inputName);

  // 'foobar' is the div id, where new fields are to be added
  var parent = document.getElementById("parent");

  //Append the element in page (in span).
  parent.appendChild(label);
  parent.appendChild(element);
  return element;
}
