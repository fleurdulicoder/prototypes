var Circle = function(c, x, y, radius, color) {
  console.log('Circle >');
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.context = c.getContext("2d");

  // context.transform(a,b,c,d,e,f);
  this.draw = function() {
    this.context.beginPath();
    this.context.scale(0, 0);
    this.context.globalAlpha = 1; 
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.strokeStyle = 'black';
    this.context.stroke();
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }
}

var DrawCanvas = function(id) {
  console.log('Canvas >');
  if (!id) return;
  var canvas = document.getElementById(id);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var x = canvas.width/2;
  var y = canvas.height/2;
  var radius = canvas.width/2;

  var circle = new Circle(canvas, x, y, radius, '#000');
  circle.draw();
};
