var Creature = function(position, maxSpeed, maxSteering) {
  this.position = position.copy();
  this.velocity = createVector();
  this.acceleration = createVector();
  this.maxSpeed = maxSpeed;
  this.maxForce = maxSteering;
  this.foodSteering = createVector();
  this.poisonSteering = createVector();
  this.dna = [];
  this.dna[0] = random(-5, 5);
  this.dna[1] = random(-5, 5);
  this.dna[2] = random(50, 300);
  this.maxHealth = 25;
  this.health = this.maxHealth;
  this.particlesEaten = 0;

  this.mesh = [];
  this.mesh.push(createVector(5, 0));
  this.mesh.push(createVector(-10, 5));
  this.mesh.push(createVector(-10, -5));

  this.WorldMesh = function() {
    var worldMesh = [];
    worldMesh.push(createVector(this.position.x + this.mesh[0].x,
      this.position.y + this.mesh[0].y));
     worldMesh.push(createVector(this.position.x + this.mesh[1].x,
      this.position.y + this.mesh[1].y));
    worldMesh.push(createVector(this.position.x + this.mesh[2].x,
      this.position.y + this.mesh[2].y));
    return worldMesh;
  }

  this.DebugVector = function(vector, scale) {
    return p5.Vector.mult(vector, scale);
  }
}

Creature.prototype.Draw = function(isDebugging) {
  if (this.health > 0) {
    stroke(127);
    fill(127);

    push();
      translate(this.position.x, this.position.y);
      rotate(this.velocity.heading());

      stroke((255 / this.maxHealth) * (this.maxHealth - this.health),
       (255 / this.maxHealth) * this.health, 0);
      fill((255 / this.maxHealth) * (this.maxHealth - this.health),
       (255 / this.maxHealth) * this.health, 0);
      triangle(this.mesh[0].x, this.mesh[0].y,
        this.mesh[1].x, this.mesh[1].y,
        this.mesh[2].x, this.mesh[2].y);

        if (isDebugging) {
          stroke((255 / this.maxHealth) * (this.maxHealth - this.health),
           (255 / this.maxHealth) * this.health, 0);
          fill((255 / this.maxHealth) * (this.maxHealth - this.health),
          (255 / this.maxHealth) * this.health, 0, 25);
          ellipse(0, 0, this.dna[2] * 2, this.dna[2] * 2);
        }
    pop();
  }
}

Creature.prototype.Move = function() {
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.acceleration.mult(0);

  if (this.position.x < 0) {
    this.position.x = window.innerWidth;
  }
  else if (this.position.x > window.innerWidth) {
    this.position.x = 0;
  }
  if (this.position.y < 0) {
    this.position.y = window.innerHeight;
  }
  else if (this.position.y > window.innerHeight) {
    this.position.y = 0;
  }
}

Creature.prototype.Behaviours = function (foodPool, poisonPool) {
  this.foodSteering = this.Eat(foodPool);
  this.foodSteering.mult(this.dna[0]);

  this.poisonSteering = this.Eat(poisonPool);
  this.poisonSteering.mult(this.dna[1]);

  this.ApplyForce(this.foodSteering);
  this.ApplyForce(this.poisonSteering);
}

Creature.prototype.ApplyForce = function(force) {
  this.acceleration.add(force);
}

Creature.prototype.Eat = function(list) {
  var closestDistance = Infinity;
  var closestIndex = -1;
  for (var i = 0; i < list.Particles.length; i++) {
    var distance = this.position.dist(list.Particles[i].position);
    if (distance <= this.dna[2] && distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  if (closestDistance < 10) {
    if (list.IsPoison && this.health > 0) {
      this.health -= 1;
    }
    else if (!list.IsPoison && this.health < 25) {
      this.health += 1;
    }
    this.particlesEaten += 1;
    list.Particles.splice(closestIndex, 1);
    list.AddParticle();
  }
  if (closestIndex != -1) {
    return this.Seek(list.Particles[closestIndex].position);
  }
  return this.Seek(this.position);
}

Creature.prototype.Seek = function(target) {
  var desired = p5.Vector.sub(target, this.position);
  var steeringForce = p5.Vector.sub(desired, this.velocity);
  steeringForce.limit(this.maxForce);
  return steeringForce;
}

var CreaturePool = function() {
  this.Creatures = [];
  this.EvolutionTimer = setTimeout(this.Evolve.bind(this), 20000);
  this.HungerTimer = setTimeout(this.Hunger.bind(this), 1000);
  this.Generation = 0;
}

CreaturePool.prototype.Hunger = function() {
  var newCreatures = [];
  for (var i = 0; i < this.Creatures.length; i++) {
    var copy = this.Creatures[i];
    copy.health -= 1;
    newCreatures.push(copy);
  }
  this.Creatures = newCreatures;
  this.HungerTimer = setTimeout(this.Hunger.bind(this), 1000);
}

CreaturePool.prototype.Evolve = function() {
  var newCreatures = [];
  for (var i = 0; i < this.Creatures.length; i++) {
    // Get dad
    var mum = this.Roulette();
    var dad = this.Roulette();

    // Make child
    var child = this.Crossover(mum, dad);

    // Mutate child
    this.Mutate(child);

    // Add kid to newCreatures
    newCreatures.push(child);
  }
  this.Creatures = newCreatures;
  this.Generation += 1;
  this.EvolutionTimer = setTimeout(this.Evolve.bind(this), 20000);
}

CreaturePool.prototype.AddCreature = function(maxSpeed, maxSteering) {
  this.Creatures.push(new Creature(createVector(random(0, width),
   random(0, height)), maxSpeed, maxSteering));
}

CreaturePool.prototype.Draw = function(isDebugging) {
  for (var i = 0; i < this.Creatures.length; i++) {
    this.Creatures[i].Draw(isDebugging);
  }
  textSize(32);
  fill(color('white'));
  text("Generation: " +this.Generation, window.innerWidth - 250,
   window.innerHeight -100);
  text("Creatures: " +this.Creatures.length, window.innerWidth - 250,
   window.innerHeight - 50);
}

CreaturePool.prototype.UpdatePhysics = function(foodPool, poisonPool) {
  for (var i = 0; i < this.Creatures.length; i++) {
    this.Creatures[i].Behaviours(foodPool, poisonPool);
    this.Creatures[i].Move();
  }
}

CreaturePool.prototype.Roulette = function() {
  var totalFitness = 0;
  for (var i = 0; i < this.Creatures.length; i++) {
    totalFitness += this.Creatures[i].health;
  }
  var randomFitness = random() * totalFitness;

  for (var i = 0; i < this.Creatures.length; i++) {
    randomFitness -= this.Creatures[i].health;
    if (randomFitness <= 0) {
      return this.Creatures[i];
    }
  }
  return this.Creatures[0];
}

CreaturePool.prototype.Crossover = function(mum, dad) {
  var child = new Creature(mum.position, mum.maxSpeed, mum.maxForce);
  child.particlesEaten = 0;
  child.dna[0] = max(mum.dna[0], dad.dna[0]);
  child.dna[1] = max(mum.dna[1], dad.dna[1]);
  child.dna[2] = max(mum.dna[2], dad.dna[2]);
  return child;
}

CreaturePool.prototype.Mutate = function(child) {
  var mutationRate = 0.01;
  var mutationOccurs = random() <= mutationRate;
  if (mutationOccurs == true) {
    child.dna[0] = random(-5, 5);
    child.dna[1] = random(-5, 5);
    child.dna[2] = random(50, 150);
  }
}
