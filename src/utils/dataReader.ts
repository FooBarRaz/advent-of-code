import fs from 'fs';

export const splitLines = (content: string): Array<string> => content.split('\n').filter(x => x);

export const readFile = (fileName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(data)
        })
    });
}

export const parseNumbers = (input: string): Array<number> =>
    splitLines(input).map(str => Number.parseInt(str))

export const readLines = (fileName: string): Promise<string[]> => {
    return readFile(fileName).then(splitLines)
}

// const defaultFetchInputFileOptions = {
//     url: 'https://adventofcode.com',
//     year: '2020',
//     day: 1
// }

// export const fetchInputFile = (options?: Partial<typeof defaultFetchInputFileOptions>): Promise<string> => {
//     const { url, year, day }  = {...defaultFetchInputFileOptions, ...options };
//     let requestUrl = `${url}/${year}/day/${day}/input`;
//     return axios.get(requestUrl)
//         .then(({data}) => {
//             console.log(data);
//             return data as string;
//         })
// }
