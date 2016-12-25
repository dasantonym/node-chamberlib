import BaseEvent from './BaseEvent';
import Voltage from '../quantities/Voltage';
import Frequency from '../quantities/Frequency';
import Time from '../quantities/Time';
import Datasize from '../quantities/Datasize';

class DataEvent extends BaseEvent {
    constructor(time, value) {
        super(time, value, [Voltage, Frequency, Time, Datasize]);

        this.time = time;
        this.value = value;
        this._channelRef = null;
    }

    get channelRef() {
        return this._channelRef;
    }

    set channelRef(val) {
        this._channelRef = val;
    }

    toObject() {
        return { t: this.time.normalized(), v: this.value.normalized() };
    }
}

export default DataEvent;