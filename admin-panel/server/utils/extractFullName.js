module.exports.extractFullName=async(fullName)=> {
    // Split the full name into parts by whitespace
    const nameParts = fullName.trim().split(/\s+/);

    // Extract the first name
    const firstName = nameParts[0];

    // Extract the last name
    const lastName = nameParts.pop();

    // Extract the middle name(s) if any
    const middleName = nameParts.length > 1 ? nameParts.slice(1, -1).join(' ') : '';

    return { firstName, lastName, middleName };
}