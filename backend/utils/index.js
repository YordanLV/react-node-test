const logFormatter = (line) => {
    const line2xSplit = line.split('  ');
    const line1xSplit = line2xSplit[0].split(' ');
    const date = line1xSplit[0] + line1xSplit[1];
    const logType = line1xSplit[2]
    const warningMessage = line2xSplit[1];
    return { date, logType, warningMessage };
}

module.exports = {
    logFormatter
};
