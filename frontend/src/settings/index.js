import {getCourseInfo} from "../helpers/utility";
const course = getCourseInfo();

const siteConfig = {
    siteName: course !== null ? course.courseName : "",
    siteIcon: 'ion-flash',
    footerText: 'Developed By @EmreKAra,@AmineBosnali'
};


const courseFeatures = {
    courseDescription: "CourseDescription"
};

const themeConfig = {
    topbar: 'themedefault',
    sidebar: 'themedefault',
    layout: 'themedefault',
    theme: 'themedefault'
};
const language = 'english';

const Auth0Config = {
    domain: '',
    clientID: '',
    allowedConnections: ['Username-Password-Authentication'],
    rememberLastLogin: true,
    language: 'en',
    closable: true,
    options: {
        auth: {
            autoParseHash: true,
            redirect: true,
            redirectUrl: 'http://localhost:3000/auth0loginCallback'
        },
        languageDictionary: {
            title: 'Isomorphic',
            emailInputPlaceholder: 'demo@gmail.com',
            passwordInputPlaceholder: 'demodemo'
        },
        theme: {
            labeledSubmitButton: true,
            logo: '',
            primaryColor: '#E14615',
            authButtons: {
                connectionName: {
                    displayName: 'Log In',
                    primaryColor: '#b7b7b7',
                    foregroundColor: '#000000'
                }
            }
        }
    }
};


const API_URL = "https://api.eyprojeler.xyz/";
const CLIENT_API_URL ="https://ehliyet.eyprojeler.xyz/";
const youtubeSearchApi = '';
export {
    siteConfig,
    themeConfig,
    API_URL,
    CLIENT_API_URL,
    Auth0Config,
    language,
    courseFeatures,
    youtubeSearchApi
};
