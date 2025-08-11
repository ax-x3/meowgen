const happy = [6, 10, 'mreaow', 'm', 'r', 'w', 0.9, 0.85];
const silly = [3, 15, 'mreaowlp', 'm', 'r', 'p', 0.5, 0.95];
const eepy = [5, 8, 'mrow', 'm', 'r', 'r', 0.85, 0.4];
const drunk = [8, 20, 'mgreaownflp', 'm', 'r', 'f', 0.35, 0.5];

const MINLENGTH = 2;
const MAXLENGTH = 100;

function load() {
    document.getElementById('form').addEventListener("change", verifyPreset);
    document.getElementById('preset').addEventListener("change", applyPreset);
    applyPreset();
}

function verifyPreset() {
    const preset = document.getElementById('preset');
    var options = []
    options.push(Number(document.getElementById('minlength').value));
    options.push(Number(document.getElementById('maxlength').value));
    options.push(document.getElementById('meowlphabet').value);
    options.push(document.getElementById('start').value);
    options.push(document.getElementById('purr').value);
    options.push(document.getElementById('end').value);
    options.push(Number(document.getElementById('sanitycoef').value));
    options.push(Number(document.getElementById('alertcoef').value));

    const optionsStr = JSON.stringify(options);
    if (optionsStr == JSON.stringify(happy)) {
        preset.value = 'happy';
    } else if (optionsStr == JSON.stringify(silly)) {
        preset.value = 'silly';
    } else if (optionsStr == JSON.stringify(eepy)) {
        preset.value = 'eepy';
    } else if (optionsStr == JSON.stringify(drunk)) {
        preset.value = 'drunk';
    } else {
        preset.value = 'custom';
    }
    rangeOutput();
}

function applyPreset() {
    const presetName = document.getElementById('preset').value;
    var targetPreset = [];
    if (presetName == 'happy') {
        targetPreset = happy;
    } else if (presetName == 'silly') {
        targetPreset = silly;
    } else if (presetName == 'eepy') {
        targetPreset = eepy;
    } else if (presetName == 'drunk') {
        targetPreset = drunk;
    }

    document.getElementById('minlength').value = targetPreset[0];
    document.getElementById('maxlength').value = targetPreset[1];
    document.getElementById('meowlphabet').value = targetPreset[2];
    document.getElementById('start').value = targetPreset[3];
    document.getElementById('purr').value = targetPreset[4];
    document.getElementById('end').value = targetPreset[5];
    document.getElementById('sanitycoef').value = targetPreset[6];
    document.getElementById('alertcoef').value = targetPreset[7];
    rangeOutput();
}

function rangeOutput() {
    document.getElementById('sanitycoefOut').innerHTML = document.getElementById('sanitycoef').value;
    document.getElementById('alertcoefOut').innerHTML = document.getElementById('alertcoef').value;
}

function validate() {
    const minlength = Number(document.getElementById('minlength').value);
    const maxlength = Number(document.getElementById('maxlength').value);
    const meowlphabet = document.getElementById('meowlphabet').value;
    const sanitycoef = Number(document.getElementById('sanitycoef').value);
    const alertcoef = Number(document.getElementById('alertcoef').value);
    const count = Number(document.getElementById('count').value);
    if (minlength < MINLENGTH) {
        return "can't meow for fewer than " + MINLENGTH + " letters";
    }
    if (maxlength > MAXLENGTH) {
        return "can't meow for more than " + MAXLENGTH + " letters";
    }
    if (minlength > maxlength) {
        return "meow length isnt a closed range";
    }
    if (meowlphabet.length == 0) {
        return "cant meow without a meowlphabet";
    }
    if (sanitycoef < 0) {
        return "can't be less sane than 0";
    }
    if (sanitycoef > 1) {
        return "can't be more sane than 1";
    }
    if (alertcoef < 0) {
        return "can't be less alert than 0";
    }
    if (alertcoef > 1) {
        return "can't be more alert than 1";
    }
    if (count <= 0) {
        return "must meow at least once";
    }
    if (count > 100) {
        return "can't meow so many times";
    }
    return "";
}

function meow() {
    const minlength = Number(document.getElementById('minlength').value);
    const maxlength = Number(document.getElementById('maxlength').value);
    const meowlphabet = document.getElementById('meowlphabet').value;
    const start = document.getElementById('start').value;
    const purr = document.getElementById('purr').value;
    const end = document.getElementById('end').value;
    const sanitycoef = Number(document.getElementById('sanitycoef').value);
    const alertcoef = Number(document.getElementById('alertcoef').value);
    
    var meowtext = "";

    const workingLength = Math.floor(Math.random() * (maxlength - minlength)) + minlength - start.length - end.length;
    
    const alphabetLength = meowlphabet.length;
    var alphabetIndex = 0;
    
    // generate enough letters

    for (let i = 0; i < workingLength; i++) {
        // if purring
        if (purr.length != 0 && Math.random() > alertcoef) {
            meowtext += purr;
        // if meowing
        } else {
            meowtext += meowlphabet[alphabetIndex % alphabetLength];
                    // if insane
            if (Math.random() > sanitycoef) {
                // big step
                alphabetIndex += Math.floor(Math.random() * 20) + 10;
            // if sane
            } else if (Math.random() < sanitycoef * 0.75) {
                // little step
                alphabetIndex += Math.floor(Math.random() * 2) + 1;
            }
        }
    }

    // iterate through and duplicate letters randomly
    
    for (let i = 0; i < Math.floor(workingLength * (1.5 - alertcoef) * 0.5); i++) {
        randomStretchIndex = Math.floor(Math.random() * (workingLength - 1));
        meowtext = meowtext.substring(0, randomStretchIndex + 1) + meowtext.substring(randomStretchIndex, workingLength - 1);
    }
    
    return start + meowtext + end;
}


function meowMain() {
    const output = document.getElementById('output');
    output.innerHTML = validate()
    if (output.innerHTML.length == 0) {
        const count = Number(document.getElementById('count').value);
        for (let i = 0; i < count; i++) {
            output.innerHTML += meow() + "\n";
        }
    }
}