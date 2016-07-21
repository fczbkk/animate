import Animation from './../src/';

let my_animation = new Animation({
  easing: 'easeInOutSine',
  on_start: function () {console.log('start');},
  on_finish: function () {console.log('finish');},
  on_stop: function (position) {console.log('stop', position);},
  on_end: function (position) {console.log('end', position);},
  on_pause: function (position) {console.log('pause', position);},
  on_resume: function (position) {console.log('resume', position);},
  on_tick: function (position) {
    console.log('tick', position);
    updateElementPosition(position);
  }
});


function updateElementPosition (position) {
  const element = document.getElementById('test');
  element.style.top = (position * 300) + 'px';
  element.style.left = (position * 300) + 'px';
}


function startAnimation () {
  my_animation.updateConfig({
    duration: parseInt(document.getElementById('field-duration').value, 10),
    frequency: parseInt(document.getElementById('field-frequency').value, 10)
  });
  my_animation.start();
}


function pauseAnimation () {
  my_animation.pause();
}


function resumeAnimation () {
  my_animation.resume();
}


window.addEventListener('load', function () {

  document.getElementById('button-start').addEventListener('click', startAnimation);
  document.getElementById('button-pause').addEventListener('click', pauseAnimation);
  document.getElementById('button-resume').addEventListener('click', resumeAnimation);

});
