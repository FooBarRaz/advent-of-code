import { registry } from "./problems/problemRegistry";

interface EventBody {
    input: string;
}

interface PathParameters {
    year: string;
    day: string;
}

interface LambdaEvent {
    body: string;
    pathParameters: PathParameters;
}

interface LambdaResponse {
    statusCode: number;
    body: string;
    headers?: { [header: string]: string };
}

export const handler = async (event: LambdaEvent): Promise<LambdaResponse> => {
    try {
        const { year, day } = event.pathParameters;
        const { input } = JSON.parse(event.body) as EventBody;

        console.log(`getting solution for year ${year}, day ${day}`);

        const problemSolution = registry[year][day];

        // Here you would add your logic to solve the problems
        const solutionPartOne = problemSolution[1](input) || `Solution Part One for ${year}, Day ${day}: Not implemented`;
        const solutionPartTwo = problemSolution[2](input) || `Solution Part Two for ${year}, Day ${day}: Not implemented`;

        const response: LambdaResponse = {
            statusCode: 200,
            body: JSON.stringify({
                problem1: solutionPartOne,
                problem2: solutionPartTwo,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        return response;
    } catch (error) {
        console.error('Error handling the request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
