import * as schedule from 'node-schedule';
import * as slack from '../slack/slack.service';
import * as notifications from '../notifications/notifications.service';

const midnightScheduler = () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 0;
  rule.minute = 42;
  schedule.scheduleJob(rule, async () => {
    await slack.updateSlackId();
    await notifications.notifyReservationOverdue();
  });
};

const noonScheduler = () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 12;
  rule.minute = 0;
  schedule.scheduleJob(rule, async () => {
    await notifications.notifyReservation();
    await notifications.notifyReturningReminder();
    await notifications.notifyOverdue();
  });
};

export const scheduler = () => {
  midnightScheduler();
  noonScheduler();
};

export default scheduler;
