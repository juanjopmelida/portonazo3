import React from 'react';
import {Input} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput(props) {
  const {
    iconName,
    iconColor,
    onPressIcon,
    name,
    placeholder,
    label,
    value,
    ...rest
  } = props;

  return (
    <View style={styles.container}>
      <Input
        {...rest}
        leftIcon={
          <Icon
            type="material-community"
            name={iconName}
            size={22}
            color={iconColor}
            onPress={onPressIcon}
          />
        }
        leftIconContainerStyle={styles.iconStyle}
        placeholderTextColor={iconColor}
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  iconStyle: {
    marginRight: 10,
  },
});
