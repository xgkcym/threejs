
import EventEmitter from './EventEmitter'
export default class Time extends EventEmitter {
    constructor() {
        super()
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
        this.tick()

    }
    tick = () => {
        const current = Date.now();
        this.elapsed = this.current - this.start;
        this.delta = current - this.current
        this.current = current
        this.trigger('tick')
        requestAnimationFrame(() => {
            this.tick()
        })
    }
}   