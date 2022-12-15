export class Rand {
    bool() {
        return Math.random() > 0.5;
    }

    numb(min = 0, max = 10) {
        return Math.round((max - mix) * Math.random()) - min
    }
}

export const rand = new Rand();
