'use strict'

describe('Thermostat', () => {
  let thermostat;

  beforeEach(() => {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', () => {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('can increase temperature with up()', () => {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('can decrease temperature with down()', () => {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });


  it('has a minimum of 10 degrees', () => {
    for (let i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('has power saving mode on by default', () => {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can switch Power Saving Mode off', () => {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch PSM back on', () => {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOff()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  describe('when PSM is on', () => {
    it('has a maxmimum temperature of 25 degrees', () => {
      for (let i = 0; i < 6; i++){
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });
  });

  describe('when PSM if off', () => {
    it('has a maximum of 32 degrees', () => {
      thermostat.switchPowerSavingModeOff();
      for (let i = 0; i < 13; i++){
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });

  it('can be reset to the default temperature', () => {
    for (let i = 0; i < 6; i++) {
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  describe('displaying usage levels', () => {
    describe('when the temperature is below 18 degrees', () => {
      it('it is described as low-usage', () => {
        for (let i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });
    
    describe('when the temperature is between 18 and 25 degrees', () => {
      it('it is described as medium-usage', () => {
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });
    
    describe('when the temperature is above 25 degrees', () => {
      it('is considered high-usage', () => {
        thermostat.powerSavingMode = false;
        for (let i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });
});