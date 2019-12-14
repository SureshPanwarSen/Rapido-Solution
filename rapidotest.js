/** Rapido planet war problem */

/** Combination of how lengaburu deployed army and result */
function getResultOfWar(inputHorses, inputElephants, inputArmedTanks, inputSlingGuns) {

    console.log('Inputs :=== ', inputHorses, inputElephants, inputArmedTanks, inputSlingGuns);

    let isAllFilled = false;
    let isNumberExhausted = false;

    let isHorsesExhausted = false;
    let isElephantsExhausted = false;
    let isArmedTanksExhausted = false;
    let isSlingGunsExhausted = false;

    let availableHorses = 100;
    let availableElephants = 50;
    let availableArmedTanks = 10;
    let availableSlingGuns = 5;

    const responseObject = {
        result: 'loses',
        horses: 0,
        elephants: 0,
        armedTanks: 0,
        slingGuns: 0
    };

    /** check for rule 1 & 2 */
    if (inputHorses / 2 <= availableHorses) {
        responseObject.horses = Math.ceil(inputHorses / 2);
        availableHorses -= responseObject.horses;
    } else {
        isHorsesExhausted = true;
        isNumberExhausted = true;
    }

    if (inputElephants / 2 <= availableElephants) {
        responseObject.elephants = Math.ceil(inputElephants / 2);
        availableElephants -= responseObject.elephants;
    } else {
        isElephantsExhausted = true;
        isNumberExhausted = true;
    }

    if (inputArmedTanks / 2 <= availableArmedTanks) {
        responseObject.armedTanks = Math.ceil(inputArmedTanks / 2);
        availableArmedTanks -= responseObject.armedTanks;
    } else {
        isArmedTanksExhausted = true;
        isNumberExhausted = true;
    }

    if (inputSlingGuns / 2 <= availableSlingGuns) {
        responseObject.slingGuns = Math.ceil(inputSlingGuns / 2);
        availableSlingGuns -= responseObject.slingGuns;
    } else {
        isSlingGunsExhausted = true;
        isNumberExhausted = true;
    }

    /** check if number exhausted */
    if (isNumberExhausted) {
        /** Rule number 3rd for adjacent applies here !!!!! */

        if (isHorsesExhausted) {
            responseObject.horses += availableHorses;

            if (availableElephants) {
                responseObject.elephants += 1;
                if ((availableHorses + 2) !== inputHorses) {
                    const difference = Math.floor(inputHorses / 2) - responseObject.horses;
                    if (availableElephants) {
                        availableElephants -= Math.floor(difference / 2);
                        responseObject.elephants += Math.floor(difference / 2);
                    }
                }
            }

            if (availableHorses === inputHorses) {
                isAllFilled = true;
            }
        }

        if (isElephantsExhausted) {
            responseObject.elephants += availableElephants;

            let isStillGape = false;

            if (availableHorses) {
                responseObject.horses += 2;
                if ((availableElephants + 2) !== inputElephants) isStillGape = true;
                else isAllFilled = true;
            }

            if (isStillGape && availableArmedTanks) {
                responseObject.armedTanks += 1;
                // if ((availableElephants + 4) !== inputElephants) isAllFilled = false;
            }

            if (availableElephants === Math.floor(inputElephants / 2)) isAllFilled = true;
        }

        if (isArmedTanksExhausted) {
            responseObject.armedTanks += availableArmedTanks;

            let isStillGape = false;
            if (availableElephants) {
                responseObject.elephants += 2;
                if ((availableArmedTanks + 2) !== inputArmedTanks) isStillGape = true;
            }

            if (isStillGape && availableSlingGuns) {
                responseObject.slingGuns += 1;
                // if ((availableArmedTanks + 4) !== inputArmedTanks) isAllFilled = false;
            }

            if (availableArmedTanks === Math.floor(inputArmedTanks / 2)) isAllFilled = true;
        }

        if (isSlingGunsExhausted) {

            responseObject.slingGuns += availableSlingGuns;

            if (availableArmedTanks && inputArmedTanks / 2 <= availableArmedTanks) {
                responseObject.armedTanks += 2;
                // if ((availableSlingGuns + 2) !== inputSlingGuns) isAllFilled = false;
            }

            if (availableSlingGuns === Math.floor(inputSlingGuns / 2)) isAllFilled = true;
        }
    }

    if (isAllFilled) {
        responseObject.result = 'wins';
    }

    return responseObject;
}

// const res = getResultOfWar(100, 101, 20, 5);
// const res = getResultOfWar(150, 96, 26, 8);
const res = getResultOfWar(250, 50, 20, 15);

console.log('Results := ', res.horses, res.elephants, res.armedTanks, res.slingGuns, res.result);
