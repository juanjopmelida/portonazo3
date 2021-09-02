import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

export default function IconButton({name, style, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon type="material-community" name={name} color={colors.primary} />
    </TouchableOpacity>
  );
}
