import React, { useState } from 'react';

import {
  View,
} from 'react-native';

import TextRow from './TextRow';

type Props = {
  children: React.ReactNode,
  accordionContent: React.ReactElement,
};

const AccordionRow: React.FC<Props> = (props: Props) => {
  const { children, accordionContent } = props;

  const [shown, setShown] = useState(false);

  const accordion = (
    <View>
      {accordionContent}
    </View>
  );

  return (
    <>
      <TextRow
        onPress={() => { setShown(!shown); }}
      >
        {children}
      </TextRow>
      {shown && accordion}
    </>
  );
};

export default AccordionRow;
