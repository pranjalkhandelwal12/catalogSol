const baseToDecimal = (value, base) => parseInt(value, base);

const lagrangeInterpolation = (points) => {
    const n = points.length;
    let c = 0;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= (0 - xj) / (xi - xj);
            }
        }
        c += term;
    }

    return c;
};

const jsonString = `{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}`;

const jsonObject = JSON.parse(jsonString);

const n = jsonObject.keys.n;
const k = jsonObject.keys.k;

const points = [];

for (const [key, value] of Object.entries(jsonObject)) {
    if (key === 'keys') continue;

    const base = parseInt(value.base);
    const decodedValue = baseToDecimal(value.value, base);
    const x = parseInt(key);
    points.push([x, decodedValue]);
}

if (points.length < k) {
    console.error("Not enough points to perform interpolation.");
    process.exit(1);
}

const secretC = lagrangeInterpolation(points);
console.log(`The constant term (secret c) is: ${secretC}`);
