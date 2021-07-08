import React from 'react';
import {View, Text} from 'react-native';

export default function ListItemTitle(props) {
  const {title, viewStyle, textStyle} = props;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
}
