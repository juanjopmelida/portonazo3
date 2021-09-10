import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Marker, Polyline, Callout} from 'react-native-maps';
import moment from 'moment';

// MARKERS
import startJourneyMarker from '../assets/markers/track_start.png';
import endJourneyMarker from '../assets/markers/track_end.png';

export default function JourneyPolyline(props) {
  const {journey} = props;
  const lastCoord = journey.coords.length - 1;

  return (
    <>
      <Marker
        coordinate={journey.coords[0]}
        image={startJourneyMarker}
        centerOffset={{x: 0, y: 0}}>
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>
                {moment(journey.start).format('DD/MM/YY HH:mm')}
              </Text>
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker>
      <Polyline
        coordinates={journey.coords}
        strokeColor={journey.color}
        strokeWidth={3}
      />
      <Marker
        coordinate={journey.coords[lastCoord]}
        image={endJourneyMarker}
        centerOffset={{x: 0, y: 0}}>
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>
                {moment(journey.end).format('DD/MM/YY HH:MM')}
              </Text>
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker>
    </>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#fff',
    padding: 5,
    width: '100%',
  },
  bubbleText: {
    fontSize: 16,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 8,
    alignSelf: 'center',
    marginTop: 0,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});
