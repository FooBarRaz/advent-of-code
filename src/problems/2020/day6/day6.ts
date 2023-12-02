type GroupInfo = {
    groupAnswers: Array<string>
}
export const parseTestCases = (data: string): Array<GroupInfo> => {
    return data.split('\n\n').map(group => ({groupAnswers: group.split('\n')}));
}

export const answeredYes = (groupAnswers: Array<string>): Array<string> => {
    let answers = {};
    groupAnswers.forEach(ans => ans.split('').forEach(answer => {
        answers[answer] = true;
    }))
    return Object.keys(answers);
}

export const everyoneAnsweredYes = (groupAnswers: Array<string>): Array<string> => {
    return answeredYes(groupAnswers)
        .filter(question => groupAnswers
            .every(groupAnswer => groupAnswer
                .includes(question)));
}

