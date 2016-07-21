import Animation from './../src/';


describe('meta', function () {

  it('should exist', function () {
    expect(Animation).toBeDefined();
  });

});

describe('control', function () {

  beforeEach(function () {
    jasmine.clock().install();
    jasmine.clock().mockDate();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('should start', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_start: spy});
    animation.start();
    expect(spy).toHaveBeenCalled();
  });

  it('should stop', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_stop: spy, duration: 100});
    animation.start();
    jasmine.clock().tick(50);
    animation.stop();
    expect(spy).toHaveBeenCalledWith(0.5);
  });

  it('should not stop if started while not running', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_stop: spy});
    animation.start();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should stop if started while running', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_stop: spy});
    animation.start();
    animation.start();
    expect(spy).toHaveBeenCalled();
  });

  it('should finish', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_finish: spy, duration: 100});
    animation.start();
    jasmine.clock().tick(101);
    animation._tick();
    expect(spy).toHaveBeenCalled();
  });

  it('should end when finished', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_end: spy, duration: 100});
    animation.start();
    jasmine.clock().tick(101);
    animation._tick();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should end when stopped', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_end: spy, duration: 100});
    animation.start();
    animation.stop();
    expect(spy).toHaveBeenCalled();
  });

  it('should tick', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_tick: spy, duration: 100, frequency: 10});
    animation.start();
    jasmine.clock().tick(10);
    animation._tick();
    expect(spy).toHaveBeenCalledWith(0.1);
  });

  it('should pause if running', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_pause: spy});
    animation.start();
    animation.pause();
    expect(spy).toHaveBeenCalled();
  });

  it('should not pause if not running', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_pause: spy});
    animation.pause();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not pause if paused', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_pause: spy});
    animation.start();
    animation.pause();
    animation.pause();
    expect(spy.calls.count()).toEqual(1);
  });

  it('should resume if paused', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_pause: spy});
    animation.start();
    animation.pause();
    animation.resume();
    expect(spy).toHaveBeenCalled();
  });

  it('should not resume if not paused', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_pause: spy});
    animation.start();
    animation.resume();
    expect(spy).not.toHaveBeenCalled();
  });

});

describe('options', function () {

  beforeEach(function () {
    jasmine.clock().install();
    jasmine.clock().mockDate();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('should set duration', function () {
    const spy = jasmine.createSpy('event');
    const animation = new Animation({on_finish: spy, duration: 100});
    animation.start();
    jasmine.clock().tick(99);
    animation._tick();
    expect(spy).not.toHaveBeenCalled();
    jasmine.clock().tick(2);
    animation._tick();
    expect(spy).toHaveBeenCalled();
  });

});
