import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View, ScrollView, Vibration } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';


const Timer = ({ subject, setSubject }) => {
  useKeepAwake();
  const [miliseconds, setMiliseconds] = useState(5000);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(1);
  const intervalRef = useRef(null);
  const initialTimeRef = useRef(5000);

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setMiliseconds((prev) => {
          if (prev <= 1000) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setProgress(0);
            Vibration.vibrate([
              0, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            ]);
            return 0;
          }
          const updated = prev - 1000;
          setProgress(updated / initialTimeRef.current);
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    const initialTime = 5000;
    setMiliseconds(initialTime);
    initialTimeRef.current = initialTime;
    setIsRunning(false);
    setProgress(1);
  };

  const addSeconds = (s) => {
    const ms = s * 1000;
    setMiliseconds(ms);
    initialTimeRef.current = ms;
    setIsRunning(false);
    setProgress(1);
  };

  const addExtraSeconds = (s) => {
    const ms = s * 1000;
    const newTime = miliseconds + ms;
    setMiliseconds(newTime);
    initialTimeRef.current = newTime;
    setIsRunning(false);
    setProgress(1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.timerClock}>
        <Text style={styles.timerClockStyle}>{formatTime(miliseconds)}</Text>
      </View>

      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={progress}
          color="orange"
          style={styles.progressBar}
        />
      </View>

      <View style={styles.subjectWrapper}>
        <Text style={styles.subjectTitle}>Focusing on:</Text>
        <Text style={styles.subjectText}>{subject}</Text>
      </View>

      <View style={styles.ButtonView}>
        <Button
        mode='outlined'
          onPress={toggleTimer}
          style={
            isRunning
              ? [styles.button, styles.clear]
              : [styles.button, styles.start]
          }>
          {isRunning ? 'Pause' : 'Start'}
        </Button>

        {[5, 10, 15].map((sec) => (
          <Button
          mode='outlined'
            key={sec}
            onPress={() => addSeconds(sec)}
            style={styles.button}>
            {sec}s
          </Button>
        ))}

        {[1, 5].map((sec) => (
          <Button
          mode='outlined'
            key={sec}
            onPress={() => addExtraSeconds(sec)}
            style={styles.button}>
            +{sec}s
          </Button>
        ))}

        <Button
        mode='outlined'
          onPress={resetTimer}
          style={[styles.button, styles.clear]}>
          Clear
        </Button>
        <Button
        mode='outlined'
          onPress={()=>setSubject(null)}
          style={[styles.button,styles.back]}>
          Back
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  timerClock: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerClockStyle: {
    color: '#fff',
    fontSize: 80,
  },
  progressWrapper: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 10,
  },
  progressBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  subjectWrapper: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  subjectTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  subjectText: {
    fontSize: 20,
  },
  ButtonView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    margin: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor:'#dabfe7ff',
  },
  clear: {
    backgroundColor: 'red',
  },
  start: {
    backgroundColor: 'grey',
  },
  back: {
    backgroundColor: 'yellow',
    color:'black'
  },
});

export { Timer };
