import React from 'react';
import {StateItem} from '../components/StateItem';
import renderer from 'react-test-renderer';

test('Select value change test', () => {

    const state = {stateName: 'test', type: 'bool', value: 'false'},
        vertex = {},
        enums = [],
        removeState = jest.fn(),
        changeSelect = jest.fn(),
        changeSelectArr = jest.fn();

    const component = renderer.create(
        <StateItem
            state={state}
            vertex={vertex}
            enums={enums}
            removeState={removeState}
            changeSelect={changeSelect}
            changeSelectArr={changeSelectArr} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onChange();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});