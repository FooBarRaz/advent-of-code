export const fetchInput = (year: string, day: string) => {
    const sessionToken = process.env.AOC_SESSION_TOKEN;
    if (!sessionToken) {
        throw new Error('No session token found. Please set the AOC_SESSION_TOKEN environment variable.');
    }
    return fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": `session=${sessionToken}`
        },
        "referrer": `https://adventofcode.com/${year}/day/${day}/input`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include",
    })
        .then(res => res.text())
}