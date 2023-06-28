module.exports = {
    sets: {
        all: {
            files: 'test/hermione/*.ts',
        },
    },
    system: {
        fileExtensions: ['.ts'],
    },
    browsers: {
        chrome: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: {
                width: 1920,
                height: 1080,
            },
        },
    },
    plugins: {
        'html-reporter/hermione': {
            enabled: true,
        },
    },
};
