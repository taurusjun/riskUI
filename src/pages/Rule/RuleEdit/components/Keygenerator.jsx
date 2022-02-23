import { now } from 'lodash';

export const keygenerator = () => {
    return Math.ceil(Math.random()*10000)+'_'+now();
};