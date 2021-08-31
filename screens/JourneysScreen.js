import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import Toast from 'react-native-easy-toast';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import randomColor from 'randomcolor';
import dayjs from 'dayjs';

// HEADER OPTIONS
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderIconsContainer from '../components/HeaderIconsContainer';
import HeaderLogo from '../components/HeaderLogo';
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

// MARKERS
import startJourneyMarker from '../assets/markers/track_start.png';
import endJourneyMarker from '../assets/markers/track_end.png';

import globalStyles from '../styles/global';
import Loading from '../components/Loading';
import {getMockedJourneys} from '../api';

export default function JourneysScreen(props) {
  const {navigation} = props;
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const toastRef = useRef();
  const mapRef = useRef();
  const [loading, setLoading] = useState(false);
  const [journeys, setJourneys] = useState([]);

  const getJourneys = async () => {
    const mockedJourneys = await getMockedJourneys();
    const journeyColors = randomColor({
      count: mockedJourneys.length,
      luminosity: 'dark',
    });
    let journeyPath = [];
    let retrievedJourneys = [];

    mockedJourneys.map(item => {
      setLoading(true);
      let journeyCoords = [];
      journeyPath = item.JourneyPathStr.split(',');
      //console.log(journeyPath);
      journeyPath.map(point => {
        const coords = point.split(' ');
        const lat = coords[1];
        const lon = coords[0];
        journeyCoords = [
          ...journeyCoords,
          {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          },
        ];
      });
      //console.log('journey: ', journeyCoords);
      retrievedJourneys = [
        ...retrievedJourneys,
        {
          id: retrievedJourneys.length + 1,
          coords: journeyCoords,
          color: journeyColors[retrievedJourneys.length],
          start: item.JourneyStart,
          end: item.JourneyEnd,
        },
      ];
    });
    //console.log(retrievedJourneys);
    console.log('recuperadas', retrievedJourneys.length, 'rutas');
    setLoading(false);
    return retrievedJourneys;
  };

  useEffect(() => {
    const setNavigationOptions = () => {
      navigation.setOptions({
        headerRight: () => (
          <HeaderIconsContainer>
            <HeaderIconButton
              name={'palette'}
              onPress={() => {
                switchTheme();
              }}
            />
            <HeaderIconButton
              name={'logout'}
              onPress={() => {
                logout();
              }}
            />
          </HeaderIconsContainer>
        ),
      });
    };

    setNavigationOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchTheme]);

  useEffect(() => {
    getJourneys()
      .then(data => {
        //console.log(data);
        setJourneys(data);
      })
      .catch(error => {
        console.log('Error al recuperar rutas:', error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, logout, switchTheme]);

  return (
    <ScrollView>
      <Loading isVisible={loading} text="Recuperando rutas..." />
      <HeaderLogo />
      <View style={globalStyles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 40.4716,
            longitude: -3.3762,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {journeys.map(polyline => {
            const lastCoord = polyline.coords.length - 1;
            return (
              <>
                <Marker
                  key={`startJourney${polyline.id}`}
                  coordinate={polyline.coords[0]}
                  image={startJourneyMarker}
                  centerOffset={{x: 0, y: 0}}>
                  <Callout key={`startJourney${polyline.id}`} tooltip>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.bubbleText}>
                          {dayjs(polyline.start).format('DD/MM/YY HH:mm')}
                        </Text>
                      </View>
                      <View style={styles.arrowBorder} />
                      <View style={styles.arrow} />
                    </View>
                  </Callout>
                </Marker>
                <Polyline
                  key={polyline.id}
                  coordinates={polyline.coords}
                  strokeColor={polyline.color}
                  strokeWidth={3}
                />
                <Marker
                  key={`endJourney${polyline.id}`}
                  coordinate={polyline.coords[lastCoord]}
                  image={endJourneyMarker}
                  centerOffset={{x: 0, y: 0}}>
                  <Callout key={`endJourney${polyline.id}`} tooltip>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.bubbleText}>
                          {dayjs(polyline.end).format('DD/MM/YY HH:MM')}
                        </Text>
                      </View>
                      <View style={styles.arrowBorder} />
                      <View style={styles.arrow} />
                    </View>
                  </Callout>
                </Marker>
              </>
            );
          })}
        </MapView>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: '#fff',
    padding: 5,
    width: '100%',
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
  bubbleText: {
    fontSize: 16,
  },
});
