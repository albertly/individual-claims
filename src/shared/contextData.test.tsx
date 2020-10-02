import React, { useContext, useEffect } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

import {
  DataProvider,
  DataContext,
  Types,
  InitialStateType,
} from './contextData';

Enzyme.configure({ adapter: new Adapter() });



function TestInsuredState(props: any): React.ReactElement {
  const { state, dispatch } = useContext(DataContext);
  
  useEffect(() => {
    dispatch({ type: props.action, payload: { ...props.data } });
  }, []);
  return <>
    {JSON.stringify(state)}
    </>;
}

function TestFullState(props: any): React.ReactElement {
  const { state, dispatch } = useContext(DataContext);
  
  useEffect(() => {
    dispatch({ type: Types.SetIns, payload: { ...props.data.insured } });
    dispatch({ type: Types.SetTreat, payload: { ...props.data.treatment } });
  }, []);
  return <>
    {JSON.stringify(state)}
    </>;
}


describe('Test of contextData', () => {

  it('should save Insured data', () => {

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

    const wrapper = mount(
      <DataProvider>
        <TestInsuredState action={Types.SetIns} data={data.insured}/>
      </DataProvider>
    );

    expect(wrapper.html()).toEqual(JSON.stringify(data));

  });

  it('should save Treatment data', () => {

    const data: InitialStateType = {
      insured: {
        insured: '18',
        mobile: '052-8334179',
        email: 'albert.lyubarsky@comtec.co.il',
      },
      treatment: {
        invoice: 123,
        doctorId: 123
      },
    };
    
    const wrapper = mount(
      <DataProvider>
        <TestFullState action={Types.SetIns} data={data}/>
      </DataProvider>
    );

    expect(wrapper.html()).toEqual(JSON.stringify(data));

  });

});
