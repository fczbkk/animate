import {
  sanitizeConfig,
  default_config
} from './../src/utilities';


describe('sanitizeConfig', function () {

  it('should use defaults', function () {
    const config = sanitizeConfig();
    expect(config).toEqual(default_config);
  });

  it('should mix in custom values', function () {
    const config = sanitizeConfig({duration: 100});
    expect(config.duration).toEqual(100);
  });

  it('should ignore unknown properties', function () {
    const config = sanitizeConfig({xxx: 'yyy'});
    expect(config.xxx).not.toBeDefined();
  });

  it('should throw type error if custom value is invalid', function () {
    const fn = function () {
      sanitizeConfig({duration: '100'});
    };
    expect(fn).toThrow();
  });

  it('should update existing config', function () {
    const existing_properties = {frequency: 100, duration: 200};
    const new_properties = {duration: 100};
    const config = sanitizeConfig(new_properties, existing_properties);
    expect(config.duration).toEqual(100);
    expect(config.frequency).toEqual(100);
  });

});

