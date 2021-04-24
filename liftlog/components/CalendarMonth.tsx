import React, { useEffect, useState } from 'react';

import _ from 'lodash';
import { DateTime, Interval } from 'luxon';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createQueryBuilder } from 'typeorm';

import Workout from '../db/entities/Workout';
import { DateUtils } from '../utils';
import { Month } from '../utils/dates';

type OnDayPress = (d: DateTime) => void;

type Props = {
  month: Month;
  year: number;
  onDayPress?: OnDayPress;
};

type CalendarDayProps = {
  date: DateTime;
  workoutPerformed: boolean;
  onPress?: OnDayPress;
}

const DummyDate: React.FC = () => (
  <View style={styles.day} />
);

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  workoutPerformed,
  onPress,
}: CalendarDayProps) => {
  const dayElement = (
    <View
      style={[
        styles.day,
        workoutPerformed ? styles.workoutPerformed : {},
      ]}
    >
      <Text style={workoutPerformed ? styles.workoutPerformed : {}}>
        {date?.day}
      </Text>
    </View>
  );
  if (!workoutPerformed) {
    return dayElement;
  }
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(date)}
    >
      {dayElement}
    </TouchableOpacity>
  );
};

const getPaddedDatesArray = (
  start: DateTime,
  end: DateTime,
): Array<DateTime> => (
  // Returns a padded `Array` of `DateTime`s padded at the
  // start to previous Monday, at the end to next Sunday.
  Interval
    .fromDateTimes(
      start.minus({ days: (start.weekday) % 7 }),
      end.plus({ days: (6 - end.weekday) % 7 }),
    )
    .splitBy({ days: 1 })
    .map((i) => i.start)
);

const CalendarMonth: React.FC<Props> = ({
  month,
  year,
  onDayPress,
}: Props) => {
  const firstOfMonth = DateTime.local(year, month, 1);
  const firstOfMonthSeconds = firstOfMonth.toSeconds();
  const lastOfMonth = firstOfMonth.endOf('month');
  const lastOfMonthSeconds = lastOfMonth.toSeconds();

  // TODO probably better to have these be actual dates not strings
  const [workoutDates, setWorkoutDates] = useState<Array<string>>([]);

  useEffect(() => {
    createQueryBuilder()
      .select('performed')
      .from(Workout, 'workout')
      .where('workout.performed >= :firstOfMonthSeconds', {
        firstOfMonthSeconds,
      })
      .andWhere('workout.performed < :lastOfMonthSeconds', {
        lastOfMonthSeconds,
      })
      .getRawMany()
      .then((rawWorkoutDates) => {
        const cleanedWorkoutDates = rawWorkoutDates.map((rawWorkout) => (
          DateTime.fromSeconds(rawWorkout.performed).toISODate()
        ));
        setWorkoutDates(_.uniq(cleanedWorkoutDates));
      });
  }, [firstOfMonthSeconds, lastOfMonthSeconds]);

  const datesArray = getPaddedDatesArray(firstOfMonth, lastOfMonth);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>{Month[month]}</Text>
      </View>
      <View>
        {/* Weekday header row */}
        <View style={styles.week}>
          {DateUtils.weekDayAsString.map((day) => (
            <View key={day} style={styles.day}>
              <Text>{day.slice(0, 1)}</Text>
            </View>
          ))}
        </View>
        {_.chunk(datesArray, 7).map((week) => (
          <View style={styles.week}>
            {week.map((date) => (
              date.month === month
                ? (
                  <CalendarDay
                    key={date.toSeconds()}
                    date={date}
                    workoutPerformed={workoutDates.includes(date.toISODate())}
                    onPress={onDayPress}
                  />
                )
                : (
                  <DummyDate key={date.toSeconds()} />
                )
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
  },
  workoutPerformed: {
    color: 'white',
    backgroundColor: 'orange',
  },
});

export default CalendarMonth;
