import React from 'react';
import {Button} from 'react-native-elements';

export default function FormButton(props) {
  const {title, buttonType, buttonColor, titleColor, ...rest} = props;

  return (
    <Button
      {...rest}
      type={buttonType}
      title={title}
      buttonStyle={{borderColor: buttonColor, borderRadius: 3}}
      titleStyle={{color: titleColor}}
    />
  );
}
