// 0-9, format: gfedcba
const digits = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F];
const DOM_cache = {
    'hour-1': document.getElementById('hour-1'),
    'hour-2': document.getElementById('hour-2'),
    'minute-1': document.getElementById('minute-1'),
    'minute-2': document.getElementById('minute-2'),
    'divider': document.getElementById('divider'),
};

function clearSegments() {
    // set segments back to default (remove 'segment-active' class)
    let elementList = [
        ...DOM_cache['hour-1'].children,
        ...DOM_cache['hour-2'].children,
        ...DOM_cache['minute-1'].children,
        ...DOM_cache['minute-2'].children,
        ...DOM_cache['divider'].children,
    ];

    for (let element of elementList) {
        if (element.classList.contains('segment-active'))
            element.classList.remove('segment-active');
    }
}

function createDigit(digit, digitID) {
    let bit = digits[digit];
    let children = DOM_cache[digitID].children;
    for (let i = 0; i <= 6; i++) {
        let segmentState = (bit >> i) & 1;
        if (segmentState == 1)
            children[i].classList.add('segment-active');
    }
}

function handleDivider(second) {
    if (second % 2 == 0) {
        DOM_cache['divider'].children[0].classList.add('segment-active');
        DOM_cache['divider'].children[1].classList.add('segment-active');
    }
}

function main() {
    clearSegments();

    let currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();

    // hour digits
    if (hour < 10) {
        createDigit(0, 'hour-1');
        createDigit(hour, 'hour-2');
    } else {
        createDigit(parseInt(hour.toString()[0]), 'hour-1');
        createDigit(parseInt(hour.toString()[1]), 'hour-2');
    }

    // divider dots
    handleDivider(currentDate.getSeconds());

    // minute digits
    if (minute < 10) {
        createDigit(0, 'minute-1');
        createDigit(minute, 'minute-2');
    } else {
        createDigit(parseInt(minute.toString()[0]), 'minute-1');
        createDigit(parseInt(minute.toString()[1]), 'minute-2');
    }

    // refresh
    setTimeout(() => main(), 50);
}

//start js
main();
