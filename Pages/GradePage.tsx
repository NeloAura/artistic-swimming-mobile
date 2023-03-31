//imports here
import React from 'react';
import {
  ScrollView,
} from 'react-native';

import Grade from '../components/Grade';


function GradePage(): JSX.Element {
 
  return (
    
    <ScrollView>
      <Grade/>
    </ScrollView>
    
  );
}



export default GradePage;
