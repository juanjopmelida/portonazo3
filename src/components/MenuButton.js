import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

export default function MenuButton({
  iconName,
  iconType,
  style,
  onPress,
  title,
}) {
  const {colors} = useTheme();

  return (
    <Pressable style={style} onPress={onPress}>
      <Icon
        type={iconType}
        name={iconName}
        size={40}
        color={colors.menuButtonContent}
      />
      <Text style={[styles.text, {color: colors.menuButtonContent}]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Monserrat',
  },
});
