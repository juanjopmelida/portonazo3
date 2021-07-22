import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Pressable, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FloatingButton(props) {
  const {style} = props;
  const {colors} = useTheme();
  const [open, setOpen] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 10,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  };

  const pinStyle = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={[styles.container, style]}>
      <Pressable>
        <View style={[{backgroundColor: colors.backgroundFAB}, styles.button]}>
          <Icon
            type="material-community"
            name={'layers-outline'}
            size={27}
            color={colors.textFAB}
          />
        </View>
      </Pressable>
      <Pressable onPress={toggleMenu}>
        <Animated.View
          style={[
            {backgroundColor: colors.backgroundFAB},
            styles.button,
            styles.secundary,
            pinStyle,
            opacity,
          ]}>
          <Text style={{color: colors.textFAB}}>Tipo de mapa:</Text>
          <Pressable>
            <Image />
            <Text style={{color: colors.textFAB}}>Estándar</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  secundary: {
    right: 0,
    top: 40,
    width: 200,
    height: 100,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10,
  },
});
