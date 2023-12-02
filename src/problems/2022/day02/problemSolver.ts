type Weapons = 'rock' | 'paper' | 'scissors';
const defeatRules: Record<Weapons, Weapons> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
}

const decryptionTable: Record<string, Weapons> = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
}

const strategyMap: Record<string, Weapons> = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
}

const updatedStrategy = (move: string, opponentMove: Weapons): Weapons => {
    const outcome = {
        X: 0,
        Y: 3,
        Z: 6
    }

    const expectedOutcome = outcome[move];

    return (['rock', 'paper', 'scissors'] as Array<Weapons>).find((weapon: Weapons) => {
        return outcomeScore(weapon, opponentMove) === expectedOutcome
    });
}

/**
 * score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
 * plus the score for the outcome of the round
 * (0 if you lost, 3 if the round was a draw, and 6 if you won).
 */
export const outcomeScore = (myMove: Weapons, opponentMove: Weapons) => {
    if (myMove === opponentMove) return 3
    if (defeatRules[myMove] === opponentMove) return 6
    return 0
}

export const roundScore = (myMove: Weapons, opponentMove: Weapons) => {
    const outcome = outcomeScore(myMove, opponentMove)
    return outcome + weaponScore[myMove];
}
const weaponScore = {
    rock: 1,
    paper: 2,
    scissors: 3,
}

export const parseInput = (data: string) => {
    return data.split('\n').map(line => {
        const [encryptedOpponentMove, myMove] = line.split(' ');
        const opponentMove = decryptionTable[encryptedOpponentMove];

        return {opponentMove, myMove};
    });
}

export const problem1 = (data: string) => {
    const moves: { myMove: string; opponentMove: Weapons }[] = parseInput(data);
    return moves
        .map(({opponentMove, myMove}) => {
            const myStrategy = strategyMap[myMove];
            return roundScore(myStrategy, opponentMove);
        })
        .reduce((a, b) => a + b, 0)
}

export const problem2 = (data: string) => {
    const moves: { myMove: string; opponentMove: Weapons }[] = parseInput(data);
    return moves
        .map(({opponentMove, myMove}) => {
            const myStrategy = updatedStrategy(myMove, opponentMove);
            return roundScore(myStrategy, opponentMove);
        })
        .reduce((a, b) => a + b, 0)
}

