import React, { useEffect, useState } from 'react';

import {
  View,
} from 'react-native';

import TextRow from './TextRow';

type Props = {
  children: React.ReactNode,
  accordionContent: React.ReactElement,
  allowShow?: boolean,
  onPressHandler?: () => boolean,
};

const AccordionRow: React.FC<Props> = ({
  children,
  accordionContent,
  allowShow = true,
  ...otherProps
}: Props) => {
  const { onPressHandler } = otherProps;

  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(allowShow);
  }, [allowShow]);

  return (
    <>
      <TextRow
        onPress={() => {
          if (onPressHandler) {
            onPressHandler();
          }
          setShown(allowShow ? !shown : false);
        }}
      >
        {children}
      </TextRow>
      {allowShow && shown && (
        <View>
          {accordionContent}
        </View>
      )}
    </>
  );
};

export default AccordionRow;
