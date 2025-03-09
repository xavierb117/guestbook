export function validateForm(data) {
    const errors = [];

    // Contact has at least a first name, last name, and email. Moved from app.js to here
    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    } 

    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is required");
    }

    if (!data.email || data.email.trim() === "" || data.email.indexOf("@") === -1 || data.email.indexOf(".") === -1) {
        errors.push("Email is required");
    }

    // Other forms of validation just in case...
    if (!data.job || data.job.trim() === "") {
        errors.push("Please type in a job");
    }

    if (!data.company || data.company.trim() === "") {
        errors.push("Please type in a company")
    }

    if (!data.linkedin || data.linkedin.trim() === "") {
        errors.push("Please type in your linkedin url");
    }

    if (!data.message || data.message.trim() === "") {
        errors.push("Please type in a message");
    }

    // Backend validation to prevent form spoofing
    if (!data.meet || data.meet === "none") {
        errors.push("Select a meet");
    } else {
        let validMethods = ["meetup", "jobfair"];
        if (!validMethods.includes(data.meet)) {
            errors.push("Don't change the meet!")
        }
    }

    let validMailing = [undefined, "mail"];
    if (!validMailing.includes(data.mailing)) {
        errors.push("Don't change the mailing!")
    }

    if (!data.format) {
        errors.push("Select a format");
    } else {
        let validFormats = ["html", "text"];
        if (!validFormats.includes(data.format)) {
            errors.push("Don't change the formats!")
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}