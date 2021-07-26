const schedule = require("node-schedule");
const updateStamina = require("../helpers/updateStamina");

module.exports = async () => {
  const night = new schedule.RecurrenceRule();
  night.dayOfWeek = [new schedule.Range(0, 6)];
  night.hour = 00;
  night.minute = 00;
  night.second = 02;

  schedule.scheduleJob(night, function () {
    updateStamina();
  });

  const morning = new schedule.RecurrenceRule();
  morning.dayOfWeek = [new schedule.Range(0, 6)];
  morning.hour = 12;
  morning.minute = 00;
  morning.second = 00;

  schedule.scheduleJob(morning, function () {
    updateStamina();
  });
};
