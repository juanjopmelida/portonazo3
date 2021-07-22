import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Pressable, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FloatingButton({name, style, onPress}) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onPress}>
        <View style={[{backgroundColor: colors.backgroundFAB}, styles.button]}>
          <Icon
            type="material-community"
            name={name}
            size={27}
            color={colors.textFAB}
          />
        </View>
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
});
