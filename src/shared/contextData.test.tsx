import React, { useContext, useEffect } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import {
  ContextInsProvider,
  InsContext,
  Types,
  InitialStateType,
} from './contextData';

Enzyme.configure({ adapter: new Adapter() });

const data: InitialStateType = {
  insured: {
    insured: '18',
    mobile: '052-8334179',
    email: 'albert.lyubarsky@comtec.co.il',
  },
  treatment: {
    invoice: 0,
  },
};

function TestComponent(): React.ReactElement {
  const { state, dispatch } = useContext(InsContext);
  useEffect(() => {
    dispatch({ type: Types.SetIns, payload: { ...data.insured } });
  }, []);
  return <>{JSON.stringify(state)}</>;
}

describe('Test of contextData', () => {

  it('should save Insured data', () => {

    const wrapper = mount(
      <ContextInsProvider>
        <TestComponent />
      </ContextInsProvider>
    );

    expect(wrapper.html()).toEqual(JSON.stringify(data));

  });

});
