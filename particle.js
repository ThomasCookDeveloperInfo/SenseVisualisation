var Particle = function(position) {
  this.position = position.copy();
}

Particle.prototype.Draw = function(color) {
  stroke(color);
  fill(color);
  ellipse(this.position.x, this.position.y, 10, 10);
}

var ParticlePool = function() {
  this.Particles = [];
  this.IsPoison;
}

ParticlePool.prototype.AddParticle = function() {
  this.Particles.push(new Particle(createVector(random(0, window.innerWidth - 10),
   random(0, window.innerHeight - 10))));
}

ParticlePool.prototype.Draw = function(color) {
  for (var i = 0; i < this.Particles.length; i++) {
    this.Particles[i].Draw(color);
  }
}
