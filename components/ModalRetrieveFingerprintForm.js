import React, {useEffect, useState} from 'react';
import {verifyFingerprint} from '../utils/authHelper';

export default function ModalRetreiveFingerprintForm() {
  useEffect(() => {
    console.log('paso');
    verifyFingerprint().then(res => {
      res ? console.log('palante') : console.log('NONONONO');
    });
  }, []);

  return <></>;
}
