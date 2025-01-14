export interface AdvocateType {
    firstName: string,
    lastName: string,
    city: string,
    degree: string,
    specialties: string[],
    yearsOfExperience: number,
    phoneNumber: number
}

export interface FormattedAdvocateType {
    name: string,
    city: string,
    specialties: string[],
    yearsOfExperience: number,
    phoneNumber: string
}

export const formatAdvocates = (advocates: AdvocateType[]): FormattedAdvocateType[] => {
    const formattedAdvocates = advocates.map((advocate) => {
        return {
            name: `${advocate.firstName} ${advocate.lastName}, ${advocate.degree}`,
            phoneNumber: 
                advocate.phoneNumber.toString().length === 10
                    ? `(${advocate.phoneNumber.toString().slice(0, 3)})-${advocate.phoneNumber.toString().slice(3, 6)}-${advocate.phoneNumber.toString().slice(6)}`
                    : (() => { throw new Error("Phone number must be exactly 10 digits long.") })()
                ,
            yearsOfExperience: advocate.yearsOfExperience,
            city: advocate.city,
            specialties: advocate.specialties
                
        }
    })
    return formattedAdvocates;
}