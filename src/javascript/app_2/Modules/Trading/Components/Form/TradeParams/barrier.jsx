import classNames     from 'classnames';
import { observer }   from 'mobx-react';
import PropTypes      from 'prop-types';
import React          from 'react';
import {
    IconBarrierUp,
    IconBarrierDown } from 'Assets/Trading/Barriers';
import Fieldset       from 'App/Components/Form/fieldset.jsx';
import InputField     from 'App/Components/Form/input-field.jsx';
import { localize }   from '_common/localize';

const Barrier = ({
    barrier_1,
    barrier_2,
    barrier_count,
    is_minimized,
    onChange,
    validation_errors,
}) =>  {
    const barrier_title = barrier_count === 1 ? localize('Barrier') : localize('Barriers');

    if (is_minimized) {
        if (barrier_count !== 2) {
            return (
                <div className='fieldset-minimized barrier1'>
                    <span className='icon barriers' />
                    {barrier_1}
                </div>
            );
        }
        return (
            <React.Fragment>
                <div className='fieldset-minimized barrier1'>
                    <span className='icon barriers' />
                    {barrier_1}
                </div>
                <div className='fieldset-minimized barrier2'>
                    <span className='icon barriers' />
                    {barrier_2}
                </div>
            </React.Fragment>
        );
    }

    const input_class = barrier_count === 2 ? 'multiple' : 'single';
    return (
        <Fieldset
            className='trade-container__fieldset trade-container__barriers'
            header={barrier_title}
            is_center
        >
            <div>
                <InputField
                    type='number'
                    name='barrier_1'
                    value={barrier_1}
                    className={`trade-container__barriers-${input_class}`}
                    classNameInput={classNames('trade-container__input', 'trade-container__barriers-input', `trade-container__barriers-${input_class}-input`)}
                    onChange={onChange}
                    error_messages={validation_errors.barrier_1 || []}
                    is_float
                    is_signed
                />
    
                {barrier_count === 2 &&
                    <React.Fragment>
                        <InputField
                            type='number'
                            name='barrier_2'
                            value={barrier_2}
                            className='multiple'
                            classNameInput='trade-container__input'
                            onChange={onChange}
                            error_messages={validation_errors.barrier_2}
                            is_float
                            is_signed
                        />
                        <IconBarrierUp className='trade-container__barriers--up' />
                        <IconBarrierDown className='trade-container__barriers--down' />
                    </React.Fragment>
                }
            </div>
        </Fieldset>
    );
};

Barrier.propTypes = {
    barrier_1        : PropTypes.string,
    barrier_2        : PropTypes.string,
    barrier_count    : PropTypes.number,
    is_minimized     : PropTypes.bool,
    onChange         : PropTypes.func,
    validation_errors: PropTypes.object,
};

export default observer(Barrier);
