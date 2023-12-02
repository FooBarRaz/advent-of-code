export const problem1 = ``


export const calculateFuelRequirementByMass = (moduleMass: number) => Math.floor(moduleMass / 3) - 2

export const calculateFuelRequirementByMassRecursively = (moduleMass: number) => {
    let totalFuel = 0;
    let additionalFuelRequirement = calculateFuelRequirementByMass(moduleMass);
    while (additionalFuelRequirement > 0) {
        totalFuel += additionalFuelRequirement;
        additionalFuelRequirement = calculateFuelRequirementByMass(additionalFuelRequirement);
    }
    return totalFuel;
}
