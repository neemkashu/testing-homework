require('tsconfig-paths');
require('ts-node/register');

module.exports = {
    sets: {
        all: {
            files: 'test/hermione',
        },
    },
    system: {
        fileExtensions: ['.ts'],
    },
    browsers: {
        chromeDesktop: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: {
                width: 1920,
                height: 1080,
            },
        },
        chromeTablet: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: {
                width: 575,
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
